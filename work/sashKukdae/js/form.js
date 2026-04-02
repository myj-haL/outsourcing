/* ==============================================
   form.js — 견적 문의폼 제출 & EmailJS 발송
   ============================================== */

document.addEventListener('DOMContentLoaded', function () {
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

    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
        .then(function () { showComplete(); })
        .catch(function (err) {
          console.error('EmailJS error:', err);
          alert('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        })
        .finally(function () { resetBtn(); });
    } else {
      // EmailJS 미설정(개발/테스트): 바로 완료 팝업 표시
      showComplete();
      resetBtn();
    }
  });
});
