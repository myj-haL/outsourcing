function loadLayoutComponents() {
  const currentPath = window.location.pathname.split('/').filter(Boolean).pop();
  const editUrl = (currentPath === 'about' || currentPath === 'apply')  ? "../" : "./";

  $('#header').load(editUrl + 'theme/header.html', function() {
    // activateMenu();

    // initMobileMenuButton();
  });

  $('#footer').load(editUrl + 'theme/footer.html');
}

$(document).ready(function () {
  loadLayoutComponents();
});