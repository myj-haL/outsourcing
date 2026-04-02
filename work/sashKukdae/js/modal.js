/* ==============================================
   modal.js — 모달 열기 / 닫기 & 이벤트 바인딩
   ============================================== */

function openModal(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('is-open');
  if (!document.querySelector('.modal-overlay.is-open')) {
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', function () {

  /* 문의폼 열기 트리거 */
  ['.cta-fixed', '#btnHeaderCta', '.pc-page__btn-primary'].forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openModal('modalForm');
      });
    });
  });

  document.querySelectorAll('.contact__btn').forEach(function (btn) {
    var txt = btn.querySelector('.contact__btn-text');
    if (txt && txt.textContent.indexOf('견적') !== -1) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal('modalForm');
      });
    }
  });

  /* 문의폼 닫기 */
  var btnFormClose = document.getElementById('btnFormClose');
  if (btnFormClose) {
    btnFormClose.addEventListener('click', function () { closeModal('modalForm'); });
  }

  var modalFormEl = document.getElementById('modalForm');
  if (modalFormEl) {
    modalFormEl.addEventListener('click', function (e) {
      if (e.target === modalFormEl) closeModal('modalForm');
    });
  }

  /* 개인정보 처리방침 팝업 */
  var btnPrivacy = document.getElementById('btnPrivacy');
  if (btnPrivacy) {
    btnPrivacy.addEventListener('click', function () { openModal('modalPrivacy'); });
  }

  var btnPrivacyClose = document.getElementById('btnPrivacyClose');
  if (btnPrivacyClose) {
    btnPrivacyClose.addEventListener('click', function () { closeModal('modalPrivacy'); });
  }

  var modalPrivacyEl = document.getElementById('modalPrivacy');
  if (modalPrivacyEl) {
    modalPrivacyEl.addEventListener('click', function (e) {
      if (e.target === modalPrivacyEl) closeModal('modalPrivacy');
    });
  }

  /* 완료 팝업 */
  function closeComplete() {
    closeModal('modalComplete');
    closeModal('modalForm');
    var form = document.getElementById('inquiryForm');
    if (form) form.reset();
    var cb = document.getElementById('agreeCheck');
    if (cb) cb.checked = false;
  }

  var btnCompleteClose = document.getElementById('btnCompleteClose');
  if (btnCompleteClose) btnCompleteClose.addEventListener('click', closeComplete);

  var btnCompleteHome = document.getElementById('btnCompleteHome');
  if (btnCompleteHome) {
    btnCompleteHome.addEventListener('click', function () {
      closeComplete();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var modalCompleteEl = document.getElementById('modalComplete');
  if (modalCompleteEl) {
    modalCompleteEl.addEventListener('click', function (e) {
      if (e.target === modalCompleteEl) closeComplete();
    });
  }

});
