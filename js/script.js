

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

let accordionFirstDedic = document.getElementById('first-content-dedic'); 






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
let power = 0;
let unit = 0;
let ip = 0;
let port = 0;
let supply = 0;


const costServerElem = document.querySelector('#costServer');
const costTowerElem = document.querySelector('#costTower');
const costPowerElem = document.querySelector('#costPower');
const costUnitElem = document.querySelector('#costUnit');
const costSupplyElem = document.querySelector('#costSupply');
const costPortElem = document.querySelector('#costPort');
const costIpElem = document.querySelector('#costIp');


if(costServerElem && costTowerElem && costPowerElem && costUnitElem && costPortElem && costSupplyElem && costIp){
  costServer = parseFloat(costServerElem.innerHTML.replace(/,/, '.'));
  costTower = parseFloat(costTowerElem.innerHTML.replace(/,/, '.'));
  costPower = parseFloat(costPowerElem.innerHTML.replace(/,/, '.'));
  costUnit = parseFloat(costUnitElem.innerHTML.replace(/,/, '.'));
  costSupply = parseFloat(costSupplyElem.innerHTML.replace(/,/, '.'));
  costPort = parseFloat(costPortElem.innerHTML.replace(/,/, '.'));
  costIp = parseFloat(costIpElem.innerHTML.replace(/,/, '.'));
}
// const costTowerElem = document.querySelector('#costTower');
// const costPowerElem = document.querySelector('#costPower');
// const costUnitElem = document.querySelector('#costUnit');
// const costSupplyElem = document.querySelector('#costSupply');
// const costPortElem = document.querySelector('#costPort');
// const costIpElem = document.querySelector('#costIp');

// const costServer = parseFloat(costServerElem.innerText.replace(/,/, '.'));
// const costTower = parseFloat(costTowerElem.innerHTML.replace(/,/, '.'));
// const costPower = parseFloat(costPowerElem.innerHTML.replace(/,/, '.'));
// const costUnit = parseFloat(costUnitElem.innerHTML.replace(/,/, '.'));
// const costSupply = parseFloat(costSupplyElem.innerHTML.replace(/,/, '.'));
// const costPort = parseFloat(costPortElem.innerHTML.replace(/,/, '.'));
// const costIp = parseFloat(costIpElem.innerHTML.replace(/,/, '.'));
// const IP_REGEXP = /^\d{1,4}$/;
const IP_REGEXP = /^[1-9]([0-9]*)$/;


function validateIpInput(value) {
  return IP_REGEXP.test(value);
}

for(let range of ranges){
    range.oninput = function(){
    output = this.parentElement.parentElement.firstElementChild.lastElementChild;
    measure = output.getAttribute('data-value');
    output.innerHTML = `${this.value} ${measure}` ;
    
  }



  range.addEventListener('input', getValue);

}





//получение значений инпутов

function getValue(){
  let x = 0;
      if (measure === 'Вт'){
        x = (this.value/12.5)-20;
        this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
        powerValue = parseFloat((((this.value-250)/50) * costPower).toFixed(2));
       
        
      } else if (measure === 'U'){
        x = (this.value*14.286)-14.286;
        this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
        unitValue = parseFloat(((this.value * costUnit)-costUnit).toFixed(2));
       
        
      } else if (measure === 'Gb/s'){
        
        x = (this.value*14.286)-14.286;
        this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
        portValue = parseFloat(((this.value * costPort)-costPort).toFixed(2));
        
      } 


      calcValue();

      
}




function getPowerValue(value){
  return value;
}



if(document.querySelector('.checkbox-container')){

  document.querySelector('.checkbox-container').addEventListener("change", function(){
   
    if(checkBox.checked){
       supplyValue = costSupply;
      } else {
        supplyValue = 0;
      }
  
      
  
    calcValue();
    
  })

}


//Расчет стоимости IP


if(inputIp){

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

}



// Расчет общей стоимости услуги
function calcValue(){
   let cost;
  if(costCalc.querySelector('.unit-item').style.display === 'block'){
    cost = costServer;
  } else cost = costTower;

  sum = parseFloat(cost + powerValue + unitValue + ipValue + portValue + supplyValue);

  
  
  currentCost.innerHTML = `${sum.toFixed(2)} BYN`;
  return (sum.toFixed(2));
}


//функция добавления таблицы по клике на кнопку @Добавить еще


if(addCalcBtn){
  addCalcBtn.addEventListener('click', function(){
    document.querySelector('.calc-container').classList.add('active-calc-container');
    calcTable.classList.add('active-calc-table');
    document.querySelector('.calc-total-amount').classList.add('active-total-amount');
    power = `${document.querySelector("#power-range").value}Вт`;
    port = `${document.querySelector('#port-range').value}Gb/s`;
    if(costCalc.querySelector('.unit-item').style.display === 'block'){
      unit = `${document.querySelector('#unit-range').value}U`;
    } else unit = 'Tower';
  
    
    
    if(inputIp.value == 0 || inputIp.value == 1){
      ip = `${1}IP`;
    } else {
      ip = `${inputIp.value}IP`;
    }
  
    if(checkBox.checked){
        supply = `${2}БП`;
    } else supply = `${1}БП`;
      
  })
  
  addCalcBtn.addEventListener('click', addCalcServer);
}




// Добавление таблицы

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

  calcTableName.innerHTML = `Сервер ${unit} ${power} ${ip} ${port} ${supply}`;
  calcTableContainer.append(calcTableName);
   
  let calcTableCost = document.createElement('div');
  calcTableCost.classList.add('calc-table-cost');
  calcTableCost.innerHTML = calcValue();
  calcTableContainer.append(calcTableCost);
  nullCalcValue();

  for(let elem of document.querySelectorAll('.calc-table-cost')){
    total = total + parseFloat(elem.innerHTML);
  }
  

  

  
    // document.querySelector('.calc-total-amount').style.display = 'flex';
  document.querySelector('.total-text').innerHTML = `Итого`;
    document.querySelector('.total').innerHTML = `${total.toFixed(2)} BYN`;


 
}




// Кнопки рассчитать услугу
  
if(calcBtnUnit){
  calcBtnUnit.addEventListener('click', function(){
    document.body.classList.add('active-body');
    document.querySelector('.wrapper-calc').classList.add('active')
    document.querySelector('.unit-item').style.display = 'block';
    document.querySelector('.calc-container').classList.add('active-calc');
    currentCost.innerHTML = `${costServer}.00 BYN`;
    
  })
}


if(calcBtnTower){
  calcBtnTower.addEventListener('click', function(){
    document.body.classList.add('active-body');
    document.querySelector('.wrapper-calc').classList.add('active');
    document.querySelector('.calc-container').classList.add('active-calc');
    document.querySelector('.unit-item').style.display = 'none';
    currentCost.innerHTML = `${costTower}.00 BYN`;
    
  })
}



//Функция обнулить значения калькулятора


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

  if(checkBox){
    if(checkBox.checked){
      checkBox.checked = false;
    }
  }

 
  if(costCalc){
    if(costCalc.querySelector('.unit-item').style.display === 'block'){
      currentCost.innerHTML = `${costServer}.00 BYN`; 
    
    } else currentCost.innerHTML = `${costTower}.00 BYN`;
  }


  

}

// функция обнуления классов

function nullValue(){
  document.body.classList.remove('active-body');
  if(document.querySelector('.calc-container')){
    document.querySelector('.calc-container').classList.remove('active-calc-container');
  }

  if(document.querySelector('.wrapper-calc')){
    document.querySelector('.wrapper-calc').classList.remove('active');
  }

  if(calcTable){
    calcTable.classList.remove('active-calc-table');
  }
  
  
 
   
  nullCalcValue();

  if(calcBtnUnit){
    if(calcTable.querySelectorAll('.calc-table-container').length > 0){
      for(child of calcTable.querySelectorAll('.calc-table-container')){
          child.remove();
      }
       
    }
  }
    
if(addCalcBtn){
  addCalcBtn.disabled = false;
  addCalcBtn.classList.add('btn-gr-bg');
  addCalcBtn.classList.remove('disabled');
}

if(document.querySelector('.ip-span')){
    
  document.querySelector('.ip-span').classList.remove('active-span');
}
  


}



closeIcon.addEventListener('click', nullValue);


//Обнуление классов по свайпу

function removeClasses(){
  document.body.classList.remove('active-body'); 
  document.querySelector('.wrapper-calc').classList.remove('active');
  nullValue();
}

if(swipeCalcBtn){
  swipeCalcBtn.addEventListener('swiped-down', removeClasses);

swipeCalcBtn.addEventListener('click', removeClasses);
}

;
//   "use strict"


//   const sendForm = () =>{
//     const form = document.getElementById('form');
//     const message = {
//         loading: "загрузка",
//         success: 'Спасибо!',
//         failure: 'Что-то пошло не так...'
//     }


//     const postData = async(url, data) =>{
//         let res = await fetch(url, {
//             method: "POST",
//             body: data
//         });

//         return await res.json();
//     }


//     form.addEventListener('submit', (e)=>{
//         e.preventDefault();
//         const formData = new FormData(form);
//         postData('send.php', formData)
//         .then(res => {
//             console.log(res);
//         });
        
//   })


//   };

  


document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form');
    if(form){
        form.addEventListener('submit', formSend);
    }
  
 


  async function formSend(e){
        e.preventDefault();
    
        let error = formValidate(form);

        let formData = new FormData(form);
        
        if(error === 0){
            form.classList.add('sending');
             
        let response = await fetch('send.php', {
            method: 'POST',
            body: formData
        })
        
        
        

        if(response.ok){

            let result = await response.json();
            console.log(result);
            // alert(result.message);
            // form.reset();
            form.classList.add('display-none');
            document.querySelector('#form-title').style.display = 'none';
            document.querySelector('.form-send').classList.add('active');
        } else {
            alert('Ошибка')
            form.reset();
        }

        } else alert('заполните обязательные поля')
        
    }

    function formValidate(form){
        let error = 0; 
        let formReq = document.querySelectorAll('.req')

        for(let index = 0; index < formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            } else{
                if(input.value === ""){
                    formAddError(input);
                    error++;
                }
            }

        }

        return error;

    }

    function formAddError(input){
        input.parentElement.classList.add('error');
        input.classList.add('error');
    }


    function formRemoveError(input){
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
    }


    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }



})


;
let closeIconPartners = document.getElementById('close-icon-partners');
let partnersBtn = document.querySelector('.partners-btn');
const form = document.getElementById('form');

const swipeFormLine = document.querySelector('#partners-swipe-line');

if(partnersBtn){
    partnersBtn.addEventListener('click', function(){
        document.body.classList.add('active-body');
        document.querySelector('.wrapper-partners').classList.add('active');
        document.querySelector('.form-send').classList.remove('active');
        form.classList.remove('display-none');
        document.querySelector('#form-title').style.display = 'block';
        document.querySelector('.partners-container').classList.add('active');
    })
}


if(closeIconPartners){
    closeIconPartners.addEventListener("click", function(){
        document.querySelector('.wrapper-partners').classList.remove('active');
        document.querySelector('.form-send').classList.remove('active');
        form.reset();
        document.body.classList.remove('active-body');
    })
}


if(swipeFormLine){
    swipeFormLine.addEventListener('swiped-down', function(){
        document.querySelector('.wrapper-partners').classList.remove('active');
        document.querySelector('.form-send').classList.remove('active');
        form.reset();
        document.body.classList.remove('active-body');
    })


swipeFormLine.addEventListener('click', function(){
    document.querySelector('.wrapper-partners').classList.remove('active');
        document.querySelector('.form-send').classList.remove('active');
        form.reset();
        document.body.classList.remove('active-body');
});
}




;




