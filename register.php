<?php
/*
 * 관심고객등록 처리
 * - data/register.csv.php 에 저장 (admin.php 에서 조회·엑셀 다운로드)
 * - inc/config.php 의 NOTIFY_EMAIL 이 있으면 알림 메일 발송
 */
require __DIR__ . '/inc/config.php';
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
date_default_timezone_set('Asia/Seoul');

function respond($ok, $message, $code = 200) {
    http_response_code($code);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, '잘못된 요청입니다.', 405);
}

// 다른 사이트에서 보낸 요청 차단
$origin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== parse_url('//' . ($_SERVER['HTTP_HOST'] ?? ''), PHP_URL_HOST)) {
    respond(false, '잘못된 요청입니다.', 403);
}

// 스팸 봇(숨김 필드 입력) — 성공처럼 응답하고 저장하지 않음
if (!empty($_POST['website'])) {
    respond(true, '관심고객으로 등록되었습니다. 감사합니다.');
}

function clean($v, $max) {
    $v = trim(preg_replace('/[\x00-\x1F\x7F]+/u', ' ', (string)$v));
    return mb_substr($v, 0, $max, 'UTF-8');
}
// 엑셀 수식 실행 방지
function csv_safe($v) {
    return ($v !== '' && strpos('=+-@', $v[0]) !== false) ? "'" . $v : $v;
}

$name   = clean($_POST['name'] ?? '', 20);
$phone  = preg_replace('/[^0-9]/', '', (string)($_POST['phone'] ?? ''));
$email  = clean($_POST['email'] ?? '', 80);
$region = clean($_POST['region'] ?? '', 30);
$block  = clean($_POST['block'] ?? '', 10);
$types  = array_slice(array_map(function ($t) { return clean($t, 20); }, (array)($_POST['types'] ?? [])), 0, 4);
$memo   = clean($_POST['memo'] ?? '', 500);
$agree  = ($_POST['agree'] ?? '') === 'Y';
$mkt    = ($_POST['marketing'] ?? '') === 'Y';

if ($name === '') respond(false, '성명을 입력해 주세요.');
if (!preg_match('/^01[016789][0-9]{7,8}$/', $phone)) respond(false, '휴대폰 번호를 정확히 입력해 주세요.');
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) respond(false, '이메일 주소를 확인해 주세요.');
if (!$agree) respond(false, '개인정보 수집 및 이용에 동의해 주세요.');
$phone = preg_replace('/^(\d{3})(\d{3,4})(\d{4})$/', '$1-$2-$3', $phone);

if (!is_dir(DATA_DIR) && !@mkdir(DATA_DIR, 0750, true)) {
    respond(false, '일시적인 오류가 발생했습니다. 분양문의(1533-5006)로 연락해 주세요.', 500);
}

// 같은 IP 연속 등록 제한
$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$rl = DATA_DIR . '/rl_' . md5($ip);
if (is_file($rl) && time() - filemtime($rl) < SUBMIT_INTERVAL) {
    respond(false, '잠시 후 다시 시도해 주세요.');
}
@touch($rl);

$row = [date('Y-m-d H:i:s'), $name, $phone, $email, $region, $block, implode(', ', $types), $memo,
        '동의', $mkt ? '동의' : '미동의', $ip];

$fp = @fopen(CSV_FILE, 'a');
if (!$fp) respond(false, '일시적인 오류가 발생했습니다. 분양문의(1533-5006)로 연락해 주세요.', 500);
flock($fp, LOCK_EX);
if (filesize(CSV_FILE) === 0) {
    fwrite($fp, CSV_GUARD);
    fputcsv($fp, CSV_HEADER);
}
fputcsv($fp, array_map('csv_safe', $row));
fflush($fp);
flock($fp, LOCK_UN);
fclose($fp);

// 알림 메일
if (NOTIFY_EMAIL !== '') {
    $subject = '=?UTF-8?B?' . base64_encode('[힐스테이트 중외공원] 관심고객 등록 - ' . $name) . '?=';
    $body = "관심고객이 등록되었습니다.\n\n";
    foreach (CSV_HEADER as $i => $label) {
        $body .= $label . ' : ' . $row[$i] . "\n";
    }
    $headers = "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n";
    if (MAIL_FROM !== '') {
        $headers .= 'From: =?UTF-8?B?' . base64_encode('힐스테이트 중외공원') . '?= <' . MAIL_FROM . ">\r\n";
    }
    @mail(NOTIFY_EMAIL, $subject, chunk_split(base64_encode($body)), $headers);
}

respond(true, '관심고객으로 등록되었습니다. 감사합니다.');
