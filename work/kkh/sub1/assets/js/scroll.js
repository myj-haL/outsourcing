/* ─────────────────────────────────────────────────────────
   scroll.js  |  타임라인 가로 스크롤 (GSAP ScrollTrigger)
   ───────────────────────────────────────────────────────── */

gsap.registerPlugin(ScrollTrigger);

var MOBILE_BREAK = 980;

/* ── 하드코딩 데이터 ──────────────────────────────────── */
var TIMELINE_DATA = [
  {
    year: 2022,
    position: 'bottom',
    title: '대한노인회 표창 수상',
    desc: '대한민국 천년희망프로젝트 제10회 도전페스티벌 대한노인회장상 수상\n국가와 국민을 위한 공헌과 헌신으로 대한민국 사회에 선한 영향력 확산에 이바지한 공로를 인정받아 수상',
    image: 'assets/img/2022-1.png'
  },
  {
    year: 2022,
    position: 'top',
    title: '국회 기획재정위원장 표창 수상',
    desc: '국가공헌협회의 투명하게 운영되는 투명성과 더불어 타 단체의 모범이 되는 점 등의 공로를 인정받아 수상',
    image: 'assets/img/2022-2.png'
  },
  {
    year: 2025,
    position: 'bottom',
    title: '서울특별시의회 의장 표창 수상',
    desc: '따스한채움터와 진행한 취약계층을 위한 무료급식 지원 공로를 인정받아 수상',
    image: 'assets/img/2025-1.png'
  },
  {
    year: 2025,
    position: 'top',
    title: '서울지방보훈청 표창 수상',
    desc: '힐링사운드 합창단 정기 후원을 통해 국가유공자 복지 증진 공로를 인정받아 수상',
    image: 'assets/img/2025-2.png'
  },
  {
    year: 2026,
  }
];

/* ── XSS 방지 ─────────────────────────────────────────── */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ── 단일 카드 HTML ───────────────────────────────────── */
function buildCard(item, modifier) {
  if (!item) return '';

  var descHtml = item.desc
    ? '<p class="timeline-card__desc">' +
        esc(item.desc).replace(/\n/g, '<br>') +
      '</p>'
    : '';

  var imgHtml = item.image
    ? '<img class="timeline-card__img" src="' + esc(item.image) + '" alt="" loading="lazy">'
    : '';

  return (
    '<div class="timeline-card ' + modifier + '">' +
      '<p class="timeline-card__title">' + esc(item.title) + '</p>' +
      descHtml +
      imgHtml +
    '</div>'
  );
}

/* ── 연도 컬럼 HTML ───────────────────────────────────── */
function buildCol(year, cards) {
  return (
    '<div class="timeline-axis">' +
        '<span class="timeline-year">' + esc(String(year)) + '</span>' +
      '</div>' +
      buildCard(cards.bottom, 'timeline-card--bottom') +
      buildCard(cards.top,    'timeline-card--top')
  );
}

/* ── 카드 렌더링 ──────────────────────────────────────── */
function renderCards() {
  var track = document.querySelector('.timeline-track');
  if (!track) return;

  var years   = [];
  var yearMap = {};
  TIMELINE_DATA.forEach(function (item) {
    if (!yearMap[item.year]) {
      yearMap[item.year] = {};
      years.push(item.year);
    }
    yearMap[item.year][item.position] = item;
  });

  track.innerHTML = years.map(function (year) {
    return buildCol(year, yearMap[year]);
  }).join('');
}

/* ── PC: GSAP 가로 스크롤 ─────────────────────────────── */
var _scrollST = null;

function setupScrollTrigger() {
  // 기존 인스턴스 제거
  if (_scrollST) {
    _scrollST.kill();
    _scrollST = null;
  }

  var section = document.querySelector('.timeline-section');
  var track   = document.querySelector('.timeline-section');
  if (!section || !track) return;

  gsap.set(track, { x: 0 });

  var scrollAmount = track.scrollWidth - window.innerWidth;

  if (scrollAmount <= 0) {
    console.warn('[scroll] scrollAmount <= 0');
    return;
  }

  console.log('[scroll] scrollAmount:', scrollAmount);

  _scrollST = ScrollTrigger.create({
    animation: gsap.to(track, { x: -scrollAmount, ease: 'none' }),
    trigger  : section,
    start    : 'top top',
    end      : '+=' + scrollAmount,
    pin      : true,
    scrub    : 1,
    invalidateOnRefresh: true,
    onEnter  : function () { console.log('[scroll] pin 시작'); },
    onLeave  : function () { console.log('[scroll] pin 해제'); },
  });
}

function initHorizontalScroll() {
  requestAnimationFrame(function () {
    setupScrollTrigger();
  });

  // 리사이즈 시 kill → 재생성
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setupScrollTrigger, 200);
  });
}

/* ── 모바일: IntersectionObserver fade-up ─────────────── */
function initMobile() {
  var cards = document.querySelectorAll('.timeline-card--top, .timeline-card--bottom');
  if (!cards.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(function (card) { observer.observe(card); });
}

/* ── 진입점 ───────────────────────────────────────────── */
function initTimeline() {
  renderCards();

  if (window.innerWidth >= MOBILE_BREAK) {
    initHorizontalScroll();
  } else {
    initMobile();
  }
}


  window.addEventListener("load", function() {
    initTimeline();
  });
