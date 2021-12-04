

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

// const powerRange = document.querySelector('#power-range')
// const unitRange = document.querySelector("#unit-range");
const ranges = document.querySelectorAll('.range')
// const output = document.querySelectorAll(".value");
// const outputUnit = document.querySelector(".unit")
const calcBtns = document.querySelectorAll(".calc-btn");
const closeIcon = document.querySelector(".close-icon");
// const fill = document.querySelectorAll('.fill');
let measure;
let output;

for(let range of ranges){
  range.oninput = function(){
    output = this.parentElement.parentElement.firstElementChild.lastElementChild;
    measure = output.getAttribute('data-value');
    console.log(measure)
    output.innerHTML = `${this.value} ${measure}` ;
     
  }

  range.addEventListener('input', function(){
    let x = 0;
    if (measure === 'Вт'){
      x = this.value/15;
      this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
      
    } else {
      x = (this.value*14.286)-14.286;
      this.previousSibling.previousSibling.firstElementChild.style.width = x + '%'
    }
    
  })
}


// powerRange.oninput = function() {
//   output.innerHTML = `${this.value} Вт`;

// }

// unitRange.oninput = function() {
//     outputUnit.innerHTML = `${this.value} U`;
  
//   }

// powerRange.addEventListener('input', function(){
//   let x = powerRange.value/15;
  
//   console.log(x)
     
//   document.querySelector('.fill').style.width = x + '%';
  

  
// })


// unitRange.addEventListener('input', function(){
//     let x = (unitRange.value*14.286)-14.286;
    
//        console.log(x)
//     document.querySelector('.fill-unit').style.width = x + '%';
    
//   })





for(let calcBtn of calcBtns){
    calcBtn.addEventListener('click', function(){
        document.body.classList.add('active-body');
        document.querySelector('.wrapper-calc').classList.add('active');
    })
}

closeIcon.addEventListener('click', function(){
    document.body.classList.remove('active-body');
    document.querySelector('.wrapper-calc').classList.remove('active');
    for(range of ranges){
      range.value = 0;
      range.previousSibling.previousSibling.firstElementChild.style.width = 0 + '%';
      
      if (range.parentElement.parentElement.firstElementChild.lastElementChild.getAttribute('data-value') === 'Вт'){
        range.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML = `0 Вт`;
        
      } else if (range.parentElement.parentElement.firstElementChild.lastElementChild.getAttribute('data-value') === 'U'){
        range.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML = `1 U`;
      } else if (range.parentElement.parentElement.firstElementChild.lastElementChild.getAttribute('data-value') === 'IP'){
        range.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML = `1 IP`;
      } else {
        range.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML = `1 Gb/s`;
      }
      
    }
   
   
});
const reviewLinks = document.querySelectorAll('.read-more-button');
const parents = document.querySelectorAll('.section-review-inner');
const limiters = document.querySelectorAll('.limiter');



for (let link of reviewLinks) {
      
    if(link.parentNode.classList.contains("active-section")){
        link.parentNode.classList.remove("active-section");
        
        
      }
    

     link.addEventListener('click', function() {
        let setClasses = !this.classList.contains('active');
         setClass(reviewLinks, 'active', 'remove');
         setClass(parents, 'active-section', 'remove');
        setClass(limiters,'active-limiter', 'remove');

         
         
           if (setClasses) {
             this.classList.toggle("active");
             this.parentNode.classList.toggle("active-section");
             this.previousSibling.previousSibling.classList.toggle("active-limiter");
            
          } 


        //   if(link.classList.contains('active')){

        //     console.log(link.innerHTML = 'Свернуть');
 
        //   } else {
             
        //      console.log(link.innerHTML = 'Развернуть');
        //   }
          

       
         

          
     })
    }




  function setClass(elem, className, fnName) {
     for (let i = 0; i < elem.length; i++) {
        elem[i].classList[fnName](className);
     }

  }






   
    

    

       


      
    



;



