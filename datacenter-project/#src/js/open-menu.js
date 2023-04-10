const burger = document.querySelector('.burger');
const overlay = document.querySelector(".overlay");
const swipe_block = document.querySelector(".swipe-menu__container");
const accordion_headers = document.querySelectorAll(".accordion-header");
const accordion_panels = document.querySelectorAll('.accordion-panel');

document.addEventListener("DOMContentLoaded", function() {
   menuClick();
   menuAccClick();
})




function menuClick() {
   if (burger) {
      burger.addEventListener('click', function () {
         burger.classList.toggle("burger_open");
         overlay.classList.toggle("overlay_active");
         swipe_block.classList.toggle('swipe-menu__container_open');
         document.body.classList.toggle('active-body');
      })
   }
}


function menuAccClick() {
   for (let header of accordion_headers) {
      if (header.nextElementSibling.classList.contains("accordion-panel_open")) {
         header.nextElementSibling.classList.remove("accordion-panel_open");
         swipe_block.style.minHeight = 690 + 'px';
      }
      header.addEventListener('click', function (e) {
         let setClasses = !this.classList.contains('accordion-header_close');
         setClass(accordion_headers, 'accordion-header_close', 'remove');
         setClass(accordion_panels, 'accordion-panel_open', 'remove');

         if (setClasses) {
            this.classList.toggle("accordion-header_close");
            this.nextElementSibling.classList.toggle("accordion-panel_open");
         }

         if (header.nextElementSibling.classList.contains("accordion-panel_open")) {
            let insideElHeight = e.target.nextElementSibling.scrollHeight;
            swipe_block.style.minHeight = 690 + insideElHeight + 'px';

         } else {
            swipe_block.style.minHeight = 690 + 'px';
         }


      })
   }
}










