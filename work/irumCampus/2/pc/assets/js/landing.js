
function companyQuestionSubmit(formObj){

    console.log(formObj);

    let companyName = $('input[name="companyName"]',formObj).val();
    let employees = $('input[name="employees"]',formObj).val();
    let userName = $('input[name="userName"]',formObj).val();
    let phone = $('input[name="phone02"]',formObj).val() + '-' + $('input[name="phone03"]',formObj).val();
    let content = $('textarea[name="content"]',formObj).val();

    if ( companyName == '' ) {
        alert('상호명을 입력해 주세요');
        return false;
    }
    if ( employees == '' ) {
        alert('직원수를 입력해 주세요');
        return false;
    }
    if ( userName == '' ) {
        alert('담당자를 입력해 주세요');
        return false;
    }

    var regPhone = /^([0-9]{3,4})-([0-9]{4})$/;
    if (regPhone.test(phone) === false) {
        alert('연락처를 정확히 입력해 주세요');
        return false;
    }
    
    if ( content == '' ) {
        alert('문의사항을 입력해 주세요');
        return false;
    }
    
    var agreeCheck = $('input:checkbox[name="agreeCheck"]',formObj).prop("checked");
    if(agreeCheck != true){ //개인정보 수집동의 체크
        alert("개인정보 수집 및 이용에 동의해주세요.");
        $('input:checkbox[name="agreeCheck"]',formObj).focus();
        return false;
    }
        
    //등록
    useApi = "../api/apiConsultCompany.php";
    var sendSerial = $(formObj).serialize();
    console.log(sendSerial);
    if(confirm("등록하시겠습니까?")){
        $.ajax({
            url: useApi,
            type:'POST',
            data:sendSerial,
            dataType:'text',
            success:function(data){
                //NAVER SCRIPT
                if (typeof(wcs) != "undefined") {
                  var _nasa={};
                  _nasa["cnv"] = wcs.cnv("4","100");
                  wcs_do(_nasa);
                }
                alert('상담 문의가 등록되었습니다. 고객센터에 알림(문자,이메일)이 발송되었습니다.');
                formObj.reset();
            },
            fail:function(){
                alert('등록에 실패하였습니다.');
            }
        })
    }
}



function sendEmail(prefix) {
    if ($('.btn-inquiry button').hasClass('loading')) { return; }

    var inquiry1 = $('#' + (prefix ? prefix + '-' : '') + 'inquiry-1').val().trim();
    var inquiry2 = $('#' + (prefix ? prefix + '-' : '') + 'inquiry-2').val().trim();
    var inquiry3 = $('#' + (prefix ? prefix + '-' : '') + 'inquiry-3').val().trim();
    var inquiry4_1 = $('#' + (prefix ? prefix + '-' : '') + 'inquiry-4-1').val().trim();
    var inquiry4_2 = $('#' + (prefix ? prefix + '-' : '') + 'inquiry-4-2').val().trim();
    var inquiry4_3 = $('#' + (prefix ? prefix + '-' : '') + 'inquiry-4-3').val().trim();
    var inquiry5 = $('#' + (prefix ? prefix + '-' : '') + 'inquiry-5').val().trim();
    var agree = $('#' + (prefix ? prefix + '-' : '') + 'agree').is(':checked');

    if (!inquiry1) {
      alert('상호명을 입력해 주세요');
      $('#' + (prefix ? prefix + '-' : '') + 'inquiry-1').val('').focus();
      return;
    }

    if (!inquiry2) {
      alert('직원수를 입력해 주세요');
      $('#' + (prefix ? prefix + '-' : '') + 'inquiry-2').val('').focus();
      return;
    }

    if (!inquiry3) {
      alert('담당자를 입력해 주세요');
      $('#' + (prefix ? prefix + '-' : '') + 'inquiry-3').val('').focus();
      return;
    }

    if (!inquiry4_1) {
      alert('연락처를 입력해 주세요');
      $('#' + (prefix ? prefix + '-' : '') + 'inquiry-4-1').val('').focus();
      return;
    }

    if (!inquiry4_2) {
      alert('연락처를 입력해 주세요');
      $('#' + (prefix ? prefix + '-' : '') + 'inquiry-4-2').val('').focus();
      return;
    }

    if (!inquiry4_3) {
      alert('연락처를 입력해 주세요');
      $('#' + (prefix ? prefix + '-' : '') + 'inquiry-4-3').val('').focus();
      return;
    }

    var inquiry4 = inquiry4_1 + '-' + inquiry4_2 + '-' + inquiry4_3;

    if (!/^\d+$/.test(inquiry4.replace(/-/gi, ''))) {
      alert('잘못된 전화번호입니다.\n숫자만 입력하세요. 예) 010 XXXX XXXX');
      return;
    }

    if (!inquiry5) {
      alert('문의내용을 입력해 주세요');
      $('#' + (prefix ? prefix + '-' : '') + 'inquiry-5').val('').focus();
      return;
    }

    if (!agree) {
      alert('개인정보취급방침에 동의해 주세요');
      return;
    }

    $('.' + (prefix ? prefix + '-' : '') + 'btn-inquiry button').addClass('loading');

    emailjs.send("service_495ffvw","template_3fz3wgv",{
      inquiry1: inquiry1,
      inquiry2: inquiry2,
      inquiry3: inquiry3,
      inquiry4: inquiry4,
      inquiry5: inquiry5
    }).then(function () {
      $('.' + (prefix ? prefix + '-' : '') + 'btn-inquiry button').removeClass('loading');
      alert('감사합니다.');
    }, function (err) {
      $('.' + (prefix ? prefix + '-' : '') + 'btn-inquiry button').removeClass('loading');
      alert(JSON.stringify(err));
    });
  }

  function showDialog (dialog) {
    $('.app-dialog.' + dialog).addClass('show');
  }

  function hideDialog (dialog) {
    $('.app-dialog.' + dialog).removeClass('show');
  }

  $(document).ready(function () {
    emailjs.init("user_fKtVhumpsvdEESRy1C6sv");
  });