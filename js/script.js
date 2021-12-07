

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

// const ranges = document.querySelectorAll('.range');



  swipeBtn.addEventListener('swiped-down', function() {
    iconMenu.classList.remove("active");
    wrapper.classList.remove("active-wrapper");
    menuBox.classList.remove('active-block');
    document.body.classList.remove('active-body'); 
    menuAccClick();

  
  });


  swipeBtn.addEventListener('click', function() {
    iconMenu.classList.remove("active");
    wrapper.classList.remove("active-wrapper");
    menuBox.classList.remove('active-block');
    document.body.classList.remove('active-body'); 
    menuAccClick();
    // document.querySelector('.wrapper-calc').classList.remove('active');
    // document.querySelector('.calc-form').classList.remove('active-calc');
    // nullValue();
   
  });




 



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
         setInner(reviewLinks);

         
         
           if (setClasses) {
             this.classList.add("active");
             this.parentNode.classList.add("active-section");
             this.previousSibling.previousSibling.classList.add("active-limiter");
             link.innerHTML = 'Свернуть';
             
            
          } else{
            this.classList.remove("active");
            this.parentNode.classList.remove("active-section");
            this.previousSibling.previousSibling.classList.remove("active-limiter");
            link.innerHTML = 'Развернуть';
            
          }


         

       
         

          
     })
    }




  function setClass(elem, className, fnName) {
     for (let i = 0; i < elem.length; i++) {
        elem[i].classList[fnName](className);

     }

  }


  function setInner(elem){
     for(let i = 0; i < elem.length; i++){
        if(elem[i].classList.contains('active')){
           elem[i].innerHTML = 'Свернуть';
        } else {
           
         elem[i].innerHTML = 'Развернуть'
        }
     }
  }






   
    

    

       


      
    



;

const ranges = document.querySelectorAll('.range')
const calcBtnUnit = document.querySelector("#btn-unit");
const calcBtnTower = document.querySelector("#btn-tower");
const closeIcon = document.querySelector(".close-icon");
const checkBox = document.querySelector('.checkbox-input');
const currentCost = document.querySelector(".cost-info");
const inputIp = document.querySelector('#input-ip');
const swipeCalcBtn = document.querySelector("#calc-swipe-line");
const addCalcBtn = document.querySelector('.btn-add-calc');
const calcTable = document.querySelector('.calc-table');
const costCalc = document.querySelector('.cost-calculation');


let measure;
let output;
let powerValue = 0;
let unitValue = 0;
let portValue = 0;
let ipValue = 0;
let supplyValue = 0;
let sum = 0;

let costServer = +document.querySelector('#costServer').innerHTML.replace(/,/, '.');
let costTower = +document.querySelector('#costTower').innerHTML.replace(/,/, '.');
const costPower = +document.querySelector('#costPower').innerHTML.replace(/,/, '.');
const costUnit = +document.querySelector('#costUnit').innerHTML.replace(/,/, '.');
const costSupply = +document.querySelector('#costSupply').innerHTML.replace(/,/, '.');
const costPort = +document.querySelector('#costPort').innerHTML.replace(/,/, '.');
const costIp = +document.querySelector('#costIp').innerHTML.replace(/,/, '.');
const IP_REGEXP = /^\d{1,4}$/;


function validateIpInput(value) {
  return IP_REGEXP.test(value);
}

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
        console.log(powerValue);
        
      } else if (measure === 'U'){
        x = (this.value*14.286)-14.286;
        this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
        unitValue = parseFloat(((this.value * costUnit)-costUnit).toFixed(2));
        console.log(unitValue);
        
      } else if (measure === 'Gb/s'){
        x = (this.value*14.286)-14.286;
        this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
      
        portValue = parseFloat(((this.value * costPort)-costPort).toFixed(2));
        console.log(portValue);
      } 

      calcValue();
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


inputIp.oninput = function() {

  let currentValue = 0;

  if(validateIpInput(inputIp.value)){
    document.querySelector('.ip-span').classList.remove('active-span');
    if(inputIp.value <= 1){
      currentValue = 0;
      ipValue = 0;
      
    } else {
      currentValue = inputIp.value - 1;
      ipValue = parseFloat((currentValue * costIp).toFixed(2));
    }
  
    
    calcValue();
  } else {
    document.querySelector('.ip-span').classList.add('active-span');
  }

  
};


function calcValue(){
   let cost;
  if(costCalc.querySelector('.unit-item').style.display === 'block'){
    cost = costServer;
  } else cost = costTower;

  sum = parseFloat(cost + powerValue + unitValue + ipValue + portValue + supplyValue).toFixed(2);
  currentCost.innerHTML = `${sum} BYN`;
  return sum;
}

addCalcBtn.addEventListener('click', function(){
  document.querySelector('.calc-container').classList.add('active-calc-container');
  calcTable.classList.add('active-calc-table');
  
})

addCalcBtn.addEventListener('click', addCalcServer);


function addCalcServer () {

  let total = 0;

  if(calcTable.querySelectorAll('.calc-table-container').length >=9){
    addCalcBtn.disabled = 'true';
    addCalcBtn.classList.remove('btn-gr-bg');
    addCalcBtn.classList.add('disabled');
  }

  
  
  let calcTableContainer = document.createElement('div');
  calcTableContainer.classList.add('calc-table-container');
  calcTable.prepend(calcTableContainer);
   
  let calcTableName = document.createElement('div');
  calcTableName.classList.add('calc-table-name');
  calcTableName.innerHTML = 'Сервер';
  calcTableContainer.append(calcTableName);
   
  let calcTableCost = document.createElement('div');
  calcTableCost.classList.add('calc-table-cost');
  calcTableCost.innerHTML = calcValue();
  calcTableContainer.append(calcTableCost);
  nullCalcValue();

  for(let elem of document.querySelectorAll('.calc-table-cost')){
    total = total + parseFloat(elem.innerHTML);
  }
  

  document.querySelector('.calc-total-amount').style.display = 'flex';
  document.querySelector('.total').innerHTML = `${total} BYN`;
 
}





  

calcBtnUnit.addEventListener('click', function(){
  document.body.classList.add('active-body');
  document.querySelector('.wrapper-calc').classList.add('active')
  document.querySelector('.unit-item').style.display = 'block';
  document.querySelector('.calc-container').classList.add('active-calc');
  currentCost.innerHTML = `${costServer}.00 BYN`;
  
})


calcBtnTower.addEventListener('click', function(){
  document.body.classList.add('active-body');
  document.querySelector('.wrapper-calc').classList.add('active');
  document.querySelector('.calc-container').classList.add('active-calc');
  document.querySelector('.unit-item').style.display = 'none';
  currentCost.innerHTML = `${costTower}.00 BYN`;
  
})


function nullCalcValue(){
  for(range of ranges){
    range.value = 0;
    range.previousSibling.previousSibling.firstElementChild.style.width = 0 + '%';
    
    if (range.parentElement.parentElement.firstElementChild.lastElementChild.getAttribute('data-value') === 'Вт'){
      range.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML = `250 Вт`;
      
    } else if (range.parentElement.parentElement.firstElementChild.lastElementChild.getAttribute('data-value') === 'U'){
      range.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML = `1 U`;
    } else {
      range.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML = `1 Gb/s`;
    }

    powerValue = 0;
    unitValue = 0;
    ipValue = 0;
    portValue = 0;
    supplyValue = 0;
    inputIp.value = '';
  }

  if(checkBox.checked){
    checkBox.checked = false;
  }

  if(costCalc.querySelector('.unit-item').style.display === 'block'){
    currentCost.innerHTML = `${costServer}.00 BYN`; 
  
  } else currentCost.innerHTML = `${costTower}.00 BYN`;
  

}


function nullValue(){
  document.body.classList.remove('active-body');
  document.querySelector('.calc-container').classList.remove('active-calc-container');
  document.querySelector('.wrapper-calc').classList.remove('active');
  calcTable.classList.remove('active-calc-table');
   
  nullCalcValue();
    
  if(calcTable.querySelectorAll('.calc-table-container').length > 0){
    for(child of calcTable.querySelectorAll('.calc-table-container')){
        child.remove();
    }
     
  }
  
  addCalcBtn.disabled = false;
  addCalcBtn.classList.add('btn-gr-bg');
  addCalcBtn.classList.remove('disabled');
  document.querySelector('.ip-span').classList.remove('active-span');

}



closeIcon.addEventListener('click', nullValue);


function removeClasses(){
  document.body.classList.remove('active-body'); 
  document.querySelector('.wrapper-calc').classList.remove('active');
  nullValue();
}

swipeCalcBtn.addEventListener('swiped-down', removeClasses);

swipeCalcBtn.addEventListener('click', removeClasses);;




