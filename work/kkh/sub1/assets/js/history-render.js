/**
 * history-render.js
 * 국가공헌협회 — '걸어온 길' 연혁 섹션 동적 렌더링
 *
 * HTML 구조:
 *   .history-tabs > button.history-tab[data-tab="0|1|2"]
 *   .history-content[data-content="0|1|2"]
 *
 * 탭 범위:
 *   0 → 2026~
 *   1 → 2023~2025
 *   2 → 2021~2022
 */

(function () {
  'use strict';

  // ── 설정 ────────────────────────────────────────────────
  const CONFIG = {
    jsonPath    : './history.json',
    sectionEl   : '.history-section',
    tabsEl      : '.history-tabs',
    errorEl     : 'history-error',
    activeClass : 'is-active',
  };

  // 탭 인덱스별 연도 범위
  const TAB_RANGES = [
    { min: 2026, max: Infinity },  // data-tab="0" : 2026~
    { min: 2023, max: 2025 },      // data-tab="1" : 2023~2025
    { min: 2021, max: 2022 },      // data-tab="2" : 2021~2022
  ];

  // 이미 observer 초기화된 패널 추적
  const initializedPanels = new Set();

  // ── ⑧ 에러 UI ───────────────────────────────────────────
  function showError(msg) {
    const section = document.querySelector(CONFIG.sectionEl);
    if (!section) return;
    let el = section.querySelector('.' + CONFIG.errorEl);
    if (!el) {
      el = document.createElement('p');
      el.className = CONFIG.errorEl;
      el.style.cssText = 'text-align:center;padding:60px 20px;color:#888;font-size:14px;';
      section.appendChild(el);
    }
    el.textContent = msg;
  }

  // ── 데이터 fetch (버전 캐시) ──────────────────────────────
  async function fetchHistory() {
    const CACHE_KEY = 'history_cache';
    const VER_KEY   = 'history_version';

    const res = await fetch(CONFIG.jsonPath);
    if (!res.ok) throw new Error('history.json 로드 실패: ' + res.status);

    const json    = await res.json();
    const version = String(json.version ?? 0);
    const data    = json.data ?? (Array.isArray(json) ? json : []);

    const cachedVer  = localStorage.getItem(VER_KEY);
    const cachedData = localStorage.getItem(CACHE_KEY);

    if (cachedVer === version && cachedData) {
      try { return JSON.parse(cachedData); } catch (_) {}
    }

    try {
      localStorage.setItem(VER_KEY,   version);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (_) {}

    return data;
  }

  // ── 패널 렌더링 ──────────────────────────────────────────
  function renderPanel(data, tabIndex) {
    const panel = document.querySelector('.history-content[data-content="' + tabIndex + '"]');
    if (!panel) return;

    // 이미 렌더링된 패널이면 스킵
    if (panel.dataset.rendered) return;
    panel.dataset.rendered = 'true';

    const range    = TAB_RANGES[tabIndex];
    const filtered = data
      .filter(d => d.year >= range.min && d.year <= range.max)
      .sort((a, b) => b.year - a.year || b.month - a.month);

    if (filtered.length === 0) {
      const p = document.createElement('p');
      p.className = 'history-empty';
      p.textContent = '등록된 연혁이 없습니다.';
      panel.appendChild(p);
      return;
    }

    filtered.forEach(function (row) {
      const blockEl = document.createElement('div');
      blockEl.className = 'history-block';

      const monthStr = String(row.month).padStart(2, '0');
      const dateEl   = document.createElement('div');
      dateEl.className = 'history-block__date';
      dateEl.textContent = row.year + '.' + monthStr;

      const listEl = document.createElement('span');
      listEl.className = 'history-block__items';

      row.items.forEach(function (text) {
        const itemEl = document.createElement('p');
        itemEl.className = 'history-block__item mTxt';
        itemEl.textContent = text;
        listEl.appendChild(itemEl);
      });

      blockEl.appendChild(dateEl);
      blockEl.appendChild(listEl);
      panel.appendChild(blockEl);
    });
  }

  // ── IntersectionObserver (스크롤 페이드인) ───────────────
  function initObserver(panel) {
    if (initializedPanels.has(panel)) return;
    initializedPanels.add(panel);

    const blocks = panel.querySelectorAll('.history-block');
    if (!blocks.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const index = Array.from(blocks).indexOf(entry.target);
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    blocks.forEach(function (block) {
      observer.observe(block);
    });
  }

  // ── 탭 이벤트 연결 ───────────────────────────────────────
  function bindTabs() {
    const tabsEl = document.querySelector(CONFIG.tabsEl);
    if (!tabsEl) return;

    tabsEl.querySelectorAll('.history-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const targetIndex = parseInt(btn.dataset.tab);

        // 탭 active 전환
        tabsEl.querySelectorAll('.history-tab').forEach(function (b) {
          b.classList.toggle(CONFIG.activeClass, b === btn);
        });

        // 패널 active 전환
        document.querySelectorAll('.history-content').forEach(function (panel) {
          const isTarget = parseInt(panel.dataset.content) === targetIndex;
          panel.classList.toggle(CONFIG.activeClass, isTarget);

          if (isTarget) {
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                initObserver(panel);
              });
            });
          }
        });
      });
    });
  }

  // ── 진입점 ───────────────────────────────────────────────
  async function init() {
    try {
      const data = await fetchHistory();

      // 모든 탭 패널에 미리 렌더링
      TAB_RANGES.forEach(function (_, i) {
        renderPanel(data, i);
      });

      // 탭 이벤트 연결
      bindTabs();

      // 초기 active 패널 observer 실행
      const activePanel = document.querySelector('.history-content.' + CONFIG.activeClass);
      if (activePanel) {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            initObserver(activePanel);
          });
        });
      }

    } catch (err) {
      console.error('[history-render]', err);
      showError('연혁 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
