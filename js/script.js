

const iconMenu = document.querySelector('.menu-icon');
const wrapper = document.querySelector(".wrapper-burger-menu");
const menuBox = document.querySelector(".menu-section-mob");
const accHeaders = document.querySelectorAll(".accordeon-header");
const accPanel = document.querySelectorAll('.accordeon-panel');


function menuClick(){
   if (iconMenu){
   
         iconMenu.addEventListener('click', function(e){
         iconMenu.classList.toggle("active");
         wrapper.classList.toggle("active-wrapper");
         menuBox.classList.toggle('active-block');
         document.body.classList.toggle('active-body');
         menuAccClick();
         
      })
   }
}

menuClick();




 function menuAccClick(){
    for (let accHeader of accHeaders) {
      
      if(accHeader.nextElementSibling.classList.contains("show-panel")){
         accHeader.nextElementSibling.classList.remove("show-panel");
         menuBox.style.minHeight = 690 + 'px';
        }
      

       accHeader.addEventListener('click', function(e) {
          let setClasses = !this.classList.contains('active-panel');
           setClass(accHeaders, 'active-panel', 'remove');
           setClass(accPanel, 'show-panel', 'remove');
           
           
             if (setClasses) {
               this.classList.toggle("active-panel");
               this.nextElementSibling.classList.toggle("show-panel");
               
            } 

            if(accHeader.nextElementSibling.classList.contains("show-panel")){

               let insideElHeight = e.target.nextElementSibling.scrollHeight;
               menuBox.style.minHeight = 690 + insideElHeight + 'px';

               // menuBox.classList.add("active-height");
            } else {
               // menuBox.classList.remove("active-height");
               menuBox.style.minHeight = 690 + 'px';
            }

            
       })
      }
 }



    function setClass(elem, className, fnName) {
       for (let i = 0; i < elem.length; i++) {
          elem[i].classList[fnName](className);
       }

    }


 
    




    
;
const swipeBtn = document.querySelector(".div-line-swipe");

swipeBtn.addEventListener('swiped-down', function(e) {
    iconMenu.classList.remove("active");
    wrapper.classList.remove("active-wrapper");
    menuBox.classList.remove('active-block');
    document.body.classList.remove('active-body'); 
    menuAccClick();

  
  });


  swipeBtn.addEventListener('click', function(e) {
    iconMenu.classList.remove("active");
    wrapper.classList.remove("active-wrapper");
    menuBox.classList.remove('active-block');
    document.body.classList.remove('active-body'); 
    menuAccClick();

   
  });;





