/* ==============================================
   modal.js — 샷시국가대표 모달 & EmailJS 연동
   ============================================== */

/* ── ① EmailJS 설정 ────────────────────────────────────────────────
   아래 3개 값을 실제 EmailJS 정보로 교체하세요.
   대시보드: https://dashboard.emailjs.com/

   EMAILJS_PUBLIC_KEY  → Account > General > Public Key
   EMAILJS_SERVICE_ID  → Email Services > [서비스명] > Service ID
   EMAILJS_TEMPLATE_ID → Email Templates > [템플릿명] > Template ID

   템플릿 변수 (Template 내 사용):
     {{user_name}}    — 이름
     {{user_phone}}   — 연락처
     {{user_address}} — 주소
     {{scope}}        — 시공범위
   ─────────────────────────────────────────────────────────────── */
var EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';    // ← 교체
var EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';    // ← 교체
var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← 교체
/* ──────────────────────────────────────────────────────────────── */

(function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
}());

/* ── ② 모달 열기 / 닫기 ─────────────────────────────────────────── */
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

/* ── ③ DOM 준비 후 이벤트 바인딩 ────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

  /* ── 문의폼 열기 트리거 ── */

  // 모바일 하단 고정 버튼 (.cta-fixed)
  // 히어로 인라인 CTA (.hero__cta-btn)
  // 헤더 견적문의 (#btnHeaderCta)
  // PC 메인 CTA (.pc-page__btn-primary)
  ['.cta-fixed', '#btnHeaderCta', '.pc-page__btn-primary'].forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openModal('modalForm');
      });
    });
  });

  // contact 섹션 "견적문의 바로가기" 버튼
  document.querySelectorAll('.contact__btn').forEach(function (btn) {
    var txt = btn.querySelector('.contact__btn-text');
    if (txt && txt.textContent.indexOf('견적') !== -1) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal('modalForm');
      });
    }
  });

  /* ── 문의폼 닫기 ── */
  var btnFormClose = document.getElementById('btnFormClose');
  if (btnFormClose) {
    btnFormClose.addEventListener('click', function () {
      closeModal('modalForm');
    });
  }

  var modalFormEl = document.getElementById('modalForm');
  if (modalFormEl) {
    modalFormEl.addEventListener('click', function (e) {
      // 딤 영역(오버레이 자체) 클릭 시 닫기
      if (e.target === modalFormEl) closeModal('modalForm');
    });
  }

  /* ── 개인정보 처리방침 팝업 ── */
  var btnPrivacy = document.getElementById('btnPrivacy');
  if (btnPrivacy) {
    btnPrivacy.addEventListener('click', function () {
      openModal('modalPrivacy');
    });
  }

  var btnPrivacyClose = document.getElementById('btnPrivacyClose');
  if (btnPrivacyClose) {
    btnPrivacyClose.addEventListener('click', function () {
      closeModal('modalPrivacy');
    });
  }

  var modalPrivacyEl = document.getElementById('modalPrivacy');
  if (modalPrivacyEl) {
    modalPrivacyEl.addEventListener('click', function (e) {
      if (e.target === modalPrivacyEl) closeModal('modalPrivacy');
    });
  }

  /* ── 완료 팝업 닫기 ── */
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

  /* ── 후기 슬라이더 (Swiper.js) ── */
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

  /* ── 폼 제출 & EmailJS 발송 ── */
  var inquiryForm = document.getElementById('inquiryForm');
  if (!inquiryForm) return;

  inquiryForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var agreeCheck = document.getElementById('agreeCheck');
    if (!agreeCheck || !agreeCheck.checked) {
      alert('개인정보처리방침에 동의해 주세요.');
      return;
    }

    var form      = e.target;
    var submitBtn = document.getElementById('btnFormSubmit');
    var name      = form.user_name.value.trim();
    var phone     = form.user_phone.value.trim();
    var address   = form.user_address.value.trim();
    var scope     = form.scope.value;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '전송 중...';
    }

    var params = {
      user_name:    name,
      user_phone:   phone,
      user_address: address,
      scope:        scope,
    };

    function showComplete() {
      var sName    = document.getElementById('summaryName');
      var sPhone   = document.getElementById('summaryPhone');
      var sAddress = document.getElementById('summaryAddress');
      var sScope   = document.getElementById('summaryScope');
      if (sName)    sName.textContent    = name;
      if (sPhone)   sPhone.textContent   = phone;
      if (sAddress) sAddress.textContent = address;
      if (sScope)   sScope.textContent   = scope;
      closeModal('modalForm');
      openModal('modalComplete');
    }

    function resetBtn() {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '상담/견적 신청하기';
      }
    }

    // EmailJS 발송
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
        .then(function () {
          showComplete();
        })
        .catch(function (err) {
          console.error('EmailJS error:', err);
          alert('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        })
        .finally(function () {
          resetBtn();
        });
    } else {
      // EmailJS 미설정 상태(개발/테스트): 바로 완료 팝업 표시
      showComplete();
      resetBtn();
    }
  });

}); // end DOMContentLoaded
