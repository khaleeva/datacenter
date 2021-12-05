

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
const swipeBtns = document.querySelectorAll(".swipe-line");
// const ranges = document.querySelectorAll('.range');

for(let swipeBtn of swipeBtns){

  swipeBtn.addEventListener('swiped-down', function(e) {
    iconMenu.classList.remove("active");
    wrapper.classList.remove("active-wrapper");
    menuBox.classList.remove('active-block');
    document.body.classList.remove('active-body'); 
    document.querySelector('.wrapper-calc').classList.remove('active');
    document.querySelector('.calc-form').classList.remove('active-calc');
    menuAccClick();
    nullValue();

  
  });


  swipeBtn.addEventListener('click', function(e) {
    iconMenu.classList.remove("active");
    wrapper.classList.remove("active-wrapper");
    menuBox.classList.remove('active-block');
    document.body.classList.remove('active-body'); 
    document.querySelector('.wrapper-calc').classList.remove('active');
    document.querySelector('.calc-form').classList.remove('active-calc');
    menuAccClick();
    nullValue();
   
  });
}


;





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



const ranges = document.querySelectorAll('.range')
const calcBtnUnit = document.querySelector("#btn-unit");
const calcBtnTower = document.querySelector("#btn-tower");
const closeIcon = document.querySelector(".close-icon");
const checkBox = document.querySelector('.checkbox-input');
const currentCost = document.querySelector(".cost-info");


let measure;
let output;
let powerValue = 0;
let unitValue = 0;
let portValue = 0;
let ipValue = 0;

let supplyValue = 0;
let costServer = +document.querySelector('#costServer').innerHTML.replace(/,/, '.');
let costTower = +document.querySelector('#costTower').innerHTML.replace(/,/, '.');
const costPower = +document.querySelector('#costPower').innerHTML.replace(/,/, '.');
const costUnit = +document.querySelector('#costUnit').innerHTML.replace(/,/, '.');
const costSupply = +document.querySelector('#costSupply').innerHTML.replace(/,/, '.');
const costPort = +document.querySelector('#costPort').innerHTML.replace(/,/, '.');
const costIp = +document.querySelector('#costIp').innerHTML.replace(/,/, '.');

let sum = 0;


for(let range of ranges){
  range.oninput = function(){
    output = this.parentElement.parentElement.firstElementChild.lastElementChild;
    measure = output.getAttribute('data-value');
    output.innerHTML = `${this.value} ${measure}` ;
    
  }

  range.addEventListener('input', function(){
    let x = 0;
    if (measure === 'Вт'){
      x = (this.value/12.5)-20;
      this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
      powerValue = parseFloat((((this.value-250)/50) * costPower).toFixed(2));
      
      
    } else if (measure === 'U'){
      x = (this.value*14.286)-14.286;
      this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
      unitValue = parseFloat(((this.value * costUnit)-costUnit).toFixed(2));
      
      
    } else if (measure === 'IP'){
      x = (this.value*14.286)-14.286;
      this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
      ipValue = parseFloat(((this.value * costIp)-costIp).toFixed(2));
      
      
    } else if (measure === 'Gb/s'){
      x = (this.value*14.286)-14.286;
      this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
     
      portValue = parseFloat(((this.value * costPort)-costPort).toFixed(2));
    } 

      calcValue(costServer, powerValue, unitValue, ipValue, portValue);
  })
}





document.querySelector('.checkbox-container').addEventListener("change", function(){
   
  if(checkBox.checked){
     supplyValue = costSupply;
    } else {
      supplyValue = 0;
    }

    calcValue();
  
})



function calcValue(){

  sum = parseFloat(costServer + powerValue + unitValue + ipValue + portValue + supplyValue).toFixed(2);
  currentCost.innerHTML = `${sum} BYN`;
  
}





    calcBtnUnit.addEventListener('click', function(){
        document.body.classList.add('active-body');
        document.querySelector('.wrapper-calc').classList.add('active')
        document.querySelector('.unit-item').style.display = 'block';
        currentCost.innerHTML = `${costServer}.00 BYN`;
        document.querySelector('.calc-form').classList.add('active-calc');
      
        
    })






    calcBtnTower.addEventListener('click', function(){
      document.body.classList.add('active-body');
      document.querySelector('.wrapper-calc').classList.add('active');
      document.querySelector('.calc-form').classList.add('active-calc');
      document.querySelector('.unit-item').style.display = 'none';
      unitValue = 0;
      currentCost.innerHTML = `${costTower}.00 BYN`;
      costServer = costTower;
    })



















function nullValue(){
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
    
    costServer = +document.querySelector('#costServer').innerHTML.replace(/,/, '.');
    

      if(checkBox.checked){
        checkBox.checked = false;
      }
}



closeIcon.addEventListener('click', nullValue);;
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



