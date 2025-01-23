document.addEventListener("DOMContentLoaded", function () {
	if (document.querySelector('.burger')) {
		openBurgerMenu();
	}

})


const openBurgerMenu = () => {
	const burger = document.querySelector('.burger');
	const menu = document.querySelector('.swipe-menu__container')

	// const overlay = document.querySelector(".overlay");
	const accordion_bodies = document.querySelectorAll('.accordion__body');

	function toggleOpenMenuBurger() {
		burger.addEventListener('click', function () {
			burger.classList.toggle("burger_open");
			menu.classList.toggle("swipe-menu__container_active");
			document.body.classList.toggle('active-body');
			let isOpen = burger.classList.contains("burger_open")
			if (isOpen) {
				accordion_bodies.forEach(body => body.classList.remove('accordion__body_open'));
			}
		})
	}

	toggleAccordion()
	toggleOpenMenuBurger()

};











