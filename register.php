<?php
/*
 * 관심고객등록 처리
 * - data/register.csv 에 저장 (data/.htaccess 로 외부 접근 차단)
 * - NOTIFY_EMAIL 을 설정하면 등록 시 메일 발송 (서버 mail() 사용)
 */
header('Content-Type: application/json; charset=utf-8');

const NOTIFY_EMAIL = ''; // 예: 'manager@example.com'

function respond($ok, $message) {
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    respond(false, '잘못된 요청입니다.');
}

// 스팸 봇 차단(허니팟)
if (!empty($_POST['website'])) {
    respond(true, '등록되었습니다. 감사합니다.');
}

function clean($v, $max) {
    $v = trim(preg_replace('/[\r\n\t]+/', ' ', (string)$v));
    $v = mb_substr($v, 0, $max, 'UTF-8');
    // CSV 수식 주입 방지
    if ($v !== '' && strpos('=+-@', $v[0]) !== false) $v = "'" . $v;
    return $v;
}

$name  = clean($_POST['name'] ?? '', 20);
$phone = preg_replace('/[^0-9]/', '', $_POST['phone'] ?? '');
$type  = clean($_POST['type'] ?? '', 10);
$memo  = clean($_POST['memo'] ?? '', 500);
$agree = ($_POST['agree'] ?? '') === 'Y';

if ($name === '') respond(false, '성명을 입력해 주세요.');
if (!preg_match('/^01[0-9]{8,9}$/', $phone)) respond(false, '연락처를 정확히 입력해 주세요.');
if (!$agree) respond(false, '개인정보 수집 및 이용에 동의해 주세요.');

$phone = preg_replace('/^(\d{3})(\d{3,4})(\d{4})$/', '$1-$2-$3', $phone);

$dir = __DIR__ . '/data';
$file = $dir . '/register.csv';
if (!is_dir($dir)) @mkdir($dir, 0750, true);
$isNew = !file_exists($file);

$fp = @fopen($file, 'a');
if (!$fp) respond(false, '일시적인 오류가 발생했습니다. 전화로 문의해 주세요.');
flock($fp, LOCK_EX);
if ($isNew) {
    fwrite($fp, "\xEF\xBB\xBF"); // 엑셀 한글 깨짐 방지 BOM
    fputcsv($fp, ['등록일시', '성명', '연락처', '관심타입', '문의사항', 'IP']);
}
date_default_timezone_set('Asia/Seoul');
fputcsv($fp, [date('Y-m-d H:i:s'), $name, $phone, $type, $memo, $_SERVER['REMOTE_ADDR'] ?? '']);
flock($fp, LOCK_UN);
fclose($fp);

if (NOTIFY_EMAIL !== '') {
    $subject = '=?UTF-8?B?' . base64_encode('[힐스테이트 중외공원] 관심고객 등록') . '?=';
    $body = "성명: $name\n연락처: $phone\n관심타입: $type\n문의사항: $memo\n";
    @mail(NOTIFY_EMAIL, $subject, $body, "Content-Type: text/plain; charset=UTF-8");
}

respond(true, '관심고객으로 등록되었습니다. 감사합니다.');
