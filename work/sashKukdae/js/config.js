/* ==============================================
   config.js — EmailJS 설정값
   대시보드: https://dashboard.emailjs.com/
   ============================================== */
var EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';    // ← 교체
var EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';    // ← 교체
var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // ← 교체

(function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
}());
