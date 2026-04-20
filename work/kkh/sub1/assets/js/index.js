// ===========================
// History Section
// ===========================

const HISTORY_DATA = [
  // Tab 0: 2026~
  [
    {
      date: '2026.02',
      items: [
        '국가공헌협회-새수원지역아동센터 아동 문화 활동 지원을 위한 MOU 체결',
        '국가공헌협회-수원시장애인종합복지관 장애인 결식 예방을 위한 MOU 체결',
        '국가공헌협회-화성시서부노인복지관 취약계층 어르신 맞춤형 지원을 위한 MOU 체결',
        '국가공헌협회-하남시장애인복지관 재가 장애인 생활 안정을 위한 MOU 체결',
      ],
    },
    {
      date: '2026.01',
      items: [
        '국가공헌협회-대전 살롬하우스 아동 자립 역량 강화를 위한 MOU 체결',
        '국가공헌협회-전주서원노인복지관 독거 어르신 식생활 지원을 위한 MOU 체결',
      ],
    },
  ],
  // Tab 1: 2023 ~ 2025
  [],
  // Tab 2: 2021 ~ 2022
  [],
];

function buildHistoryContent(tabIndex) {
  const panel = document.querySelector('.history-content[data-content="' + tabIndex + '"]');
  if (!panel) return;

  const data = HISTORY_DATA[tabIndex];

  if (!data || data.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'history-empty';
    empty.textContent = '등록된 연혁이 없습니다.';
    panel.appendChild(empty);
    return;
  }

  data.forEach(function (block) {
    const blockEl = document.createElement('div');
    blockEl.className = 'history-block';

    const dateEl = document.createElement('div');
    dateEl.className = 'history-block__date';
    dateEl.textContent = block.date;

    const listEl = document.createElement('span');
    listEl.className = 'history-block__items';

    block.items.forEach(function (text) {
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

function initHistoryObserver(panel) {
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

function switchTab(targetIndex) {
  const tabs = document.querySelectorAll('.history-tab');
  const panels = document.querySelectorAll('.history-content');

  tabs.forEach(function (tab) {
    tab.classList.toggle('is-active', parseInt(tab.dataset.tab) === targetIndex);
  });

  panels.forEach(function (panel) {
    const isTarget = parseInt(panel.dataset.content) === targetIndex;
    panel.classList.remove('is-active', 'is-visible');
    if (isTarget) {
      panel.classList.add('is-active');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          panel.classList.add('is-visible');
          initHistoryObserver(panel);
        });
      });
    }
  });
}

function initHistory() {
  // Build all panels up front
  HISTORY_DATA.forEach(function (_, i) {
    buildHistoryContent(i);
  });

  // Tab click handlers
  const tabs = document.querySelectorAll('.history-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const index = parseInt(tab.dataset.tab);
      switchTab(index);
    });
  });

  // Trigger observer for the initially active panel
  const activePanel = document.querySelector('.history-content.is-active');
  if (activePanel) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        activePanel.classList.add('is-visible');
        initHistoryObserver(activePanel);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', initHistory);
