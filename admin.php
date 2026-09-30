<?php
/*
 * 관심고객 관리자 페이지 — 등록 목록 조회 및 엑셀(CSV) 다운로드
 * 비밀번호는 inc/config.php 의 ADMIN_PASSWORD
 */
require __DIR__ . '/inc/config.php';
date_default_timezone_set('Asia/Seoul');
session_set_cookie_params(['httponly' => true, 'samesite' => 'Strict', 'secure' => !empty($_SERVER['HTTPS'])]);
session_start();
header('X-Robots-Tag: noindex, nofollow');
header('X-Frame-Options: DENY');

function h($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

$error = '';
if (isset($_GET['logout'])) {
    $_SESSION = [];
    session_destroy();
    header('Location: admin.php');
    exit;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
    // 무차별 대입 방지: 실패 시 지연
    if (ADMIN_PASSWORD !== '' && hash_equals(ADMIN_PASSWORD, (string)$_POST['password'])) {
        session_regenerate_id(true);
        $_SESSION['admin'] = true;
        header('Location: admin.php');
        exit;
    }
    sleep(2);
    $error = '비밀번호가 올바르지 않습니다.';
}
$logged = !empty($_SESSION['admin']) && ADMIN_PASSWORD !== '';

// CSV 다운로드
if ($logged && isset($_GET['download'])) {
    if (!is_file(CSV_FILE)) { http_response_code(404); exit('등록된 데이터가 없습니다.'); }
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="interest_' . date('Ymd_His') . '.csv"');
    echo "\xEF\xBB\xBF"; // 엑셀 한글 깨짐 방지
    echo substr(file_get_contents(CSV_FILE), strlen(CSV_GUARD));
    exit;
}

$rows = [];
if ($logged && is_file(CSV_FILE) && ($fp = fopen(CSV_FILE, 'r'))) {
    fgets($fp); // 보호용 첫 줄
    $first = true;
    while (($r = fgetcsv($fp)) !== false) {
        if ($first) { $first = false; continue; } // 헤더
        $rows[] = $r;
    }
    fclose($fp);
    $rows = array_reverse($rows); // 최신순
}
?>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>관심고객 관리 | 힐스테이트 중외공원</title>
<style>
  body { margin: 0; font-family: "Pretendard", "Malgun Gothic", sans-serif; background: #f4f4f4; color: #222; font-size: 14px; }
  .wrap { max-width: 1400px; margin: 0 auto; padding: 30px 20px; }
  h1 { font-size: 22px; margin: 0 0 20px; color: #a5111c; }
  .box { background: #fff; padding: 30px; border-radius: 6px; box-shadow: 0 2px 10px rgba(0,0,0,.05); }
  .login { max-width: 360px; margin: 80px auto; }
  input[type=password] { width: 100%; height: 46px; padding: 0 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 15px; box-sizing: border-box; }
  button, .btn { display: inline-block; height: 42px; line-height: 42px; padding: 0 18px; border: 0; border-radius: 4px; background: #a5111c; color: #fff; font-size: 14px; font-weight: 600; text-decoration: none; cursor: pointer; }
  .login button { width: 100%; margin-top: 10px; height: 46px; }
  .btn.gray { background: #666; }
  .err { color: #a5111c; margin-top: 10px; }
  .bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px; }
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; background: #fff; }
  th, td { padding: 10px 8px; border-bottom: 1px solid #e5e5e5; text-align: left; vertical-align: top; }
  th { background: #faf6f6; white-space: nowrap; }
  td.memo { max-width: 320px; white-space: pre-wrap; word-break: break-all; }
  td.nowrap { white-space: nowrap; }
</style>
</head>
<body>
<div class="wrap">
<?php if (ADMIN_PASSWORD === ''): ?>
  <div class="box login">
    <h1>관리자 페이지</h1>
    <p>관리자 비밀번호가 설정되지 않았습니다.<br><b>inc/config.php</b> 의 <b>ADMIN_PASSWORD</b> 를 설정해 주세요.</p>
  </div>
<?php elseif (!$logged): ?>
  <form class="box login" method="post">
    <h1>관심고객 관리</h1>
    <input type="password" name="password" placeholder="비밀번호" autofocus required>
    <button type="submit">로그인</button>
    <?php if ($error): ?><p class="err"><?= h($error) ?></p><?php endif; ?>
  </form>
<?php else: ?>
  <div class="bar">
    <h1>관심고객 목록 <small>(총 <?= count($rows) ?>건)</small></h1>
    <div>
      <a class="btn" href="admin.php?download=1">엑셀(CSV) 다운로드</a>
      <a class="btn gray" href="admin.php?logout=1">로그아웃</a>
    </div>
  </div>
  <div class="box table-wrap">
    <?php if (!$rows): ?>
      <p>아직 등록된 관심고객이 없습니다.</p>
    <?php else: ?>
    <table>
      <thead><tr><th>No</th><?php foreach (CSV_HEADER as $hd): ?><th><?= h($hd) ?></th><?php endforeach; ?></tr></thead>
      <tbody>
      <?php foreach ($rows as $i => $r): ?>
        <tr>
          <td class="nowrap"><?= count($rows) - $i ?></td>
          <?php foreach (CSV_HEADER as $k => $hd): $v = ltrim($r[$k] ?? '', "'"); ?>
            <td class="<?= $hd === '문의사항' ? 'memo' : 'nowrap' ?>"><?= h($v) ?></td>
          <?php endforeach; ?>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    <?php endif; ?>
  </div>
<?php endif; ?>
</div>
</body>
</html>
