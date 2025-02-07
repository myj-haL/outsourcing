function activateMenu() {
    const currentPath = window.location.pathname;

    $('.menu .pages li a').each(function() {
      if ($(this).attr('href') === currentPath) {
        $(this).addClass('active');
      }
    });
}

function initMobileMenuButton() {
  $('.btn-mobile-menu').on('click', function() {
    $('.menu').css('display', 'flex');

    $(this).css('display', 'none');
  });

  $('.btn-close-mobile-menu').on('click', function() {
    $('.btn-mobile-menu').css('display', 'block');

    $('.menu').css('display', 'none');
  });

  $(window).on('resize', function() {
    const windowWidth = $(window).width();

    if (windowWidth > 1024) {
      $('.menu').css('display', 'flex');
      $('.btn-mobile-menu').css('display', 'none');
      $('.btn-close-mobile-menu').css('display', 'none');
    }

    if (windowWidth <= 1024) {
      $('.menu').css('display', 'none');
      $('.btn-close-mobile-menu').css('display', 'block');
      $('.btn-mobile-menu').css('display', 'block');
    }
  });
}

function loadLayoutComponents() {
  const currentPath = window.location.pathname.split('/').filter(Boolean).pop();
  const editUrl = (currentPath === 'contact' || currentPath === 'recruit' || currentPath === 'about' || currentPath === 'serviceIntroduce')  ? "../../../" : "../../";

  $('#header').load(editUrl + 'html/common/header.html', function() {
    activateMenu();

    initMobileMenuButton();
  });

  $('#footer').load(editUrl + 'html/common/footer.html');
}

$(document).ready(function () {
  loadLayoutComponents();
});