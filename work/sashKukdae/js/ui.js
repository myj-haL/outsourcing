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

  /* ── [2] 후기 카드 스택 — Vanilla JS + CSS transform
     상태 3종: is-active(맨 앞) / is-next(뒤 스택) / is-hidden(숨김)
     JS는 클래스 교체만, 전환 애니메이션은 CSS transition 처리
     interval: 2800ms, 호버 시 일시정지                              ── */
  (function () {
    var stack = document.getElementById('reviewStack');
    if (!stack) return;
    var cards = Array.prototype.slice.call(
      stack.querySelectorAll('.review-slider__card')
    );
    if (cards.length < 2) return;

    var timer = null;

    function advance() {
      var activeEl = stack.querySelector('.is-active');
      var nextEl   = stack.querySelector('.is-next');
      var hiddenEl = stack.querySelector('.is-hidden');
      if (!activeEl || !nextEl) return;

      /* 1) 메인 전환 먼저: next가 y=+16에서 출발하기 전에 텔레포트 카드와 겹치지 않도록 */
      activeEl.classList.replace('is-active', 'is-hidden');
      nextEl.classList.replace('is-next', 'is-active');

      /* 2) 다음 프레임에 텔레포트: next가 이미 y=+16을 떠난 뒤 hidden 카드를 아래로 배치 */
      if (hiddenEl) {
        var card = hiddenEl;
        requestAnimationFrame(function () {
          card.style.transition = 'none';
          card.style.opacity = '0';
          card.classList.replace('is-hidden', 'is-next');
          card.offsetHeight; /* reflow */
          card.style.transition = '';
          card.style.opacity = ''; /* 0 → 0.45 페이드인 */
        });
      }
    }

    function start() { timer = setInterval(advance, 2800); }
    function stop()  { clearInterval(timer); }

    start();
    stack.addEventListener('mouseenter', stop);
    stack.addEventListener('mouseleave', start);
  }());

  /* ── [4] 히어로 타이핑 효과 ("수 없이 증명되고 있는" 순환) ── */
  function initTypingEffect() {
    var el = document.getElementById('typingText');
    if (!el) return;

    var texts = [
      '수 없이 증명되고 있는',
      '더 저렴하고 더 꼼꼼한',
      '수 많은 고객이 만족한',
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
