/*
 * 사이트 공통 설정
 * 전화번호·메뉴·푸터 문구는 이 파일 한 곳에서 수정하면 전 페이지에 반영됩니다.
 */
window.SITE = {
  name: '힐스테이트 중외공원',
  theme: 'hillstate',
  tel: '1533-5006',
  registerUrl: 'https://www.hillstate-hec.co.kr/sale/complex/intrst/non-mem-write?cmplxSeq=225',
  naverMap: 'https://naver.me/GEIc8WqS',
  kakaoMap: 'https://kko.to/kmpCe90c_t',
  privacyPdf: 'assets/files/privacy.pdf',

  // 메뉴 (en: 서브 비주얼 영문 타이틀)
  nav: [
    { label: '사업안내', en: 'BUSINESS', children: [
      { label: '사업개요', href: 'overview.html' },
      { label: '입지환경', href: 'environment.html' },
      { label: '중외공원 미리보기', href: 'preview.html' },
      { label: '프리미엄', href: 'premium.html' },
      { label: '오시는길', href: 'location.html' }
    ]},
    { label: '단지안내', en: 'COMPLEX', children: [
      { label: '단지배치도', href: 'complex01.html' },
      { label: '동·호수배치도', href: 'complex02.html' },
      { label: '단지설계', href: 'complex03.html' },
      { label: '커뮤니티', href: 'complex04.html' }
    ]},
    { label: '공간안내', en: 'UNIT PLAN', children: [
      { label: '세대안내', href: 'unit01.html' },
      { label: 'e모델하우스', href: 'unit02.html' },
      { label: '스마트시스템', href: 'unit03.html' },
      { label: '마감재리스트', href: 'unit04.html' }
    ]},
    { label: '분양안내', en: 'SALES INFO', children: [
      { label: '공급안내', href: 'sale02.html' },
      { label: '모집공고', href: 'sale03.html' },
      { label: '이동통신설비 협의서', href: 'sale04.html' },
      { label: '아파트 명의변경 안내', href: 'sale06.html' },
      { label: '중도금대출 서류접수 안내', href: 'sale07.html' },
      { label: '발코니 확장 안내', href: 'sale10.html' }
    ]},
    { label: '교육특화', en: 'EDUCATION', children: [
      { label: '종로엠스쿨', href: 'special01.html' }
    ]},
    { label: '홍보센터', en: 'PR CENTER', children: [
      { label: '소개영상', href: 'media.html' },
      { label: '관심고객등록', href: '@register', external: true }
    ]}
  ],

  footer: {
    agency: '온라인대행 : (주)더피알커뮤니케이션&nbsp;&nbsp;|&nbsp;&nbsp;주소 : 서울특별시 서대문구 경기대로 47, 7층 서관 (충정로2가, 진양빌딩)&nbsp;&nbsp;|&nbsp;&nbsp;사업자등록번호 : 101-86-52182',
    trust: '시행수탁 : 한국토지신탁&nbsp;&nbsp;|&nbsp;&nbsp;사업자등록번호 : 120-81-63986',
    notes: [
      '본 홈페이지에 사용된 CG는 고객의 이해를 돕기 위해 제작된 것으로 실제와 차이가 있을 수 있습니다.',
      '중외공원 지구별 시설은 고객의 이해를 돕기 위해 공원조성계획총괄도(광주광역시 고시 제 2023-252호)를 참고하여 연출한 이미지로 실제와 다르며, 중외공원 개발계획은 사업주체 및 시공사와 무관합니다.',
      '광주비엔날레전시관(신설계획)은 고객의 이해를 돕기 위해 광주광역시 시정소식 보도자료 \'광주비엔날레 전시관 국제설계 23개 업체 응모\'(2023.11.21. 배포), [광주 비엔날레 전시관 건립사업] 국제설계공모 심사결과 공고 (광주광역시 고시 제 2023-2040)를 참고하여 연출한 이미지로 실제와 다르며, 인·허가 및 정부시책에 따라 변경 및 취소가 가능하며 사업주체 및 시공사와 무관합니다.',
      '단지 동측과 하백초 서측을 연결하는 왕복 2차로 도로는 “광주광역시북구 고시 제2020-102호, 2022-31호”를 참고하여 연출한 이미지로 차이가 있을 수 있으며, 인·허가 및 정부시책에 따라 변경 및 취소가 가능합니다.',
      '상기 종로엠스쿨 관련 내용은 “시행위탁사”와 “주식회사 교육다움” 교육특화서비스 계약 (24.1.18)체결 기준이며, 추후 변경·취소될 수 있습니다.',
      '상기 내용은 제작 과정에서 오류가 있을 수 있으므로 견본주택에서 반드시 확인바랍니다.'
    ],
    copyright: 'COPYRIGTHT © 힐스테이트 중외공원. ALL RIGHTS RESERVED.'
  },

  // 우측 퀵메뉴 (소개영상 바로가기)
  quickVideos: [
    { img: 'assets/img/quick_img04.png', href: 'media.html?type=2', label: '3D Video' },
    { img: 'assets/img/quick_img01.png', href: 'media.html?type=3', label: 'Sand Art Video' },
    { img: 'assets/img/quick_img03.png', href: 'media.html?type=4', label: 'Concept Video' },
    { img: 'assets/img/quick_img02.png', href: 'media.html?type=5', label: 'Shorts Form' }
  ]
};
