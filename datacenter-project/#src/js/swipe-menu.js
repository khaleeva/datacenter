document.addEventListener("DOMContentLoaded", function () {
  swipeMenu();
})

const swipeMenu = () => {
  const swipeBtn = document.querySelector(".swipe-line");
  const burger = document.querySelector('.burger');
  const overlay = document.querySelector(".overlay");


  swipeBtn.addEventListener('swiped-down', function () {
    burger.classList.remove("burger_open");
    overlay.classList.remove("overlay_active");
    document.body.classList.remove('active-body');
    setHeightForOpenedMenu()

  });


  swipeBtn.addEventListener('click', function () {
    burger.classList.remove("burger_open");
    overlay.classList.remove("overlay_active");
    document.body.classList.remove('active-body');
    setHeightForOpenedMenu()
  });
}










