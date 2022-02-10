
const iconMenu = document.querySelector('.menu-icon');
const wrapper = document.querySelector(".wrapper-swipe-menu");
const menuBox = document.querySelector(".swipe-menu-container");
const accHeaders = document.querySelectorAll(".accordion-header");
const accPanel = document.querySelectorAll('.accordion-panel');


function menuClick() {
   if (iconMenu) {

      iconMenu.addEventListener('click', function (e) {
         iconMenu.classList.toggle("active");
         wrapper.classList.toggle("active-wrapper");
         menuBox.classList.toggle('active-block');
         document.body.classList.toggle('active-body');
         menuAccClick();

      })
   }
}

menuClick();

function menuAccClick() {
   for (let accHeader of accHeaders) {

      if (accHeader.nextElementSibling.classList.contains("show-panel")) {
         accHeader.nextElementSibling.classList.remove("show-panel");
         menuBox.style.minHeight = 690 + 'px';
      }


      accHeader.addEventListener('click', function (e) {
         let setClasses = !this.classList.contains('active-panel');
         setClass(accHeaders, 'active-panel', 'remove');
         setClass(accPanel, 'show-panel', 'remove');


         if (setClasses) {
            this.classList.toggle("active-panel");
            this.nextElementSibling.classList.toggle("show-panel");

         }

         if (accHeader.nextElementSibling.classList.contains("show-panel")) {

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

swipeBtn.addEventListener('swiped-down', function () {
  iconMenu.classList.remove("active");
  wrapper.classList.remove("active-wrapper");
  menuBox.classList.remove('active-block');
  document.body.classList.remove('active-body');
  menuAccClick();

});


swipeBtn.addEventListener('click', function () {
  iconMenu.classList.remove("active");
  wrapper.classList.remove("active-wrapper");
  menuBox.classList.remove('active-block');
  document.body.classList.remove('active-body');
  menuAccClick();

});








;

const accordionBtns = document.querySelectorAll('.accordion-header-services');
const accSection = document.querySelector('.colocation-services-accordion');
const panels = document.querySelectorAll('.accordion-panel-services');
let accordionFirst = document.getElementById('first-content');
const innerLinks = document.querySelectorAll('.inner-link');

for (let accordionBtn of accordionBtns) {
  accordionBtn.addEventListener('click', function () {

    let accordionContent = this.nextElementSibling;
    if (accordionContent.style.maxHeight) {
      accordionContent.style.maxHeight = null;
      accSection.style.minHeight = 96 + 'px';


    } else {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      accSection.style.minHeight = accordionContent.scrollHeight + 'px';

    }
  });

}


if (accordionFirst) {
  window.onload = function () {
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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', formSend);
    }

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add('sending');

            let response = await fetch('send.php', {
                method: 'POST',
                body: formData
            })


            if (response.ok) {

                let result = await response.json();
                form.classList.add('display-none');
                document.querySelector('#form-title').style.display = 'none';
                document.querySelector('.form-send').classList.add('active');
            } else {
                alert('Что-то пошло не так...')
                form.reset();
            }

        } else alert('Заполните обязательные поля')

    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.req')

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }

        }

        return error;

    }

    function formAddError(input) {
        input.parentElement.classList.add('error');
        input.classList.add('error');
    }


    function formRemoveError(input) {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
    }


    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

})


;
let closeIconPartners = document.getElementById('close-icon-partners');
let partnersBtn = document.querySelector('.partners-btn');
const form = document.getElementById('form');

const swipeFormLine = document.querySelector('#partners-swipe-line');

if (partnersBtn) {
    partnersBtn.addEventListener('click', function () {
        document.body.classList.add('active-body');
        document.querySelector('.wrapper-partners').classList.add('active');
        document.querySelector('.form-send').classList.remove('active');
        form.classList.remove('display-none');
        document.querySelector('#form-title').style.display = 'block';
        document.querySelector('.partners-container').classList.add('active');
    })
}


if (closeIconPartners) {
    closeIconPartners.addEventListener("click", function () {
        document.querySelector('.wrapper-partners').classList.remove('active');
        document.querySelector('.form-send').classList.remove('active');
        form.reset();
        document.body.classList.remove('active-body');
        document.querySelector('.partners-container').classList.remove('active');
    })
}


if (swipeFormLine) {
    swipeFormLine.addEventListener('swiped-down', function () {
        document.querySelector('.wrapper-partners').classList.remove('active');
        document.querySelector('.form-send').classList.remove('active');
        form.reset();
        document.body.classList.remove('active-body');
        document.querySelector('.partners-container').classList.remove('active');
    })


    swipeFormLine.addEventListener('click', function () {
        document.querySelector('.wrapper-partners').classList.remove('active');
        document.querySelector('.form-send').classList.remove('active');
        form.reset();
        document.body.classList.remove('active-body');
        document.querySelector('.partners-container').classList.remove('active');
    });
}




;

let map_containers = document.querySelectorAll('.map_container');
let options_map = {
    once: true,
    passive: true,
    capture: true
};

if (map_containers) {
    for (let map_container of map_containers) {
        map_container.addEventListener('click', start_lazy_map, options_map);
        map_container.addEventListener('mouseover', start_lazy_map, options_map);
        map_container.addEventListener('touchstart', start_lazy_map, options_map);
        map_container.addEventListener('touchmove', start_lazy_map, options_map);
    }

}

let map_loaded = false;
function start_lazy_map() {
    if (!map_loaded) {
        let map_blocks = document.querySelectorAll('.ymap_lazy');
        for (let map_block of map_blocks) {
            map_loaded = true;
            map_block.setAttribute('src', map_block.getAttribute('data-src'));
            map_block.removeAttribute('data-src');
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
const rub = document.querySelector("#rub");
const byn = document.querySelector("#byn");
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
let rangeValue = 0;
let currentCurrency;
let currency;
const IP_REGEXP = /^[1-9]([0-9]*)$/;
const costServerElem = document.querySelector('#costServer');
const costTowerElem = document.querySelector('#costTower');
const costPowerElem = document.querySelector('#costPower');
const costUnitElem = document.querySelector('#costUnit');
const costSupplyElem = document.querySelector('#costSupply');
const costPortElem = document.querySelector('#costPort');
const costIpElem = document.querySelector('#costIp');


async function getCurrency() {

  let url = 'https://www.nbrb.by/api/exrates/rates/456/?periodicity=0';
  let response = await fetch(url);
  currentCurrency = await response.json();
  let RUB = currentCurrency.Cur_OfficialRate;
  currency = (100 / RUB).toFixed(2);

}

if (calcBtnUnit) {
  calcBtnUnit.addEventListener('click', getCurrency);
}

if (calcBtnTower) {
  calcBtnTower.addEventListener('click', getCurrency);
}

if (document.querySelector("#unitServer")) {

  costPower = parseFloat(costPowerElem.innerHTML.replace(/,/, '.'));
  costSupply = parseFloat(costSupplyElem.innerHTML.replace(/,/, '.'));
  costPort = parseFloat(costPortElem.innerHTML.replace(/,/, '.'));
  costIp = parseFloat(costIpElem.innerHTML.replace(/,/, '.'));
  costServer = parseFloat(costServerElem.innerHTML.replace(/,/, '.'));
  costUnit = parseFloat(costUnitElem.innerHTML.replace(/,/, '.'));

}

if (document.querySelector("#towerServer")) {

  costPower = parseFloat(costPowerElem.innerHTML.replace(/,/, '.'));
  costSupply = parseFloat(costSupplyElem.innerHTML.replace(/,/, '.'));
  costPort = parseFloat(costPortElem.innerHTML.replace(/,/, '.'));
  costIp = parseFloat(costIpElem.innerHTML.replace(/,/, '.'));
  costTower = parseFloat(costTowerElem.innerHTML.replace(/,/, '.'));

}

if (costServerElem && costTowerElem && costPowerElem && costUnitElem && costPortElem && costSupplyElem && costIpElem) {
  costServer = parseFloat(costServerElem.innerHTML.replace(/,/, '.'));
  costTower = parseFloat(costTowerElem.innerHTML.replace(/,/, '.'));
  costPower = parseFloat(costPowerElem.innerHTML.replace(/,/, '.'));
  costUnit = parseFloat(costUnitElem.innerHTML.replace(/,/, '.'));
  costSupply = parseFloat(costSupplyElem.innerHTML.replace(/,/, '.'));
  costPort = parseFloat(costPortElem.innerHTML.replace(/,/, '.'));
  costIp = parseFloat(costIpElem.innerHTML.replace(/,/, '.'));
}

function validateIpInput(value) {
  return IP_REGEXP.test(value);
}

for (let range of ranges) {
  range.oninput = function () {
    output = this.parentElement.parentElement.firstElementChild.lastElementChild;
    measure = output.getAttribute('data-value');
    output.innerHTML = `${this.value} ${measure}`;

  }

  range.addEventListener('input', getValue);

}


//получение значений инпутов

function getValue() {
  let x = 0;
  if (measure === 'Вт') {
    x = (this.value / 12.5) - 20;
    this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
    powerValue = parseFloat((((this.value - 250) / 50) * costPower).toFixed(2));


  } else if (measure === 'U') {
    x = (this.value * 14.286) - 14.286;
    this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
    unitValue = parseFloat(((this.value * costUnit) - costUnit).toFixed(2));


  } else if (measure === 'Gb/s') {

    x = (this.value * 14.286) - 14.286;
    this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
    portValue = parseFloat(((this.value * costPort) - costPort).toFixed(2));

  }

  calcValue();
}


if (document.querySelector('.checkbox-container')) {
  document.querySelector('.checkbox-container').addEventListener("change", function () {

    if (checkBox.checked) {
      supplyValue = costSupply;
    } else {
      supplyValue = 0;
    }

    calcValue();

  })
}


//Расчет стоимости IP


if (inputIp) {

  inputIp.oninput = function () {

    let currentValue = 0;

    if (inputIp.value <= 1) {
      currentValue = 0;
      ipValue = 0;
    }

    else {
      currentValue = inputIp.value - 1;
      ipValue = parseFloat((currentValue * costIp).toFixed(2));
    }

    calcValue();

    if (validateIpInput(inputIp.value) || inputIp.value == "") {
      document.querySelector('.ip-error').classList.remove('active-error');

    } else {
      document.querySelector('.ip-error').classList.add('active-error');
    }

  };

}


// Расчет общей стоимости услуги
function calcValue() {
  let cost;
  if (costCalc.querySelector('.unit-item').style.display === 'block') {
    cost = costServer;
  } else cost = costTower;

  sum = parseFloat(cost + powerValue + unitValue + ipValue + portValue + supplyValue);

  if (rub.checked) {
    currentCost.innerHTML = `&asymp; ${(sum.toFixed(2) * currency).toFixed(2)} RUB`;
    return (sum.toFixed(2) * currency).toFixed(2);
  } else {
    currentCost.innerHTML = `${sum.toFixed(2)} BYN`;
    return (sum.toFixed(2));
  }

}

// калькулятор - переключения валюты

if (rub) {
  rub.addEventListener('input', calcValue)

  // удалиение занчений при переключении радиокнопок
  rub.addEventListener("change", function () {
    if (calcTable) {
      calcTable.classList.remove('active-calc-table');
    }

    nullCalcValue()

    if (calcBtnUnit) {
      if (calcTable.querySelectorAll('.calc-table-container').length > 0) {
        for (child of calcTable.querySelectorAll('.calc-table-container')) {
          child.remove();
        }

      }
    }

    if (addCalcBtn) {
      addCalcBtn.disabled = false;
      addCalcBtn.classList.add('btn-gr-bg');
      addCalcBtn.classList.remove('disabled');
    }

    if (document.querySelector('.ip-span')) {

      document.querySelector('.ip-span').classList.remove('active-span');
    }
  })

}

if (byn) {

  byn.addEventListener('input', calcValue);

  byn.addEventListener("change", function () {
    if (calcTable) {
      calcTable.classList.remove('active-calc-table');
    }

    nullCalcValue()

    if (calcBtnUnit) {
      if (calcTable.querySelectorAll('.calc-table-container').length > 0) {
        for (child of calcTable.querySelectorAll('.calc-table-container')) {
          child.remove();
        }

      }
    }

    if (addCalcBtn) {
      addCalcBtn.disabled = false;
      addCalcBtn.classList.add('btn-gr-bg');
      addCalcBtn.classList.remove('disabled');
    }

    if (document.querySelector('.ip-span')) {

      document.querySelector('.ip-span').classList.remove('active-span');
    }
  })
}

//функция добавления таблицы по клике на кнопку @Добавить еще


if (addCalcBtn) {
  addCalcBtn.addEventListener('click', function () {
    document.querySelector('.calc-container').classList.add('active-calc-container');
    calcTable.classList.add('active-calc-table');
    document.querySelector('.calc-total-amount').classList.add('active-total-amount');
    power = `${document.querySelector("#power-range").value}Вт`;
    port = `${document.querySelector('#port-range').value}Gb/s`;
    if (costCalc.querySelector('.unit-item').style.display === 'block') {
      unit = `${document.querySelector('#unit-range').value}U`;
    } else unit = 'Tower';

    if (inputIp.value == 0 || inputIp.value == 1) {
      ip = `${1}IP`;
    } else {
      ip = `${inputIp.value}IP`;
    }

    if (checkBox.checked) {
      supply = `${2}БП`;
    } else supply = `${1}БП`;

  })

  addCalcBtn.addEventListener('click', addCalcServer);
}


// Добавление таблицы

function addCalcServer() {

  let total = 0;

  if (calcTable.querySelectorAll('.calc-table-container').length >= 9) {
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

  for (let elem of document.querySelectorAll('.calc-table-cost')) {
    total = total + parseFloat(elem.innerHTML);
  }

  document.querySelector('.total-text').innerHTML = `Итого`;

  if (rub.checked) {
    document.querySelector('.total').innerHTML = `&asymp; ${total.toFixed(2)} RUB`;
  } else {
    document.querySelector('.total').innerHTML = `${total.toFixed(2)} BYN`;
  }

}

// Кнопки рассчитать услугу

if (calcBtnUnit) {
  calcBtnUnit.addEventListener('click', function () {


    document.body.classList.add('active-body');
    document.querySelector('.wrapper-calc').classList.add('active')
    document.querySelector('.unit-item').style.display = 'block';
    document.querySelector('.calc-container').classList.add('active-calc');


    if (rub.checked) {
      currentCost.innerHTML = `&asymp; ${(costServer.toFixed(2) * currency).toFixed(2)} RUB`;
    } else {
      currentCost.innerHTML = `${costServer.toFixed(2)} BYN `;
    }

  })
}


if (calcBtnTower) {
  calcBtnTower.addEventListener('click', function () {
    document.body.classList.add('active-body');
    document.querySelector('.wrapper-calc').classList.add('active');
    document.querySelector('.calc-container').classList.add('active-calc');
    document.querySelector('.unit-item').style.display = 'none';

    if (rub.checked) {
      currentCost.innerHTML = `&asymp; ${(costTower.toFixed(2) * currency).toFixed(2)} RUB`;
    } else {
      currentCost.innerHTML = `${costTower.toFixed(2)} BYN`;
    }

  })
}

//Функция обнулить значения калькулятора


function nullCalcValue() {
  for (range of ranges) {
    range.value = 0;
    range.previousSibling.previousSibling.firstElementChild.style.width = 0 + '%';

    if (range.parentElement.parentElement.firstElementChild.lastElementChild.getAttribute('data-value') === 'Вт') {
      range.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML = `250 Вт`;

    } else if (range.parentElement.parentElement.firstElementChild.lastElementChild.getAttribute('data-value') === 'U') {
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

  if (checkBox) {
    if (checkBox.checked) {
      checkBox.checked = false;
    }
  }

  if (costCalc) {
    if (rub.checked) {
      if (costCalc.querySelector('.unit-item').style.display === 'block') {
        currentCost.innerHTML = `&asymp; ${(costServer.toFixed(2) * currency).toFixed(2)} RUB`;
      } else currentCost.innerHTML = `&asymp; ${(costTower.toFixed(2) * currency).toFixed(2)} RUB`;
    } else {
      if (costCalc.querySelector('.unit-item').style.display === 'block') {
        currentCost.innerHTML = `${costServer.toFixed(2)} BYN`;
      } else currentCost.innerHTML = `${costTower.toFixed(2)} BYN`;
    }
  }
}

// функция обнуления классов

function nullValue() {
  document.body.classList.remove('active-body');
  if (document.querySelector('.calc-container')) {
    document.querySelector('.calc-container').classList.remove('active-calc-container');
  }

  if (document.querySelector('.wrapper-calc')) {
    document.querySelector('.wrapper-calc').classList.remove('active');
  }

  if (calcTable) {
    calcTable.classList.remove('active-calc-table');
  }

  if (rub.checked) {
    rub.checked = false;
    byn.checked = true;
  }


  nullCalcValue();

  if (calcBtnUnit) {
    if (calcTable.querySelectorAll('.calc-table-container').length > 0) {
      for (child of calcTable.querySelectorAll('.calc-table-container')) {
        child.remove();
      }

    }
  }

  if (addCalcBtn) {
    addCalcBtn.disabled = false;
    addCalcBtn.classList.add('btn-gr-bg');
    addCalcBtn.classList.remove('disabled');
  }

  if (document.querySelector('.ip-span')) {

    document.querySelector('.ip-span').classList.remove('active-span');
  }
}

if (closeIcon) {
  closeIcon.addEventListener('click', nullValue);
}

//Обнуление классов по свайпу

function removeClasses() {
  document.body.classList.remove('active-body');
  document.querySelector('.wrapper-calc').classList.remove('active');
  nullValue();
}

if (swipeCalcBtn) {
  swipeCalcBtn.addEventListener('swiped-down', removeClasses);

  swipeCalcBtn.addEventListener('click', removeClasses);
}



;

