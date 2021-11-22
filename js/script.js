
const accordeon = document.querySelectorAll(".accordeon-section");

const burgerMenu = document.querySelector(".menu-btn");
const wrapper = document.querySelector(".wrapper-burger-menu");
const menuBox = document.querySelector(".menu-burger-section");


const accordeonClick = function(e){
    
   accordeon.forEach(function(section){
      section.querySelector(".accordeon-panel").style.maxHeight = "0px";
   })
      let insideElHeight = e.target.closest(".accordeon-section").querySelector(".accordeon-panel").scrollHeight;
    e.target.closest(".accordeon-section").querySelector(".accordeon-panel").style.maxHeight = insideElHeight + "px" ;
      menuBox.style.minHeight = 790 + insideElHeight + 'px';
}

accordeon.forEach(function(section){
   section.addEventListener("click", accordeonClick) 
})












burgerMenu.addEventListener('click', function(){
   menuBox.classList.toggle('active-block');
   wrapper.classList.toggle('active-wrapper');
   document.body.style.overflow = 'hidden';
})

