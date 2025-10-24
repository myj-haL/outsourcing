$(document).ready(function () {
  const hamburger = $('.hamburger-wrapper');
  const overlay = $('.mobile-overlay');
  const mobileMenu = $('.mobile-navigation');

  hamburger.on('click', function () {
    overlay.toggleClass('active');
    mobileMenu.toggleClass('active');
  });

  overlay.on('click', function () {
    overlay.toggleClass('active');
    mobileMenu.toggleClass('active');
  });
});
