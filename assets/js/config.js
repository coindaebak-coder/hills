/*
 * 사이트 공통 설정
 * 전화번호·주소 등 현장 정보는 이 파일 한 곳에서만 수정하면 전 페이지에 반영됩니다.
 * TODO 표시된 값은 원본 사이트(hillstate-park.com/pc) 확인 후 교체하세요.
 */
window.SITE = {
  name: '힐스테이트 중외공원',
  nameEn: 'HILLSTATE JUNGOE PARK',
  theme: 'hillstate',
  tel: '1600-0000', // TODO: 대표번호
  modelHouse: '광주광역시 서구 상무대로 667',
  siteAddress: '광주광역시 북구 운암동·매곡동 일원 (중외공원 민간공원특례사업)',
  mapUrl: 'https://map.kakao.com/?q=' + encodeURIComponent('광주광역시 서구 상무대로 667'),
  builder: '현대엔지니어링 · 범양건영',
  footerNotes: [
    '본 홈페이지의 이미지 및 CG는 소비자의 이해를 돕기 위한 것으로 실제와 차이가 있을 수 있습니다.',
    '단지 내 조경, 시설물, 마감재 등은 인·허가 과정 및 현장 여건에 따라 변경될 수 있습니다.',
    '정확한 내용은 반드시 입주자모집공고를 확인하시기 바랍니다.'
  ],
  nav: [
    { label: '사업안내', href: 'business.html', children: [
      { label: '사업개요', href: 'business.html' },
      { label: '브랜드', href: 'business.html#brand' }
    ]},
    { label: '입지환경', href: 'location.html' },
    { label: '단지안내', href: 'complex.html', children: [
      { label: '단지배치도', href: 'complex.html' },
      { label: '커뮤니티', href: 'complex.html#community' }
    ]},
    { label: '세대안내', href: 'unit.html' },
    { label: '분양안내', href: 'notice.html', children: [
      { label: '분양일정', href: 'notice.html' },
      { label: '모집공고', href: 'notice.html#announce' }
    ]},
    { label: '관심고객등록', href: 'register.html' },
    { label: '오시는길', href: 'visit.html' }
  ]
};
