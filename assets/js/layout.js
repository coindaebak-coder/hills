/* 공통 헤더·푸터·플로팅 버튼 삽입 및 UI 동작 */
(function () {
  var S = window.SITE;
  var page = location.pathname.split('/').pop() || 'index.html';
  var telHref = 'tel:' + S.tel.replace(/[^0-9]/g, '');

  document.documentElement.setAttribute('data-theme', S.theme);

  function isActive(item) {
    if (item.href.split('#')[0] === page) return true;
    return (item.children || []).some(function (c) { return c.href.split('#')[0] === page; });
  }

  var navHtml = S.nav.map(function (item) {
    var sub = item.children
      ? '<ul class="gnb-sub">' + item.children.map(function (c) {
          return '<li><a href="' + c.href + '">' + c.label + '</a></li>';
        }).join('') + '</ul>'
      : '';
    return '<li class="' + (isActive(item) ? 'active' : '') + '"><a href="' + item.href + '">' + item.label + '</a>' + sub + '</li>';
  }).join('');

  var header = document.createElement('header');
  header.className = 'site-header' + (page === 'index.html' ? ' is-transparent' : '');
  header.innerHTML =
    '<div class="inner">' +
      '<a class="logo" href="index.html"><span class="logo-mark">HILLSTATE</span><span class="logo-name">' + S.name + '</span></a>' +
      '<nav class="gnb" aria-label="주메뉴"><ul>' + navHtml + '</ul></nav>' +
      '<a class="header-tel" href="' + telHref + '">' + S.tel + '</a>' +
      '<button class="menu-btn" type="button" aria-label="메뉴 열기" aria-expanded="false"><span></span><span></span><span></span></button>' +
    '</div>';
  document.body.insertBefore(header, document.body.firstChild);

  var footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML =
    '<div class="inner">' +
      '<div class="footer-logo"><span class="logo-mark">HILLSTATE</span> ' + S.name + '</div>' +
      '<ul class="footer-info">' +
        '<li><b>현장위치</b> ' + S.siteAddress + '</li>' +
        '<li><b>견본주택</b> ' + S.modelHouse + '</li>' +
        '<li><b>분양문의</b> <a href="' + telHref + '">' + S.tel + '</a></li>' +
        '<li><b>시공</b> ' + S.builder + '</li>' +
      '</ul>' +
      '<ul class="footer-notes">' + S.footerNotes.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul>' +
      '<p class="copyright">© ' + S.nameEn + '. All rights reserved.</p>' +
    '</div>';
  document.body.appendChild(footer);

  var quick = document.createElement('div');
  quick.className = 'quick';
  quick.innerHTML =
    '<a class="quick-reg" href="register.html">관심고객<br>등록</a>' +
    '<a class="quick-tel" href="' + telHref + '" aria-label="전화 상담">TEL</a>' +
    '<button class="quick-top" type="button" aria-label="맨 위로">TOP</button>';
  document.body.appendChild(quick);

  var mobileBar = document.createElement('div');
  mobileBar.className = 'mobile-bar';
  mobileBar.innerHTML =
    '<a href="' + telHref + '">전화상담</a><a href="register.html">관심고객등록</a><a href="visit.html">오시는길</a>';
  document.body.appendChild(mobileBar);

  // 헤더 스크롤 상태
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 모바일 메뉴
  var btn = header.querySelector('.menu-btn');
  btn.addEventListener('click', function () {
    var open = header.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', open);
    document.body.classList.toggle('no-scroll', open);
  });

  quick.querySelector('.quick-top').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 스크롤 등장 애니메이션
  var targets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('revealed'); });
  }

  // 탭
  document.querySelectorAll('[data-tabs]').forEach(function (wrap) {
    var btns = wrap.querySelectorAll('[data-tab]');
    var panels = wrap.querySelectorAll('[data-panel]');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
        panels.forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== b.getAttribute('data-tab'); });
      });
    });
  });

  // 메인 비주얼 슬라이더
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    var idx = 0;
    var dots = document.querySelector('.hero-dots');
    slides.forEach(function (_, i) {
      var d = document.createElement('button');
      d.type = 'button';
      d.setAttribute('aria-label', (i + 1) + '번 슬라이드');
      d.addEventListener('click', function () { go(i); restart(); });
      dots && dots.appendChild(d);
    });
    function go(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle('on', n === idx); });
      dots && Array.prototype.forEach.call(dots.children, function (d, n) { d.classList.toggle('on', n === idx); });
    }
    var timer;
    function restart() { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 6000); }
    go(0); restart();
  }

  // 이미지 자리: 파일이 있으면 표시, 없으면 "이미지 준비중" 라벨 유지
  document.querySelectorAll('.ph[data-src]').forEach(function (el) {
    var img = new Image();
    img.onload = function () {
      el.style.backgroundImage = 'url(' + el.getAttribute('data-src') + ')';
      el.classList.add('has-img');
    };
    img.src = el.getAttribute('data-src');
  });

  // 치환 토큰: data-site="tel" 등
  document.querySelectorAll('[data-site]').forEach(function (el) {
    var key = el.getAttribute('data-site');
    if (S[key] != null) el.textContent = S[key];
    if (key === 'tel' && el.tagName === 'A') el.href = telHref;
    if (key === 'modelHouse' && el.tagName === 'A') el.href = S.mapUrl;
  });
})();
