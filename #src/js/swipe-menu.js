document.addEventListener("DOMContentLoaded", function () {
  if(document.querySelector(".swipe-menu__container")){
    swipeMenu();
  }

})

const swipeMenu = () => {
  const burger = document.querySelector('.burger');
	const menu = document.querySelector('.swipe-menu__container')
	menu.addEventListener('swiped-up', function () {
    burger.classList.remove("burger_open");
    menu.classList.remove("swipe-menu__container_active");
    document.body.classList.remove('active-body');
  });
};










