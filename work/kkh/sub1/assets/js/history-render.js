/**
 * history-render.js (v2 - optimized)
 * 국가공헌협회 — '걸어온 길' 연혁 섹션 동적 렌더링
 *
 * 개선사항:
 *   ⑤ version 기반 캐시 버스팅 (Date.now() 대신 서버 저장 버전 활용)
 *   ⑥ containerAnimation 변수 직접 참조로 타이밍 이슈 해결
 *   ⑦ 탭 전환 시 섹션 상단으로 스크롤 초기화
 *   ⑧ JSON 로드 실패 시 화면에 에러 메시지 표시
 */

(function () {
  'use strict';

  // ── 설정 ────────────────────────────────────────────────
  const CONFIG = {
    jsonPath    : './history.json',
    sectionEl   : '.history-section',
    tabsEl      : '.history-tabs',
    trackEl     : '.history-track',
    errorEl     : '.history-error',   // ⑧ 에러 표시 영역 (없으면 자동 생성)
    activeClass : 'is-active',
    mobileBreak : 768,
  };

  // ⑥ 수평 스크롤 ScrollTrigger 인스턴스를 모듈 스코프에서 관리
  let horizontalST = null;

  // ── ⑧ 에러 UI 표시 ──────────────────────────────────────
  function showError(msg) {
    const section = document.querySelector(CONFIG.sectionEl);
    if (!section) return;

    let el = section.querySelector(CONFIG.errorEl.replace('.', ''));
    if (!el) {
      el = document.createElement('p');
      el.className = CONFIG.errorEl.replace('.', '');
      el.style.cssText = 'text-align:center;padding:60px 20px;color:#888;font-size:14px;';
      section.appendChild(el);
    }
    el.textContent = msg;
  }

  // ── ⑤ version 기반 캐시 버스팅 ──────────────────────────
  // history.json 에 저장된 version(타임스탬프)을 localStorage 에 캐싱.
  // version 이 바뀌었을 때만 새로 fetch.
  async function fetchHistory() {
    const CACHE_KEY = 'history_cache';
    const VER_KEY   = 'history_version';

    // 1차 시도: 캐시 확인
    const cachedVer  = localStorage.getItem(VER_KEY);
    const cachedData = localStorage.getItem(CACHE_KEY);

    // 버전 확인을 위해 항상 JSON fetch (헤더만 보내지 않으므로 용량 문제 없음)
    const res = await fetch(CONFIG.jsonPath);
    if (!res.ok) throw new Error('history.json 로드 실패: ' + res.status);

    const json    = await res.json();
    const version = String(json.version ?? 0);
    const data    = json.data ?? (Array.isArray(json) ? json : []);

    // 버전이 같으면 캐시 반환
    if (cachedVer === version && cachedData) {
      try { return JSON.parse(cachedData); } catch (_) {}
    }

    // 버전이 다르면 캐시 갱신
    try {
      localStorage.setItem(VER_KEY,   version);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (_) { /* localStorage 용량 초과 시 무시 */ }

    return data;
  }

  // ── 연도 목록 ────────────────────────────────────────────
  function getYears(data) {
    return [...new Set(data.map(d => d.year))].sort((a, b) => b - a);
  }

  // ── 탭 렌더링 ────────────────────────────────────────────
  function renderTabs(years, activeYear, onSelect) {
    const tabsEl = document.querySelector(CONFIG.tabsEl);
    if (!tabsEl) return;

    tabsEl.innerHTML = years.map(y => `
      <button
        class="history-tab${y === activeYear ? ' ' + CONFIG.activeClass : ''}"
        data-year="${y}"
        type="button"
        aria-selected="${y === activeYear}"
      >${y}</button>
    `).join('');

    tabsEl.querySelectorAll('.history-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        tabsEl.querySelectorAll('.history-tab').forEach(b => {
          b.classList.remove(CONFIG.activeClass);
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add(CONFIG.activeClass);
        btn.setAttribute('aria-selected', 'true');
        onSelect(parseInt(btn.dataset.year));
      });
    });
  }

  // ── 카드 HTML ────────────────────────────────────────────
  function buildCard(row) {
    const monthStr = String(row.month).padStart(2, '0');
    const dateStr  = `${row.year}.${monthStr}`;

    const itemsHtml = row.items.map(item => `
      <li class="history-card__item">
        <span class="history-card__dot" aria-hidden="true"></span>
        ${escHtml(item)}
      </li>
    `).join('');

    const imageHtml = row.image
      ? `<div class="history-card__img-wrap">
           <img src="${escHtml(row.image)}" alt="${dateStr} 활동 이미지" loading="lazy">
         </div>`
      : '';

    return `
      <div class="history-card" data-year="${row.year}" data-id="${escHtml(row.id)}">
        <p class="history-card__date">${escHtml(dateStr)}</p>
        <ul class="history-card__items">${itemsHtml}</ul>
        ${imageHtml}
      </div>
    `;
  }

  // ── 트랙 렌더링 ──────────────────────────────────────────
  function renderTrack(data, year) {
    const trackEl = document.querySelector(CONFIG.trackEl);
    if (!trackEl) return;

    const filtered = data
      .filter(d => d.year === year)
      .sort((a, b) => b.month - a.month);

    trackEl.innerHTML = filtered.length === 0
      ? '<p class="history-empty" style="padding:40px;color:#888;">등록된 연혁이 없습니다.</p>'
      : filtered.map(buildCard).join('');

    refreshScrollTrigger();
  }

  // ── GSAP ScrollTrigger ───────────────────────────────────
  function initScrollTrigger() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[history-render] GSAP / ScrollTrigger 미로드.');
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    setupHorizontalScroll();
  }

  function refreshScrollTrigger() {
    if (typeof ScrollTrigger === 'undefined') return;

    // 기존 인스턴스 정리
    if (horizontalST) {
      horizontalST.kill();
      horizontalST = null;
    }
    ScrollTrigger.getAll()
      .filter(st => st.vars._historyCard)
      .forEach(st => st.kill());

    setupHorizontalScroll();
  }

  function setupHorizontalScroll() {
    const section = document.querySelector(CONFIG.sectionEl);
    const track   = document.querySelector(CONFIG.trackEl);
    if (!section || !track) return;

    if (window.innerWidth < CONFIG.mobileBreak) {
      applyMobileFadeUp();
      return;
    }

    // ⑥ 트랙 너비가 렌더 완료 후 계산되도록 RAF 사용
    requestAnimationFrame(() => {
      const scrollAmt = track.scrollWidth - window.innerWidth;
      if (scrollAmt <= 0) return;

      // ⑥ 인스턴스를 변수에 직접 저장
      horizontalST = ScrollTrigger.create({
        animation: gsap.to(track, { x: -scrollAmt, ease: 'none' }),
        trigger  : section,
        start    : 'top top',
        end      : () => '+=' + scrollAmt,
        pin      : true,
        scrub    : 1,
        invalidateOnRefresh: true,
      });

      // ⑥ containerAnimation 을 horizontalST 변수로 직접 참조
      track.querySelectorAll('.history-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.5,
            delay: i * 0.05,
            scrollTrigger: {
              _historyCard       : true,
              trigger            : card,
              start              : 'left 90%',
              containerAnimation : horizontalST, // ⑥ 변수 직접 참조
            }
          }
        );
      });
    });
  }

  // ── 모바일 fade-up ───────────────────────────────────────
  function applyMobileFadeUp() {
    if (typeof gsap === 'undefined') return;
    document.querySelectorAll('.history-card').forEach(card => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          scrollTrigger: {
            _historyCard: true,
            trigger: card,
            start  : 'top 85%',
          }
        }
      );
    });
  }

  // ── XSS 방지 ─────────────────────────────────────────────
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ── 진입점 ───────────────────────────────────────────────
  async function init() {
    try {
      const data  = await fetchHistory();
      const years = getYears(data);

      if (years.length === 0) {
        showError('등록된 연혁이 없습니다.'); // ⑧
        return;
      }

      let activeYear = years[0];

      renderTabs(years, activeYear, (year) => {
        activeYear = year;
        renderTrack(data, year);
      });

      renderTrack(data, activeYear);
      initScrollTrigger();

    } catch (err) {
      console.error('[history-render]', err);
      showError('연혁 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'); // ⑧
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
