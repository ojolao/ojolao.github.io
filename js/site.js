(function () {
  'use strict';

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Memorial popup: once per browser session
  var memorial = document.getElementById('memorialDialog');
  if (memorial && typeof memorial.showModal === 'function') {
    var seen = false;
    try { seen = sessionStorage.getItem('memorialSeen') === '1'; } catch (e) {}
    if (!seen) memorial.showModal();
    memorial.addEventListener('close', function () {
      try { sessionStorage.setItem('memorialSeen', '1'); } catch (e) {}
    });
    memorial.addEventListener('click', function (e) { if (e.target === memorial) memorial.close(); });
  }

  // Photo lightbox
  var box = document.getElementById('lightbox');
  if (!box || typeof box.showModal !== 'function') return;
  var img = document.getElementById('lbImg');
  var cap = document.getElementById('lbCap');
  var credit = document.getElementById('lbCredit');
  var current = [];
  var index = 0;
  var opener = null;

  function show(i) {
    index = (i + current.length) % current.length;
    var t = current[index];
    img.src = t.dataset.full;
    img.alt = t.dataset.caption;
    cap.textContent = t.dataset.caption;
    credit.textContent = t.dataset.credit;
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('.thumb');
    if (!t) return;
    opener = t;
    current = Array.prototype.slice.call(document.querySelectorAll('.thumb[data-gallery="' + t.dataset.gallery + '"]'));
    show(current.indexOf(t));
    box.showModal();
  });
  box.querySelector('.lb-close').addEventListener('click', function () { box.close(); });
  box.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1); });
  box.querySelector('.lb-next').addEventListener('click', function () { show(index + 1); });
  box.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
  box.addEventListener('close', function () { if (opener) opener.focus(); });
})();
