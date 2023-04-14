
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


let result = {}

const tableBody = document.querySelectorAll('.table__body');

tableBody.forEach(table => {
  const items = table.querySelectorAll('.table__row');
  items.forEach(item => {
    const name = item.querySelector('[data-name]')
    if(name){
      const productName = name.getAttribute('data-name');
      const productCost = parseFloat(name.textContent.replace(',', '.'));
      result[productName] = productCost;
    }
  })

})

console.log(result)



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
    powerValue = parseFloat((((this.value - 250) / 50) * result['power']).toFixed(2));


  } else if (measure === 'U') {
    x = (this.value * 14.286) - 14.286;
    this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
    unitValue = parseFloat(((this.value * result['unit']) - result['unit']).toFixed(2));


  } else if (measure === 'Gb/s') {

    x = (this.value * 14.286) - 14.286;
    this.previousSibling.previousSibling.firstElementChild.style.width = x + '%';
    portValue = parseFloat(((this.value * result['port']) - result['port']).toFixed(2));

  }

  calcValue();
}


if (document.querySelector('.checkbox-container')) {
  document.querySelector('.checkbox-container').addEventListener("change", function () {

    if (checkBox.checked) {
      supplyValue = result['supply'];
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
      ipValue = parseFloat((currentValue * result['ip']).toFixed(2));
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
    cost = result['server'];
  } else cost = result['tower'];

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
      currentCost.innerHTML = `&asymp; ${(result['server'].toFixed(2) * currency).toFixed(2)} RUB`;
    } else {
      currentCost.innerHTML = `${result['server'].toFixed(2)} BYN `;
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
      currentCost.innerHTML = `&asymp; ${(result['tower'].toFixed(2) * currency).toFixed(2)} RUB`;
    } else {
      currentCost.innerHTML = `${result['tower'].toFixed(2)} BYN`;
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
        currentCost.innerHTML = `&asymp; ${(result['server'].toFixed(2) * currency).toFixed(2)} RUB`;
      } else currentCost.innerHTML = `&asymp; ${(result['tower'].toFixed(2) * currency).toFixed(2)} RUB`;
    } else {
      if (costCalc.querySelector('.unit-item').style.display === 'block') {
        currentCost.innerHTML = `${result['server'].toFixed(2)} BYN`;
      } else currentCost.innerHTML = `${result['tower'].toFixed(2)} BYN`;
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



