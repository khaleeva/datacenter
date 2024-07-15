document.addEventListener("DOMContentLoaded", function () {
  if(document.querySelector(".swipe-menu__container")){
    swipeMenu();
  }

	if(document.querySelector("#modal")){
		swipeModal();
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


const swipeModal = () => {
	const modal = document.querySelector("#modal")
	const modal_overlay = document.querySelector('.modal-overlay')
	modal.addEventListener('swiped', function () {
		document.body.classList.remove('active-body');
		modal_overlay.classList.remove("modal-overlay_open");
	});
};







