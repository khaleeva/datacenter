

const iconMenu = document.querySelector('.menu-icon');
const wrapper = document.querySelector(".wrapper-swipe-menu");
const menuBox = document.querySelector(".swipe-menu-container");
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
const swipeBtn = document.querySelector(".swipe-line");

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
const range = document.querySelector("#power-range");
const unitRange = document.querySelector("#unit-range");
const output = document.querySelector(".value");
const outputUnit = document.querySelector(".unit")
const calcBtns = document.querySelectorAll(".calc-btn");
const closeIcon = document.querySelector(".close-icon");






// range.oninput = function() {
//   output.innerHTML = `${this.value} Вт`;

// }

// unitRange.oninput = function() {
//     outputUnit.innerHTML = `${this.value} U`;
  
//   }

// range.addEventListener('input', function(){
//   let x = range.value/11;
  
     
//   document.querySelector('.fill').style.width = x + '%';
  

  
// })


// unitRange.addEventListener('input', function(){
//     let x = unitRange.value*12.5;
    
//        console.log(x)
//     document.querySelector('.fill-unit').style.width = x + '%';
    
  
    
//   })





// for(let calcBtn of calcBtns){
//     calcBtn.addEventListener('click', function(){
//         document.body.classList.add('active-body');
//         document.querySelector('.wrapper-calc').classList.add('active');
//     })
// }

// closeIcon.addEventListener('click', function(){
//     document.body.classList.remove('active-body');
//     document.querySelector('.wrapper-calc').classList.remove('active');
//     range.value = 0;
//     document.querySelector('.fill').style.width = 0 + "%";
//     range.oninput();
// });
const reviewBtns = document.querySelectorAll('.read-more-button');




for (let reviewBtn of reviewBtns){


    
    

reviewBtn.addEventListener("click", function(e) {

    // this.parentNode.classList.remove('active-section');

    
    e.target.parentNode.classList.toggle('active-section');

});
}


    

    

       


      
    



;



