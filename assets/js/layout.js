/* 공통 헤더·서브비주얼·푸터·퀵메뉴 삽입 및 UI 동작 */
(function () {
  var S = window.SITE;
  var page = location.pathname.split('/').pop() || 'index.html';
  if (page.indexOf('.') < 0) page = 'index.html';
  var isMain = page === 'index.html';
  var telHref = 'tel:' + S.tel.replace(/[^0-9]/g, '');
  var telDot = S.tel.replace('-', '.');

  document.documentElement.setAttribute('data-theme', S.theme);

  function href(c) { return c.href === '@register' ? S.registerUrl : c.href; }
  function attrs(c) { return c.external ? ' target="_blank" rel="noopener"' : ''; }

  // 현재 메뉴 찾기
  var group = null, current = null;
  S.nav.forEach(function (g) {
    g.children.forEach(function (c) { if (c.href === page) { group = g; current = c; } });
  });

  // ===== Header =====
  var gnb = S.nav.map(function (g) {
    return '<li' + (g === group ? ' class="active"' : '') + '>' +
      '<a class="d1" href="' + href(g.children[0]) + '">' + g.label + '</a>' +
      '<ul class="d2">' + g.children.map(function (c) {
        return '<li><a href="' + href(c) + '"' + attrs(c) + '>' + c.label + '</a></li>';
      }).join('') + '</ul></li>';
  }).join('');

  var header = document.createElement('header');
  header.className = 'site-header' + (isMain ? ' is-main' : '');
  header.innerHTML =
    '<div class="hd-inner">' +
      '<h1 class="logo"><a href="index.html"><img src="assets/img/logo.png" alt="힐스테이트 중외공원"></a></h1>' +
      '<nav class="gnb" aria-label="주메뉴"><ul>' + gnb + '</ul></nav>' +
      '<div class="hd-util">' +
        '<a class="hd-reg" href="' + S.registerUrl + '" target="_blank" rel="noopener">관심고객등록</a>' +
        '<a class="hd-tel" href="' + telHref + '"><span class="ico-tel" aria-hidden="true"></span>' + telDot + '</a>' +
      '</div>' +
      '<button class="menu-btn" type="button" aria-label="메뉴 열기" aria-expanded="false"><span></span><span></span><span></span></button>' +
    '</div>' +
    '<div class="gnb-bg"></div>';
  document.body.insertBefore(header, document.body.firstChild);

  // ===== Sub visual + LNB + page title =====
  var main = document.querySelector('main');
  if (!isMain && group && main) {
    var sv = document.createElement('section');
    sv.className = 'sub-visual';
    sv.innerHTML =
      '<div class="sv-bg"></div>' +
      '<nav class="lnb" aria-label="' + group.label + ' 하위메뉴"><ul>' +
        group.children.map(function (c) {
          return '<li><a href="' + href(c) + '"' + attrs(c) + (c === current ? ' class="on" aria-current="page"' : '') + '>' + c.label + '</a></li>';
        }).join('') +
      '</ul></nav>';
    main.parentNode.insertBefore(sv, main);

    var title = document.createElement('div');
    title.className = 'page-title';
    title.innerHTML = '<p class="en">' + group.en + '</p><h2>' + current.label + '</h2><span class="bar" aria-hidden="true"></span>';
    main.insertBefore(title, main.firstChild);
    document.title = current.label + ' | ' + S.name;
  }

  // ===== Footer =====
  var F = S.footer;
  var footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML =
    '<div class="ft-inner">' +
      '<div class="ft-left">' +
        '<div class="ft-logo"><img src="assets/img/foot-logo.png" alt="HILLSTATE"></div>' +
        '<div class="ft-info">' +
          '<div class="ft-corp"><img src="assets/img/foot-img02.png" alt="시행 한국토지신탁 · 시공 현대엔지니어링, 범양건영"></div>' +
          '<p>' + F.agency + '</p><p>' + F.trust + '</p>' +
          '<ul class="ft-notes">' + F.notes.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul>' +
          '<p class="copy">' + F.copyright + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="ft-right">' +
        '<a class="ft-tel" href="' + telHref + '"><small>분양문의</small>' + telDot + '</a>' +
        '<a class="ft-privacy" href="' + S.privacyPdf + '" target="_blank" rel="noopener">개인정보처리방침</a>' +
      '</div>' +
    '</div>';
  document.body.appendChild(footer);

  // ===== Quick (우측 고정) =====
  var quick = document.createElement('aside');
  quick.className = 'quick';
  quick.setAttribute('aria-label', '빠른메뉴');
  quick.innerHTML =
    '<a class="q-open" href="sale02.html"><b>선착순<br>분양중</b></a>' +
    '<a class="q-ico q-map" href="location.html" title="오시는길"><span class="sr-only">오시는길</span></a>' +
    '<a class="q-ico q-reg" href="' + S.registerUrl + '" target="_blank" rel="noopener" title="관심고객등록"><span class="sr-only">관심고객등록</span></a>' +
    '<div class="q-video"><p>QUICK<br>MENU</p><ul>' +
      S.quickVideos.map(function (v, i) {
        return '<li><a href="' + v.href + '" data-video="' + i + '"><img src="' + v.img + '" alt="' + v.label + ' 재생"></a></li>';
      }).join('') +
    '</ul></div>' +
    '<button class="q-top" type="button">TOP</button>';
  document.body.appendChild(quick);

  var mobileBar = document.createElement('div');
  mobileBar.className = 'mobile-bar';
  mobileBar.innerHTML =
    '<a href="' + telHref + '">전화상담</a>' +
    '<a href="' + S.registerUrl + '" target="_blank" rel="noopener">관심고객등록</a>' +
    '<a href="media.html">홍보영상</a>' +
    '<a href="location.html">오시는길</a>';
  document.body.appendChild(mobileBar);

  // ===== 동작 =====
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
    quick.classList.toggle('show-top', window.scrollY > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var btn = header.querySelector('.menu-btn');
  btn.addEventListener('click', function () {
    var open = header.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', open);
    document.body.classList.toggle('no-scroll', open);
  });
  // 모바일: 1차 메뉴 탭하면 하위메뉴 펼치기
  header.querySelectorAll('.gnb .d1').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.innerWidth > 1024) return;
      e.preventDefault();
      var li = a.parentNode;
      header.querySelectorAll('.gnb > ul > li').forEach(function (x) { if (x !== li) x.classList.remove('open'); });
      li.classList.toggle('open');
    });
  });

  quick.querySelector('.q-top').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== 퀵메뉴 동영상 팝업 =====
  var vm = document.createElement('div');
  vm.className = 'video-modal';
  vm.hidden = true;
  vm.innerHTML =
    '<div class="vm-box" role="dialog" aria-modal="true">' +
      '<div class="vm-head"><h2 class="vm-title"></h2><button type="button" class="vm-close" aria-label="닫기">&times;</button></div>' +
      '<div class="vm-tabs" role="tablist"></div>' +
      '<div class="vm-player"><iframe title="동영상" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>' +
    '</div>';
  document.body.appendChild(vm);
  var vmFrame = vm.querySelector('iframe');
  var vmTabs = vm.querySelector('.vm-tabs');
  function play(id) {
    vmFrame.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
  }
  function openVideo(v) {
    vm.querySelector('.vm-title').textContent = v.label;
    vm.querySelector('.vm-box').classList.toggle('shorts', !!v.shorts);
    vmTabs.innerHTML = v.videos.length > 1 ? v.videos.map(function (x, n) {
      return '<button type="button" role="tab" data-id="' + x.id + '"' + (n === 0 ? ' class="on"' : '') + '>' + x.title + '</button>';
    }).join('') : '';
    vmTabs.hidden = v.videos.length < 2;
    play(v.videos[0].id);
    vm.hidden = false;
    document.body.classList.add('no-scroll');
    vm.querySelector('.vm-close').focus();
  }
  function closeVideo() {
    vm.hidden = true;
    vmFrame.src = 'about:blank';
    document.body.classList.remove('no-scroll');
  }
  vmTabs.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    vmTabs.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
    play(b.getAttribute('data-id'));
  });
  vm.querySelector('.vm-close').addEventListener('click', closeVideo);
  vm.addEventListener('click', function (e) { if (e.target === vm) closeVideo(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !vm.hidden) closeVideo(); });
  quick.querySelectorAll('[data-video]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      openVideo(S.quickVideos[+a.getAttribute('data-video')]);
    });
  });

  // 스크롤 등장
  var targets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('revealed'); });
  }

  // 탭: [data-tabs] > [data-tab] 버튼, [data-panel] 패널
  // 패널 안 iframe은 data-src로 두고 보일 때만 로드 (영상 동시 재생 방지)
  document.querySelectorAll('[data-tabs]').forEach(function (wrap) {
    var btns = wrap.querySelectorAll('[data-tab]');
    var panels = wrap.querySelectorAll('[data-panel]');
    function show(i) {
      btns.forEach(function (b, n) { b.classList.toggle('on', n === i); b.setAttribute('aria-selected', n === i); });
      panels.forEach(function (p, n) {
        p.hidden = n !== i;
        p.querySelectorAll('iframe[data-src]').forEach(function (f) {
          f.src = n === i ? f.getAttribute('data-src') : 'about:blank';
        });
      });
    }
    btns.forEach(function (b, i) { b.addEventListener('click', function () { show(i); }); });
    // media.html?type=2 → 두 번째 탭 (원본 사이트와 같은 규칙: type=N → N번째 탭)
    var start = 0;
    var m = location.search.match(/type=(\d+)/);
    if (m && wrap.hasAttribute('data-tabs-type')) start = Math.min(+m[1] - 1, btns.length - 1);
    show(Math.max(start, 0));
  });
})();
