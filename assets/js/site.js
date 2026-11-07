/* ALIEN — scripts do site */
(function () {
  document.documentElement.classList.add('js');

  // Header: sombra ao rolar
  var header = document.querySelector('.header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 20); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile + dropdown de serviços
  var burger = document.querySelector('.burger'), nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open'); nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { burger.classList.remove('open'); nav.classList.remove('open'); });
    });
  }
  document.querySelectorAll('.dd > button').forEach(function (b) {
    b.addEventListener('click', function (e) { e.stopPropagation(); b.parentElement.classList.toggle('open'); });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.dd.open').forEach(function (d) { if (window.innerWidth > 860) d.classList.remove('open'); });
  });

  // FAQ
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) { o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; });
      if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  // Revelar ao rolar
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  // Filtro de modelos (placas)
  var tabs = document.querySelectorAll('.tab[data-filter]');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('on'); }); t.classList.add('on');
      var f = t.getAttribute('data-filter');
      document.querySelectorAll('.model').forEach(function (m) {
        m.classList.toggle('hide', f !== 'all' && m.getAttribute('data-type') !== f);
      });
    });
  });

  // Carrossel de depoimentos
  var car = document.querySelector('.carousel');
  if (car) {
    var track = car.querySelector('.car-track'), slides = car.querySelectorAll('.car-slide'),
        dots = document.querySelectorAll('.dots .dot'), i = 0, timer;
    function go(n) { i = (n + slides.length) % slides.length; track.style.transform = 'translateX(-' + i * 100 + '%)'; dots.forEach(function (d, k) { d.classList.toggle('on', k === i); }); }
    function play() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, 6000); }
    car.querySelector('.prev').addEventListener('click', function () { go(i - 1); play(); });
    car.querySelector('.next').addEventListener('click', function () { go(i + 1); play(); });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); play(); }); });
    var sx = 0;
    car.addEventListener('touchstart', function (e) { sx = e.changedTouches[0].screenX; clearInterval(timer); }, { passive: true });
    car.addEventListener('touchend', function (e) { var d = sx - e.changedTouches[0].screenX; if (Math.abs(d) > 45) go(i + (d > 0 ? 1 : -1)); play(); }, { passive: true });
    car.addEventListener('mouseenter', function () { clearInterval(timer); }); car.addEventListener('mouseleave', play);
    go(0); play();
  }

  // Meta Pixel: evento "Contact" em todo clique de WhatsApp
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (l) {
    l.addEventListener('click', function () { if (typeof fbq === 'function') fbq('track', 'Contact'); });
  });
})();
