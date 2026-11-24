/* ============================================================
   陆地航母 · 课程作业
   Minimal, dependency-free interactions
   ============================================================ */
(function () {
  'use strict';

  var doc = document;
  var nav = doc.getElementById('nav');
  var progress = doc.getElementById('progressBar');
  var backTop = doc.getElementById('backTop');
  var toggle = doc.getElementById('navToggle');
  var drawer = doc.getElementById('drawer');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- scroll progress + nav state ---------- */
  function onScroll() {
    var root = doc.documentElement;
    var max = root.scrollHeight - root.clientHeight;
    var y = window.scrollY || root.scrollTop || 0;

    if (progress) {
      progress.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
    }
    if (nav) {
      nav.classList.toggle('is-scrolled', y > 44);
    }
    if (backTop) {
      backTop.style.display = y > 900 ? 'block' : 'none';
    }

    // active section link
    var sections = doc.querySelectorAll('main section[id]');
    var links = doc.querySelectorAll('.nav__links a');
    var current = '';
    for (var i = 0; i < sections.length; i++) {
      var s = sections[i];
      if (s.offsetTop - 130 <= y) current = s.id;
    }
    for (var j = 0; j < links.length; j++) {
      var href = links[j].getAttribute('href') || '';
      links[j].classList.toggle('is-active', href === '#' + current);
    }
  }

  var ticking = false;
  function requestScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onScroll();
      ticking = false;
    });
  }
  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll);
  onScroll();

  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- mobile menu ---------- */
  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('is-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (toggle) toggle.setAttribute('aria-label', '打开菜单');
    doc.body.style.overflow = '';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
      doc.body.style.overflow = open ? 'hidden' : '';
    });
  }

  if (drawer) {
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) closeMenu();
  });

  /* ---------- reveal on scroll ---------- */
  var reveals = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- product tabs ---------- */
  var tabs = doc.querySelectorAll('[data-tab]');
  var panels = doc.querySelectorAll('[data-panel]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var key = tab.getAttribute('data-tab');
      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
        t.setAttribute('tabindex', active ? '0' : '-1');
      });
      panels.forEach(function (p) {
        var show = p.getAttribute('data-panel') === key;
        p.hidden = !show;
        p.classList.toggle('is-active', show);
      });
    });
    tab.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      var list = Array.prototype.slice.call(tabs);
      var idx = list.indexOf(tab);
      var next = e.key === 'ArrowRight' ? (idx + 1) % list.length : (idx - 1 + list.length) % list.length;
      list[next].focus();
      list[next].click();
    });
  });

  /* ---------- separation process ---------- */
  var process = doc.querySelector('[data-process]');
  if (process) {
    var steps = process.querySelectorAll('[data-step]');
    function setStep(n) {
      process.setAttribute('data-active', String(n));
      steps.forEach(function (s) {
        s.classList.toggle('is-active', s.getAttribute('data-step') === String(n));
        s.setAttribute('aria-pressed', s.getAttribute('data-step') === String(n) ? 'true' : 'false');
      });
    }
    steps.forEach(function (step) {
      step.setAttribute('aria-pressed', 'false');
      step.addEventListener('click', function () {
        setStep(step.getAttribute('data-step'));
      });
    });
    setStep(1);
  }

  /* ---------- market calculator ---------- */
  var units = doc.getElementById('units');
  var price = doc.getElementById('price');
  var conversion = doc.getElementById('conversion');
  var unitsOut = doc.getElementById('unitsOut');
  var priceOut = doc.getElementById('priceOut');
  var conversionOut = doc.getElementById('conversionOut');
  var annualRevenue = doc.getElementById('annualRevenue');
  var orderValue = doc.getElementById('orderValue');
  var yearsToDeliver = doc.getElementById('yearsToDeliver');

  function fmt(n, digits) {
    var d = typeof digits === 'number' ? digits : 1;
    return Number(n).toLocaleString('zh-CN', {
      minimumFractionDigits: d,
      maximumFractionDigits: d
    });
  }

  function updateCalc() {
    if (!units || !price || !conversion) return;
    var u = Number(units.value);
    var p = Number(price.value);
    var c = Number(conversion.value) / 100;

    if (unitsOut) unitsOut.textContent = fmt(u, 0) + ' 台';
    if (priceOut) priceOut.textContent = fmt(p, 0) + ' 万元';
    if (conversionOut) conversionOut.textContent = fmt(c * 100, 0) + '%';

    var annual = (u * p) / 10000; // 亿元
    var convertedOrders = 7000 * c;
    var orderTotal = (convertedOrders * p) / 10000;
    var years = convertedOrders / u;

    if (annualRevenue) annualRevenue.innerHTML = fmt(annual, 1) + '<small>亿元 / 年</small>';
    if (orderValue) orderValue.textContent = fmt(orderTotal, 1) + ' 亿元';
    if (yearsToDeliver) {
      if (u > convertedOrders) {
        yearsToDeliver.textContent = '订单不足';
      } else if (years > 20) {
        yearsToDeliver.textContent = '20+ 年';
      } else {
        yearsToDeliver.textContent = fmt(years, 1) + ' 年';
      }
    }
  }
  [units, price, conversion].forEach(function (el) {
    if (el) el.addEventListener('input', updateCalc);
  });
  updateCalc();

  /* ---------- direct hash landing ---------- */
  if (window.location.hash) {
    var hashTarget = null;
    try { hashTarget = doc.querySelector(window.location.hash); } catch (e) { hashTarget = null; }
    if (hashTarget) {
      var targetSection = hashTarget.closest ? (hashTarget.closest('section') || hashTarget) : hashTarget;
      if (targetSection.querySelectorAll) {
        targetSection.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
      }
      var jumpToHash = function () {
        var prevBehavior = doc.documentElement.style.scrollBehavior;
        doc.documentElement.style.scrollBehavior = 'auto';
        var top = hashTarget.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) - 86;
        window.scrollTo(0, top);
        doc.documentElement.style.scrollBehavior = prevBehavior;
      };
      jumpToHash();
      onScroll();
      if (doc.readyState !== 'complete') {
        window.addEventListener('load', function () {
          window.requestAnimationFrame(function () {
            jumpToHash();
            onScroll();
          });
        }, { once: true });
      }
    }
  }

  /* ---------- claim audit filter ---------- */
  var filterButtons = doc.querySelectorAll('[data-filter]');
  var claimRows = doc.querySelectorAll('.claim-table tbody tr');
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filterButtons.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      claimRows.forEach(function (row) {
        var show = f === 'all' || row.getAttribute('data-grade') === f;
        row.classList.toggle('is-hidden', !show);
      });
    });
  });

})();
