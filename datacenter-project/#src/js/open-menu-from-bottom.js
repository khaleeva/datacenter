document.addEventListener("DOMContentLoaded", function () {
   openMenuFromBottom();
})

const burger = document.querySelector('.burger');
const overlay = document.querySelector(".overlay");


const openMenuFromBottom = () => {
   function toggleOpenMenuBurger() {
         burger.addEventListener('click', function () {
            burger.classList.toggle("burger_open");
            overlay.classList.toggle("overlay_active");
            document.body.classList.toggle('active-body');
            let isOpen = burger.classList.contains("burger_open")
            setHeightForOpenedMenu(isOpen)
         })
   }

   toggleOpenMenuBurger()
   toggleAccordion()
}











