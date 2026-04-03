/* ==============================================
   ui.js — 헤더 스크롤 + FAQ 아코디언 + Swiper
            + AOS [1] + 파트너 애니메이션 [3]
            + 후기 롤링 [2] + 타이핑 효과 [4]
            + 리뷰 슬라이더 무한 스크롤 [5]
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
    if (pcRight) pcRight.addEventListener('scroll', onScroll, { passive: true });
    if (moEl)    moEl.addEventListener('scroll', onScroll, { passive: true });
    if (contentEl)    contentEl.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.body.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
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

  /* ── [5] Swiper 리뷰 슬라이더 — 무한 자동 스크롤 (marquee) ── */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.reviews-swiper', {
      slidesPerView: 1.2,
      spaceBetween: 15,
      loop: true,
      speed: 10000,
      freeMode: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
    });
  }

  /* ── [1] 스크롤 진입 애니메이션 (IntersectionObserver) ──
     AOS는 window.pageYOffset 변화에 의존하므로 .mo/.contents 같은
     커스텀 스크롤 컨테이너에서 동작하지 않음.
     IntersectionObserver(root:null)는 뷰포트 교차를 직접 감지하므로
     스크롤 컨테이너와 무관하게 정확히 동작함.                        */
  (function () {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-aos-delay') || 0, 10);
        setTimeout(function () { el.classList.add('is-visible'); }, delay);
        observer.unobserve(el); // once: true
      });
    }, {
      root: null,               // 뷰포트 기준
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    });

    document.querySelectorAll('[data-aos]').forEach(function (el) {
      observer.observe(el);
    });
  }());

  /* ── [3] 파트너 섹션 — 연결선 + 글로우 애니메이션 (IntersectionObserver) ── */
  var partnersEl = document.querySelector('.partners');
  if (partnersEl) {
    var partnerObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        var line = document.getElementById('partnersLine');
        var sash = document.querySelector('.custom-sash');
        if (line) line.classList.add('is-animated');
        if (sash) {
          setTimeout(function () { sash.classList.add('is-animated'); }, 900);
        }
        partnerObserver.disconnect();
      }
    }, { threshold: 0.5 });
    partnerObserver.observe(partnersEl);
  }

  /* ── [2] 모달 후기 롤링 ── */
  function initReviewRoller() {
    var reviews = document.querySelectorAll('.modal-form__review');
    if (reviews.length < 2) return;
    var current = 0;
    setInterval(function () {
      reviews[current].classList.remove('is-active');
      current = (current + 1) % reviews.length;
      reviews[current].classList.add('is-active');
    }, 3200);
  }
  initReviewRoller();

  /* ── [4] 히어로 타이핑 효과 ("수 없이 증명되고 있는" 순환) ── */
  function initTypingEffect() {
    var el = document.getElementById('typingText');
    if (!el) return;

    var texts = [
      '수 없이 증명되고 있는',
      '고객이 직접 선택하는',
      '전문가가 자신하는',
    ];
    var idx = 0, charIdx = 0, isDeleting = false;

    function tick() {
      var current = texts[idx];
      if (!isDeleting) {
        el.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          isDeleting = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        el.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          idx = (idx + 1) % texts.length;
          setTimeout(tick, 300);
          return;
        }
      }
      setTimeout(tick, isDeleting ? 55 : 85);
    }
    tick();
  }
  initTypingEffect();

});
