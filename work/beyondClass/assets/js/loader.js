function loadLayoutComponents() {
  const currentPath = window.location.pathname.split('/').filter(Boolean).pop();
  const editUrl = (currentPath === 'contact' || currentPath === 'recruit' || currentPath === 'about' || currentPath === 'serviceIntroduce')  ? "../" : "./";

  $('#header').load(editUrl + 'theme/header.html', function() {
    // activateMenu();

    // initMobileMenuButton();
  });

  $('#footer').load(editUrl + 'theme/footer.html');
}

$(document).ready(function () {
  loadLayoutComponents();
});