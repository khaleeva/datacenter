const swipeBtn = document.querySelector(".swipe-line");

swipeBtn.addEventListener('swiped-down', function () {
  burger.classList.remove("burger_open");
  overlay.classList.remove("overlay_active");
  swipe_block.classList.remove('swipe-menu__container_open');
  document.body.classList.remove('active-body');


});


swipeBtn.addEventListener('click', function () {
  burger.classList.remove("burger_open");
  overlay.classList.remove("overlay_active");
  swipe_block.classList.remove('swipe-menu__container_open');
  document.body.classList.remove('active-body');


});








