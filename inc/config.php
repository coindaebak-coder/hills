<?php
/*
 * 관심고객등록 설정 (서버에 올리기 전에 값을 채워주세요)
 * inc/.htaccess 로 외부에서 이 파일에 직접 접근할 수 없습니다.
 */

// 등록 알림을 받을 이메일 (여러 명이면 쉼표로 구분). 비워두면 메일을 보내지 않습니다.
const NOTIFY_EMAIL = '';

// 알림 메일의 보내는 사람 주소. 서버 도메인의 주소를 쓰면 스팸함으로 덜 빠집니다. (예: 'no-reply@내도메인.com')
const MAIL_FROM = '';

// 관리자 페이지(admin.php) 비밀번호. 비워두면 관리자 페이지가 잠깁니다. 8자 이상 권장.
const ADMIN_PASSWORD = '';

// 같은 IP에서 연속 등록을 막는 간격(초)
const SUBMIT_INTERVAL = 30;

// 저장 폴더 (웹에서 접근 차단된 data 폴더)
define('DATA_DIR', dirname(__DIR__) . '/data');
// 파일 첫 줄에 PHP 종료 코드를 넣어, 웹에서 직접 열어도 내용이 보이지 않게 합니다.
// 목록 조회·엑셀 다운로드는 admin.php 에서 하세요.
define('CSV_FILE', DATA_DIR . '/register.csv.php');
const CSV_GUARD = "<?php exit; ?>\n";

const CSV_HEADER = ['등록일시', '성명', '휴대폰', '이메일', '거주지역', '관심블록', '관심평형', '문의사항', '개인정보동의', '마케팅수신동의', 'IP'];
