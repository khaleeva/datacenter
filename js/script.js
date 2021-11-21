
const accordion = document.querySelectorAll(".accordion-menu");
const burgerMenu = document.querySelector(".menu-btn");
const wrapper = document.querySelector(".wrapper");
const menuBox = document.querySelector(".menu-box");

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function() {
    
    const panel = this.nextElementSibling;
    
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      
    } 
  });
}


burgerMenu.addEventListener('click', function(){
   menuBox.classList.toggle('active');
   wrapper.classList.toggle('active-wrapper');
   console.log('hello')
})

