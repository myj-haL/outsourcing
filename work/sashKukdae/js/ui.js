/* ==============================================
   ui.js — 헤더 스크롤 + FAQ 아코디언 + Swiper
   ============================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 헤더 스크롤 효과 ── */
  var mainHeader = document.getElementById('mainHeader');
  var pcRight = document.querySelector('.pc-right');
  var moEl    = document.querySelector('.mo');
  var contentEl    = document.querySelector('.contents');

  if (mainHeader) {
    function onScroll() {
      var scrollTop = (pcRight ? pcRight.scrollTop : 0)
        || (moEl ? moEl.scrollTop : 0)
        || (contentEl ? contentEl.scrollTop : 0)
        || window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop
        || 0;
      mainHeader.classList.toggle('header--scrolled', scrollTop > 0);
    }
    // .pc-right / .mo / window / body 중 어느 곳이 scroll container여도 감지
    if (pcRight) pcRight.addEventListener('scroll', onScroll, { passive: true });
    if (moEl)    moEl.addEventListener('scroll', onScroll, { passive: true });
    if (contentEl)    contentEl.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.body.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // 초기 상태 적용
  }

  /* ── FAQ 아코디언 ── */
  document.querySelectorAll('.faq__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var isOpen = item.classList.contains('faq__item--open');
      document.querySelectorAll('.faq__item').forEach(function (i) {
        i.classList.remove('faq__item--open');
      });
      if (!isOpen) item.classList.add('faq__item--open');
    });
  });

  /* ── Swiper 슬라이더 ── */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.reviews-swiper', {
      slidesPerView: 1.2,
      spaceBetween: 15,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.reviews-swiper .swiper-pagination',
        clickable: true,
      },
    });
  }

});
