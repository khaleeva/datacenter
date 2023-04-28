document.addEventListener("DOMContentLoaded", function () {
   openMenuFromBottomDirection();
})




const openMenuFromBottomDirection = () => {
   const burger = document.querySelector('.burger');
   const overlay = document.querySelector(".overlay");
   const accordion_bodies = document.querySelectorAll('.accordion__body');

   function toggleOpenMenuBurger() {
         burger.addEventListener('click', function () {
            burger.classList.toggle("burger_open");
            overlay.classList.toggle("overlay_active");
            document.body.classList.toggle('active-body');
            let isOpen = burger.classList.contains("burger_open")
            if(isOpen){
               accordion_bodies.forEach(body => body.classList.remove('accordion__body_open'));
            }
            setHeightForOpenedMenu(isOpen)
         })
   }

   toggleAccordion()
   toggleOpenMenuBurger()

}











