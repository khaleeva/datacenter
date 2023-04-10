
const burger = document.querySelector('.burger');
const overlay = document.querySelector(".overlay");
const swipe_block = document.querySelector(".swipe-menu__container");
const accordion_headers = document.querySelectorAll(".accordion-header");
const accordion_panels = document.querySelectorAll('.accordion-panel');

document.addEventListener("DOMContentLoaded", function() {
   menuClick();
   menuAccClick();
})




function menuClick() {
   if (burger) {
      burger.addEventListener('click', function () {
         burger.classList.toggle("burger_open");
         overlay.classList.toggle("overlay_active");
         swipe_block.classList.toggle('swipe-menu__container_open');
         document.body.classList.toggle('active-body');
      })
   }
}


function menuAccClick() {
   for (let header of accordion_headers) {
      if (header.nextElementSibling.classList.contains("accordion-panel_open")) {
         header.nextElementSibling.classList.remove("accordion-panel_open");
         swipe_block.style.minHeight = 690 + 'px';
      }
      header.addEventListener('click', function (e) {
         let setClasses = !this.classList.contains('accordion-header_close');
         setClass(accordion_headers, 'accordion-header_close', 'remove');
         setClass(accordion_panels, 'accordion-panel_open', 'remove');

         if (setClasses) {
            this.classList.toggle("accordion-header_close");
            this.nextElementSibling.classList.toggle("accordion-panel_open");
         }

         if (header.nextElementSibling.classList.contains("accordion-panel_open")) {
            let insideElHeight = e.target.nextElementSibling.scrollHeight;
            swipe_block.style.minHeight = 690 + insideElHeight + 'px';

         } else {
            swipe_block.style.minHeight = 690 + 'px';
         }


      })
   }
}










;
function setClass(elem, className, fnName) {
    for (let i = 0; i < elem.length; i++) {
        elem[i].classList[fnName](className);
    }
}
;
const swipeBtn = document.querySelector(".swipe-line");

swipeBtn.addEventListener('swiped-down', function () {
  burger.classList.remove("burger_open");
  overlay.classList.remove("overlay_active");
  swipe_block.classList.remove('swipe-menu__container_open');
  document.body.classList.remove('active-body');


});


swipeBtn.addEventListener('click', function () {
  burger.classList.remove("burger_open");
  overlay.classList.remove("overlay_active");
  swipe_block.classList.remove('swipe-menu__container_open');
  document.body.classList.remove('active-body');


});








;

const accordionBtns = document.querySelectorAll('.accordion-header-services');
const accSection = document.querySelector('.colocation-services-accordion');
const panels = document.querySelectorAll('.accordion-panel-services');
let accordionFirst = document.getElementById('first-content');
let dedicContent = document.getElementById('dedic-content');
const innerLinks = document.querySelectorAll('.inner-link');
let formHeight = document.querySelector('.form-container');

  if (accordionFirst) {
    accordionFirst.style.maxHeight = accordionFirst.scrollHeight + 'px' ;
}

  if(dedicContent && formHeight){
    dedicContent.style.maxHeight = dedicContent.scrollHeight + formHeight.scrollHeight + 'px' ;
  }


for (let accordionBtn of accordionBtns) {
  accordionBtn.addEventListener('click', function () {

    let accordionContent = this.nextElementSibling;

    if (accordionContent.style.maxHeight) {
      accordionContent.style.maxHeight = null;
      if(accSection) {
        accSection.style.minHeight = 96 + 'px';
      }
    } else {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      if(accSection) {
        accSection.style.minHeight = accordionContent.scrollHeight + 'px';
      }

    }
  });

}














;


const reviewLinks = document.querySelectorAll('.read-more-button');
const parents = document.querySelectorAll('.review__card-inner');
const limiters = document.querySelectorAll('.limiter');


for (let link of reviewLinks) {
      
    if(link.parentElement.classList.contains("review__card-inner_active")){
        link.parentElement.classList.remove("active-section");
      }

     link.addEventListener('click', function() {
        let setClasses = !this.classList.contains('active');
         setClass(reviewLinks, 'active', 'remove');
         setClass(parents, 'review__card-inner_active', 'remove');
         setClass(limiters,'active-limiter', 'remove');
         setInner(reviewLinks);

           if (setClasses) {
             this.classList.add("active");
             this.parentNode.classList.add("review__card-inner_active");
             this.previousSibling.previousSibling.classList.add("active-limiter");
            link.innerHTML = 'Свернуть';


          } else{
            this.classList.remove("active");
            this.parentNode.classList.remove("review__card-inner_active");
            this.previousSibling.previousSibling.classList.remove("active-limiter");
            link.innerHTML = 'Развернуть';

          }

     })
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

let formServer = document.querySelector('.order-form');
let cpuContainer = document.querySelector('.cpu-wrapper');
let hddContainer = document.querySelector('.hdd-wrapper');
let ramContainer = document.querySelector('.ram-wrapper');
let radio_container = document.querySelector('.radio-container');
let ram_container = document.querySelector('.ram-container');
let resultServer = document.querySelector('.result-order');
let constructor = document.querySelector('.constructor');
let bucketBtn = document.querySelector(`#bucket-btn`);
let config = document.querySelector('.config-server');
let price = document.querySelector('.server-price');
let select_wrapper = document.querySelector('.select-wrapper');
let showMore_btn = document.querySelector('.showMore');
const formElement = document.getElementById('order-form');

let stateHdd = {};
let stateRam = {};
let stateCpu = {};

    function getServers (prices)  {
        if(select_wrapper) {
            select_wrapper.innerHTML += `<select name="select" id="select-cpu" class="select" >
        ${prices.map(i => `<option value=${i.id['$']}>${i.name_ru['$']}</option>`).join('')}
</select>`

        }

        let cpu = document.querySelector('#select-cpu')
        let cpuData = prices.filter(item => item.id['$'] === cpu.value)
        let price = Math.ceil((cpuData.map(i => i.price.period[0]['$cost'])[0]) * 1.2)
        stateCpu[`cpu_select`] = {id: `${cpuData[0].id['$']}`, nameServer: `${cpuData[0].name_ru['$']}`, price: `${price}`}


        getHdd(prices, cpu.value)
        getConfig()


        cpu.addEventListener('change', function (e) {
            let nameItem = prices.filter(item => item.id['$'] === cpu.value)
            let cpuName = nameItem[0].name_ru['$']
            let price = Math.ceil((nameItem.map(i => i.price?.period[0]['$cost'])[0]) * 1.2)
            getHdd(prices, cpu.value)
            stateCpu[`cpu_select`] = {id: cpu.value, nameServer: cpuName, price: `${price}`}
            getConfig()

        })

    }



    function getValueRadioHdd(radio, name, data, label, price) {
        stateHdd[`${name}`] = {hdd: radio.value, idAddon: data, label: label, price: `${price}`}
        getConfig()
    }

    function getValueRadioRam(radio, name, data, label, price) {
        stateRam[`${name}`] = {ram: radio.value, idAddon: data, label: label, price: `${price}`}
        getConfig()
    }

    function changeStateHdd(hdds, idAddons) {
        stateHdd = {}
        hdds.map((i, index) => stateHdd[`hdd${index + 1}_radio`] = {
            hdd: `${i[0].id['$']}`,
            idAddon: `${idAddons[index]}`,
            label: `${i[0].name_ru['$']}`,
            price: `${i[0].price.period[0]['$cost']}`
        })

    }

    function changeStateRam(rams, idAddonsRam) {
        stateRam = {}
        rams.map((i, index) => stateRam[`ram_radio`] = {
            ram: `${i[0].id['$']}`,
            idAddon: `${idAddonsRam[index]}`,
            label: `${i[0].name_ru['$']}`,
            price: `${i[0].price.period[0]['$cost']}`
        })
    }

    const getRam = (addons) => {
        let idAddonsRam = addons.map(item => item.enumeration[1]?.id['$'] === '14' && item.id['$']).filter(i => i)
        let ramData = addons.map(item => item.enumeration[1]).filter(i => i)
        let ramAddons = ramData.filter(item => item.id['$'] === '14')
        let rams = ramAddons.map(item => item.enumerationitem)
        changeStateRam(rams, idAddonsRam)
        if (ramContainer.childNodes.length > 0) {
            ram_container.innerHTML = ''
        }

        rams.map((i, index) =>
            ram_container.innerHTML += `<p class="ram-title">Оперативная память</p><div class="box-ram">${rams[index].map(item =>
                `<label class="radio" for="ram${item.id['$']}_radio" >
<input type="radio" name="ram_radio" value=${item.id['$']} id="ram${item.id['$']}_radio" 
data-text='${item.name_ru['$']}' data-value="${idAddonsRam[index]}"
${stateRam[`ram_radio`].ram === item.id['$'] ? 'checked' : ""} onchange="getValueRadioRam(this, name, dataset.value, dataset.text, ${item.price.period[0]['$cost']} )"  />
<div class="radio__text">${item.name_ru['$']}</div>
</label>`).join('')}</div>`)
    }

    const getHdd = (prices, value) => {
        let cpuData = prices.filter(item => item.id['$'] === value)
        let addons = cpuData.map(addon => addon.addon).flat(1)
        let idAddons = addons.map(item => item.enumeration[1]?.id['$'] === '11' && item.id['$']).filter(i => i)
        let hddData = addons.map(item => item.enumeration[1]).filter(i => i)
        let hddAddons = hddData.filter(item => item.id['$'] === '11')
        let hdds = hddAddons.map(item => item.enumerationitem)

        getRam(addons)
        changeStateHdd(hdds, idAddons)

        if (hddContainer.childNodes.length > 0) {
            radio_container.innerHTML = ''
        }
        if (hdds.length <= 2) {
            showMore_btn.style.display = 'none'
        } else showMore_btn.style.display = 'block'

        let newArr = hdds.slice(2, hdds.length)
        hdds.length <= 2 ? hdds.map((i, index) =>
                radio_container.innerHTML += `<p>Выбрать жесткий диск ${index + 1}</p><div class="box">${hdds[index].map(item =>
                    `<label class="radio" for="hdd${item.id['$']}${index + 1}_radio" >
<input type="radio" name="hdd${index + 1}_radio" value=${item.id['$']} id="hdd${item.id['$']}${index + 1}_radio"  
data-text='${item.name_ru['$']}'  
data-value="${idAddons[index]}"
${stateHdd[`hdd${index + 1}_radio`].hdd === item.id['$'] ? 'checked' : ""} 
onchange="getValueRadioHdd(this, name, dataset.value, dataset.text, ${item.price.period[0]['$cost']})" />
<div class="radio__text">${item.name_ru['$']}</div>
</label>`).join('')}</div>`)
            :
            radio_container.innerHTML += `<p>Выбрать жесткий диск 1</p> <div class="box">${hdds[0].map(item =>
                `<label class="radio" for="hdd${item.id['$']}1_radio" >
<input type="radio" name="hdd1_radio" value=${item.id['$']} id="hdd${item.id['$']}1_radio" data-text='${item.name_ru['$']}' data-value="${idAddons[0]}" ${stateHdd[`hdd1_radio`].hdd === item.id['$'] ? 'checked' : ""} onchange="getValueRadioHdd(this, name, dataset.value, dataset.text, ${item.price.period[0]['$cost']})" />
<div class="radio__text">${item.name_ru['$']}</div>
</label>`).join('')}</div> 
<p>Выбрать жесткий диск 2</p> <div class="box">${hdds[1].map(item =>
                `<label class="radio" for="hdd${item.id['$']}2_radio" >
<input type="radio" name="hdd2_radio" value=${item.id['$']} id="hdd${item.id['$']}2_radio"  data-text='${item.name_ru['$']}' data-value="${idAddons[1]}" ${stateHdd[`hdd2_radio`].hdd === item.id['$'] ? 'checked' : ""} onchange="getValueRadioHdd(this, name, dataset.value, dataset.text, ${item.price.period[0]['$cost']})" />
<div class="radio__text">${item.name_ru['$']}</div>
</label>`).join('')}</div>`
        newArr.map((i, index) =>
            radio_container.innerHTML += `<p class="visible">Выбрать жесткий диск ${index + 3}</p> <div class="visible">${newArr[index].map(item =>
                `<label class="radio"  for="hdd${item.id['$']}${index + 3}_radio" >
<input  type="radio" name="hdd${index + 3}_radio" value=${item.id['$']} id="hdd${item.id['$']}${index + 3}_radio" data-text='${item.name_ru['$']}' data-value='${idAddons[index + 3]}' ${stateHdd[`hdd${index + 3}_radio`].hdd === item.id['$'] ? 'checked' : ""} onchange="getValueRadioHdd(this, name, dataset.value, dataset.text, ${item.price.period[0]['$cost']})" />
<div class="radio__text">${item.name_ru['$']}</div>
</label>`).join('')}</div>`
        )

    }

    const showPerClick = 4;
    if(showMore_btn){
        showMore_btn.addEventListener('click', function () {
            let hidden = document.querySelectorAll('.visible')
            for (let i = 0; i < showPerClick; i++) {
                hidden[i].classList.add('box');
                hidden[i].classList.remove('visible');
            }
            let box = document.querySelectorAll('div.box')
            if (box.length === Object.keys(stateHdd).length) {
                showMore_btn.style.display = 'none'
            }

        })
    }

    if(bucketBtn){
        bucketBtn.addEventListener('click', function () {
            const strCpu = Object.keys(stateCpu).map(i => stateCpu[i].id)
            const strHdd = Object.keys(stateHdd).map(i => `26addon_${stateHdd[i].idAddon}%3D${stateHdd[i].hdd}`).join('%')
            const strRam = Object.keys(stateRam).map(i => `26addon_${stateRam[i].idAddon}%3D${stateRam[i].ram}`).join('%')
            bucketBtn.href = `https://my.datahata.by/billmgr?func=register&redirect=startpage%3Ddedic%26startform%3Dquickorder%26pricelist%3D${strCpu}%26period%3D1%26project%3D1%${strHdd}%${strRam}%26redirect%3Dbasket`
        })
    }



    function getConfig() {
        const cpuConfig = Object.keys(stateCpu).map(i => stateCpu[i].nameServer)
        const ramConfig = Object.keys(stateRam).map(i => stateRam[i].label)
        const hddConfig = Object.keys(stateHdd).map(i => stateHdd[i].label)



        const cpuPrice = Object.keys(stateCpu).map(i => Number(stateCpu[i].price))[0]
        const ramPrice = Object.keys(stateRam).map(i => Number(stateRam[i].price))[0]
        const hddPrice = Object.keys(stateHdd).map(i => Number(stateHdd[i].price))



        let sumOfHdd = hddPrice.reduce((sum, current) => sum + current, 0)

        let totalSum =  (cpuPrice + (ramPrice * 1.2) + (sumOfHdd * 1.2)).toFixed(2)


        price.innerHTML = `${totalSum} <span>BYN/мес</span>`

        config.innerHTML = `<div class = 'config-server'>
        <div class = 'config-cpu'>${cpuConfig}</div>
        ${ramConfig.length ? `<div class = 'config-ram'>Оперативная память - ${ramConfig}</div>` : ''}
            ${hddConfig.map((i, index) => i === 'Без диска' ? null :
            `<div class = 'config-hdd'>Диск ${index + 1} - ${i}</div>`).join('')}
    </div>`

    }













































;
const domain = document.getElementById('domain')
const soft = document.getElementById('soft')
const ssl = document.getElementById('ssl')
const backup = document.getElementById('backup')
const formOther = document.querySelector('.form-other-container')
let state = {}


function getOtherServices(sslType, domainType, backUpType) {


    if (ssl) {
        generationHtml(sslType, ssl)
    }
    if (domain) {
        generationHtml(domainType, domain)
    }
    if (backup) {
        generationHtml(backUpType, backup)
    }


}

function getSoftServices(softType) {

    if (soft) {
        generationHtml(softType,soft)
    }


}


function generationHtml(data, elem) {
    data.length ? elem.innerHTML = `${data.map(i => ` <div class="table-body-item" >
 ${elem===backup ? `<p className="text">${i.name_ru['$']} (за 1 ГБ) </p>` : `<p className="text">${i.name_ru['$']}</p>`}
                                   
                                    ${elem === ssl ? `<div class="ssl-description">?<div class="ssl-text-description">${i.description_ru['$']}</div></div>` : ''}
                                    
                                    ${elem===ssl ? `<p class ='price'>${Math.ceil((i.price.period['$cost']) * 1.2).toFixed(2)} BYN/год</p>`: ''}
                                    ${elem===domain ? `<p class ='price'>${Math.ceil((i.price.period[1]['$cost']) * 1.2).toFixed(2)} BYN/год</p>`: ''}
                                    ${elem===backup ? `<p class ='price'>${((i.addon[0].price.period[0]['$cost']) * 1.2).toFixed(2)} BYN/мес</p>`: ''}
                                    ${elem===soft ? `<p class ='price'>${Math.ceil((i.price.period[0]['$cost']) * 1.2).toFixed(2)} BYN/мес</p>`: ``}
         
                                   
                                    
                                    
                                </div>`).join('')}` : elem.closest('.accordion-section-services').style.display = 'none'


}



;
window.onload = function () {
    getDedicTariffPlan().then()


};

async function getDedicTariffPlan() {
    let url = `https://my.datahata.by/billmgr?func=pricelist.export&elid=1&out=json&onlyavailable=on`;
    let response = await fetch(url);
    if (response.ok) {
        let data = await response.json();
        let idType = data.doc.pricelist
        let dedicType = idType.filter(i => i.itemtype['$'] === '21')
        let softType = idType.filter(i => i.itemtype['$'] === '40')
        let sslType = idType.filter(i => i.itemtype['$'] === '48')
        let domainType = idType.filter(i => i.itemtype['$'] === '49')
        let backUpType = idType.filter(i => i.itemtype['$'] === '66')


        if (document.getElementById("dedic-page")) {
            getServers(dedicType)
        } else if ((document.getElementById("other-page"))) {
            getOtherServices(sslType, domainType, backUpType)
        } else getSoftServices(softType)
        if(formServer) {
            formServer.classList.remove('get-data')
        }

        if(formOther) {
            formOther.classList.remove('get-data')
        }




    } else {
        alert('error')
        if(formServer) {
            formServer.classList.remove('get-data')
        }

        if(formOther) {
            formOther.classList.remove('get-data')
        }
    }

}






;




