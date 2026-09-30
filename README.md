# 힐스테이트 중외공원 홈페이지

한국어 전용 정적 사이트(HTML/CSS/JS) + 관심고객등록용 PHP 1개. 빌드 과정 없이 파일 그대로 호스팅 서버(펀스톡)에 FTP로 업로드하면 됩니다.

## 구조

```
index.html          메인
business.html       사업개요 / 브랜드
location.html       입지환경
complex.html        단지배치도 / 커뮤니티
unit.html           세대안내 (unit.html#84 처럼 타입 바로가기)
notice.html         분양일정 / 입주자모집공고
register.html       관심고객등록 → register.php
visit.html          오시는길
register.php        등록 내용을 data/register.csv 에 저장 (메일 알림 선택)
data/.htaccess      CSV 외부 접근 차단
assets/js/config.js 대표번호·주소·메뉴 등 공통 정보 (여기만 고치면 전 페이지 반영)
assets/js/layout.js 공통 헤더·푸터·플로팅 버튼, 슬라이더, 탭
assets/css/theme-hillstate.css  힐스테이트 테마 (색상·서체 토큰)
assets/css/style.css            공통 레이아웃
assets/img/         이미지 넣는 곳
assets/files/       모집공고 PDF 넣는 곳
```

## 이미지 넣기

아래 파일명으로 `assets/img/` 에 올리면 "이미지 준비중" 자리에 자동으로 표시됩니다.

| 파일명 | 위치 |
| --- | --- |
| main_visual01~03.jpg | 메인 슬라이드 |
| sub_visual.jpg | 서브페이지 상단 |
| brand.jpg | 브랜드 |
| location_map.jpg | 입지환경 |
| siteplan_2bl.jpg, siteplan_3bl.jpg | 단지배치도 |
| community.jpg | 커뮤니티 |
| unit_84.jpg, unit_102.jpg, unit_112.jpg, unit_157.jpg | 세대 평면 |
| visit_map.jpg | 견본주택 약도 |

모집공고 PDF는 `assets/files/2BL_notice.pdf`, `assets/files/3BL_notice.pdf`.

## 테마 추가

`theme-hillstate.css` 를 복사해 색상 값만 바꾸고, 각 HTML의 테마 `<link>`와 `config.js` 의 `theme` 값을 바꾸면 됩니다.

## 서버 업로드 (펀스톡)

1. 저장소 전체를 웹 루트(`public_html` 등)에 업로드
2. `data/` 폴더에 웹서버 쓰기 권한 부여 (예: 707 또는 755, 호스팅 안내에 따름)
3. 등록 알림 메일이 필요하면 `register.php` 의 `NOTIFY_EMAIL` 설정
4. 관심고객 목록은 FTP로 `data/register.csv` 다운로드 (엑셀에서 바로 열림)

PHP가 없는 서버라면 관심고객등록 폼만 동작하지 않고 나머지 페이지는 정상 동작합니다.
