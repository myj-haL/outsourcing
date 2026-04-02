/* ==============================================
   config.js — EmailJS 설정값
   대시보드: https://dashboard.emailjs.com/
   ============================================== */
var EMAILJS_PUBLIC_KEY  = '6PXA0iKEx_UuA4UER';    // ← 교체
var EMAILJS_SERVICE_ID  = 'service_0vjpw4u';    // ← 교체
var EMAILJS_TEMPLATE_ID = 'template_3etneyl';   // ← 교체

(function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
}());
