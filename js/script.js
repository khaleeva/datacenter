

const iconMenu = document.querySelector('.menu-icon');
const wrapper = document.querySelector(".wrapper-burger-menu");
const menuBox = document.querySelector(".menu-section-mob");
const accHeaders = document.querySelectorAll(".accordion-header");
const accPanel = document.querySelectorAll('.accordion-panel');


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

            } else {
               
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





const accordionBtns = document.querySelectorAll('.accordion-header-services');

const accSection = document.querySelector('.colocation-services-accordion');

let accordionFirst = document.getElementById('first-content'); 

let  accordionPanel = document.querySelectorAll(" .accordion-panel-services") ;





 for (let accordionBtn of accordionBtns) {
   accordionBtn.addEventListener('click', function(){
     
     let accordionContent = this.nextElementSibling;
     if (accordionContent.style.maxHeight) {
    accordionContent.style.maxHeight = null;
    accSection.style.minHeight = 96 + 'px';
 
    
     } else {
       accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
       accSection.style.minHeight = accordionContent.scrollHeight + 'px';
       
      
     }
   });

   window.onload = function() {
     
      accordionFirst.style.maxHeight = accordionFirst.scrollHeight + 'px';
    }
   }
       

;




