/* ==============================================
   form.js — 견적 문의폼 제출 & EmailJS 발송
   ============================================== */

document.addEventListener('DOMContentLoaded', function () {
  var inquiryForm = document.getElementById('inquiryForm');
  if (!inquiryForm) return;

  inquiryForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var form      = e.target;
    var submitBtn = document.getElementById('btnFormSubmit');
    var name      = form.user_name.value.trim();
    var phone     = form.user_phone.value.trim();
    var address   = form.user_address.value.trim();
    var scope     = form.scope.value;
    var agreeCheck = document.getElementById('agreeCheck');

    if (!name) {
      alert('이름을 입력해 주세요.');
      form.user_name.focus();
      return;
    }
    if (!phone) {
      alert('연락처를 입력해 주세요.');
      form.user_phone.focus();
      return;
    }
    if (!/^01[016789][0-9]{7,8}$/.test(phone.replace(/-/g, ''))) {
      alert('올바른 핸드폰 번호를 입력해 주세요.\n예) 010-1234-5678');
      form.user_phone.focus();
      return;
    }
    if (!address) {
      alert('주소를 입력해 주세요.');
      form.user_address.focus();
      return;
    }
    if (address.length < 5 || !/[가-힣]/.test(address)) {
      alert('올바른 주소를 입력해 주세요.\n예) 서울시 강남구 역삼동 123 ○○아파트');
      form.user_address.focus();
      return;
    }
    if (!scope) {
      alert('시공범위를 선택해 주세요.');
      form.scope.focus();
      return;
    }
    if (!agreeCheck || !agreeCheck.checked) {
      alert('개인정보처리방침에 동의해 주세요.');
      return;
    }

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

    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== '6PXA0iKEx_UuA4UER') {
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
