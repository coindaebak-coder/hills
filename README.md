# 힐스테이트 중외공원 홈페이지

한국어 전용 정적 사이트(HTML/CSS/JS). 빌드 과정 없이 파일 그대로 펀스톡 서버에 FTP로 업로드하면 됩니다. PHP 없이도 동작합니다.

- **내용**: 원본 사이트 [hillstate-park.com/pc](http://hillstate-park.com/pc/)의 메뉴·이미지·문구·PDF·영상을 그대로 옮겼습니다. 모바일(768px 이하)에서는 원본 모바일 사이트(`/mo/`) 이미지를 자동으로 사용합니다.
- **디자인**: [호반써밋 첨단3지구](https://hobansummit-kjcd.co.kr/)를 참고했습니다. 서브 비주얼에 겹친 하위 메뉴 탭, 넓은 블록 탭 버튼, 원형 VIEW MORE 버튼, 우측 원형 퀵메뉴, 어두운 푸터가 그 요소입니다. 여기에 힐스테이트 레드 테마를 입혔습니다.

## 페이지

| 메뉴 | 파일 |
| --- | --- |
| 메인 | index.html (계약 조건 팝업, "오늘 하루 열지 않음" 포함) |
| 사업안내 | overview.html, environment.html, preview.html, premium.html, location.html |
| 단지안내 | complex01.html ~ complex04.html |
| 공간안내 | unit01.html (11개 타입 탭), unit02.html (e모델하우스), unit03.html, unit04.html |
| 분양안내 | sale02.html, sale03.html, sale04.html, sale06.html, sale07.html, sale10.html |
| 교육특화 | special01.html |
| 홍보센터 | media.html (`media.html?type=2` → 3D Video 탭), 관심고객등록은 힐스테이트 공식 페이지로 연결 |

## 폴더 구조

```
assets/js/config.js   대표번호·메뉴·푸터 문구·퀵메뉴 (여기만 고치면 전 페이지 반영)
assets/js/layout.js   공통 헤더·서브비주얼·하위메뉴·푸터·퀵메뉴 삽입, 탭, 팝업 외 동작
assets/css/theme-hillstate.css  힐스테이트 테마 (색상·서체 토큰)
assets/css/style.css            공통 레이아웃
assets/img/           PC 이미지 (원본 /pc/images)
assets/img/mo/        모바일 이미지 (원본 /mo/images, PC와 다른 파일만)
assets/files/         모집공고·안내문 PDF, 개인정보처리방침
```

각 HTML 파일에는 페이지 본문만 들어 있습니다. 헤더, 서브 비주얼, 하위 메뉴, 푸터는 `layout.js`가 `config.js`를 읽어 자동으로 넣습니다.

## 자주 하는 수정

- **전화번호·메뉴 변경**: `assets/js/config.js`
- **이미지 교체**: `assets/img/`(PC)와 `assets/img/mo/`(모바일)에 같은 파일명으로 덮어쓰기
- **팝업 교체**: `assets/img/popup_250328.jpg` 교체. 팝업을 없애려면 `index.html` 하단의 `main-popup` 블록과 스크립트를 삭제합니다.
- **테마 추가**: `theme-hillstate.css`를 복사해 색상 값만 바꾸고, 각 HTML의 테마 `<link>`와 `config.js`의 `theme` 값을 바꿉니다.

## 참고

- e모델하우스(VR)는 용량이 커서 원본 서버(`http://hillstate-park.com/vtour/tour.html`)를 그대로 불러옵니다. 사이트를 https로 운영하면 브라우저가 http 콘텐츠를 막을 수 있어, 페이지에 "새 창에서 보기" 링크를 함께 두었습니다.
- 원본 사이트에 있던 광고 추적 코드(Google, Meta, Kakao 픽셀 등)는 옮기지 않았습니다. 필요하면 각 페이지 `<head>`에 추가하세요.
