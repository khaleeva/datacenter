
document.addEventListener("DOMContentLoaded", function () {
   openMenuFromBottomDirection();
})




const openMenuFromBottomDirection = () => {
   const burger = document.querySelector('.burger');
   const overlay = document.querySelector(".overlay");
   const accordion_bodies = document.querySelectorAll('.accordion__body');

   function toggleOpenMenuBurger() {
         burger.addEventListener('click', function () {
            burger.classList.toggle("burger_open");
            overlay.classList.toggle("overlay_active");
            document.body.classList.toggle('active-body');
            let isOpen = burger.classList.contains("burger_open")
            if(isOpen){
               accordion_bodies.forEach(body => body.classList.remove('accordion__body_open'));
            }
            setHeightForOpenedMenu(isOpen)
         })
   }

   toggleAccordion()
   toggleOpenMenuBurger()

}











;
function setHeightForOpenedMenu(isOpen = false) {
    const swipe_block = document.querySelector(".swipe-menu__container");
    const heightDevice = window.innerHeight;
    if(isOpen){
        let minHeightBottomMenu = heightDevice * 0.9
        let topPoint = heightDevice * 0.1
        swipe_block.style.minHeight = `${minHeightBottomMenu}px`
        swipe_block.style.top = `${topPoint}px`
    } else {
        swipe_block.style.minHeight = `0px`
        swipe_block.style.top = `100%`
    }
}
;
function toggleAccordion() {
    const accordion_headers = document.querySelectorAll(".accordion__header");
    const burger = document.querySelector('.burger');
    const accordion_bodies = document.querySelectorAll('.accordion__body');

    accordion_headers.forEach(header => header.addEventListener('click', function (e) {
            const current_header = e.target;
            const current_panel = current_header.nextElementSibling;
            if(burger.classList.contains('burger_open')){
                if(current_panel.classList.contains("accordion__body_open")){
                    current_panel.classList.remove("accordion__body_open")
                } else {
                    accordion_bodies.forEach(body => {
                        if(body.classList.contains("accordion__body_open")){
                            body.classList.remove("accordion__body_open")
                        }
                    })
                    current_panel.classList.add("accordion__body_open")
                }
            }

    }))

}
;
document.addEventListener("DOMContentLoaded", function () {
  swipeMenu();
})

const swipeMenu = () => {
  const swipeBtn = document.querySelector(".swipe-line");
  const burger = document.querySelector('.burger');
  const overlay = document.querySelector(".overlay");


  swipeBtn.addEventListener('swiped-down', function () {
    burger.classList.remove("burger_open");
    overlay.classList.remove("overlay_active");
    document.body.classList.remove('active-body');
    setHeightForOpenedMenu()

  });


  swipeBtn.addEventListener('click', function () {
    burger.classList.remove("burger_open");
    overlay.classList.remove("overlay_active");
    document.body.classList.remove('active-body');
    setHeightForOpenedMenu()
  });
}










;
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.all-services__accordion')) {
        openAccordionService()
    }

});

function openAccordionService() {

    let firstOpenAccordionBody = document.querySelectorAll('.first-open-body');
    const accordion_container = document.querySelector('.all-services__accordion');
    const accordion_headers = accordion_container.querySelectorAll('.accordion__header');
    const accordion_bodies = accordion_container.querySelectorAll('.accordion__body');

    firstOpenAccordionBody.forEach(first => {
        first.style.maxHeight = first.scrollHeight + 'px';
    })


    accordion_headers.forEach(header => header.addEventListener('click', (e) => {
        if (e.target.classList.contains('button__arrow')) {
            accordion_headers.forEach(h => {
                if (h !== header) {
                    h.querySelector('.button__arrow').classList.remove('button__arrow_rotate');
                }
            });

            firstOpenAccordionBody.forEach(first => {
                first.classList.remove('first-open-body')
            })

            e.target.classList.toggle('button__arrow_rotate');
            let current_body = header.nextElementSibling;

            if (current_body.style.maxHeight) {
                current_body.style.maxHeight = null;
            } else {
                accordion_bodies.forEach(body => {
                    if (body.style.maxHeight) {
                        body.style.maxHeight = null;
                    }
                })
                current_body.style.maxHeight = current_body.scrollHeight + 'px';
            }

        }
    }))


}
















;
document.addEventListener("DOMContentLoaded", function () {
    openReviewBlock()
})


function openReviewBlock () {
    const readMoreButtons = document.querySelectorAll('.read-more-button');
    const inner_blocks = document.querySelectorAll('.review__card-inner');
    const limiter_blocks = document.querySelectorAll('.limiter');

    readMoreButtons.forEach(readMoreButton =>
        readMoreButton.addEventListener('click', function (e) {
            const parent = e.target.closest('.review__card-inner');
            const limiter = parent.querySelector('.limiter');
            let isActive = e.target.classList.contains('read-more-button_active');
            isActive ? removeActiveClasses(e.target, parent, limiter) : addActiveClasses(e.target, parent, limiter)

        }))

    function addActiveClasses(button, parent, limiter) {
        if (!button.classList.contains('read-more-button_active')) {
            for (let i = 0; i < inner_blocks.length; i++) {
                if (inner_blocks[i].classList.contains('review__card-inner_active')) {
                    removeActiveClasses(readMoreButtons[i], inner_blocks[i], limiter_blocks[i]);
                }
            }
            button.classList.add('read-more-button_active');
            button.innerText = 'Свернуть';
            parent.classList.add("review__card-inner_active");
            limiter.classList.add("limiter_active");
        }

    }

    function removeActiveClasses(button, parent, limiter) {
        button.classList.remove("read-more-button_active");
        button.innerText = 'Развернуть';
        parent.classList.remove("review__card-inner_active");
        limiter.classList.remove("limiter_active");
    }
}







    

       


      
    



;

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const form_result = document.querySelector('.form__result');
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
                form.classList.add('form_hidden');
                form_result.classList.add('form__result_active');
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
        input.parentElement.classList.add('error-form');
        input.classList.add('error-form');
    }


    function formRemoveError(input) {
        input.parentElement.classList.remove('error-form');
        input.classList.remove('error-form');
    }


    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

})


;
document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('.form')){
        form()
    }
});


const form = () => {
    const closeIconForm = document.querySelector('#close-icon-partners');
    const openForm = document.querySelector('.partners-btn');
    const form = document.querySelector('.form');
    const partners_overlay = document.querySelector('.new-partners__overlay');
    const partners_container = document.querySelector('.new-partners__container');
    const form_result = document.querySelector('.form__result');
    const swipeFormLine = document.querySelector('#partners-swipe-line');


    function openSendForm() {
        const innerWidth = window.innerWidth;
        const heightDevice = window.innerHeight;
        if (innerWidth <= 768) {
            partners_container.classList.add('new-partners__container_active')
            let minHeightBottomMenu = heightDevice * 0.8
            let topPoint = heightDevice * 0.3
            partners_container.style.minHeight = `${minHeightBottomMenu}px`
            partners_container.style.minWidth = `${innerWidth}px`;
            partners_container.style.top = `${topPoint}px`
        }
        document.body.classList.add('active-body');
        partners_overlay.classList.add('new-partners__overlay_active');
        form_result.classList.remove('form__result_active');
        form.classList.remove('form_hidden');
    }

    function closeSendForm() {
        form.reset();
        const innerWidth = window.innerWidth;
        if (innerWidth <= 768) {
            partners_container.classList.remove('new-partners__container_active');
            partners_container.style.minHeight = `0px`
            partners_container.style.top = `100%`
        }
        document.body.classList.remove('active-body');
        partners_overlay.classList.remove('new-partners__overlay_active');
        form_result.classList.remove('form__result_active');
    }


    if (openForm) {
        openForm.addEventListener('click', openSendForm)
    }

    if (closeIconForm) {
        closeIconForm.addEventListener("click", closeSendForm)
    }


    if (swipeFormLine) {
        swipeFormLine.addEventListener('swiped-down', closeSendForm)
        swipeFormLine.addEventListener('click', closeSendForm)
    }
}








;
document.addEventListener("DOMContentLoaded", function () {
    lazyLoadMaps()
})


function lazyLoadMaps(){
    let maps = document.querySelectorAll('.map__card');
    let options_map = {
        once: true,
        passive: true,
        capture: true
    };

    maps.forEach(map => {
        map.addEventListener('click', start_lazy_map, options_map);
        map.addEventListener('mouseover', start_lazy_map, options_map);
        map.addEventListener('touchstart', start_lazy_map, options_map);
        map.addEventListener('touchmove', start_lazy_map, options_map);
    });

    let map_loaded = false;
    function start_lazy_map() {
        if (!map_loaded) {
            let ymaps_lazy = document.querySelectorAll('.ymap_lazy');
            ymaps_lazy.forEach(ymap_lazy => {
                map_loaded = true;
                ymap_lazy.setAttribute('src', ymap_lazy.getAttribute('data-src'));
                ymap_lazy.removeAttribute('data-src');
            })
        }
    }
}




;
document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('.calculator')){
        calculator()
    }

});

function calculator() {

    const calculator_container = document.querySelector('.calculator__container');
    const tableBody = document.querySelectorAll('.table__body');
    const ranges = document.querySelectorAll('.range');
    const checkbox_second_supply = document.querySelector('.checkbox');
    const buttonToOpenUnitCalculator = document.querySelector("#btn-unit");
    const buttonToOpenTowerCalculator = document.querySelector("#btn-tower");
    const closeIcon = document.querySelector(".close-icon");
    const currentCost = document.querySelector(".form__cost");
    const ip_count = document.querySelector('#ip');
    const calculatorForm = document.querySelector('.form__cost-calculate');
    const checkBox_RUB = document.querySelector("#rub");
    const checkBox_BYN = document.querySelector("#byn");
    const swipe_button = document.querySelector(".swipe-button");
    const addMoreServicesButton = document.querySelector('.calculator__button');
    const result_table = document.querySelector('.calculator__result-table');
    const result_table_rows = document.querySelector('.result-table__rows');
    const result_table_total = document.querySelector('.result-table__total');

    let measure = '';
    let currency_RUB;
    let countServer = 1;
    let POWER = 0, UNIT = 0, PORT = 0, IP = 0, SUPPLY = 0;
    let TOTAL_SUM = 0;
    let tableCostData = {}



    tableBody.forEach(table => {
        const items = table.querySelectorAll('.table__row');
        items.forEach(item => {
            const name = item.querySelector('[data-name]')
            if (name) {
                const productName = name.getAttribute('data-name');
                const productCost = parseFloat(name.textContent.replace(',', '.'));
                tableCostData[productName] = productCost;
            }
        })

    })

    async function getCurrency() {
        let url = 'https://www.nbrb.by/api/exrates/rates/456/?periodicity=0';
        let response = await fetch(url);
        let currentCurrency = await response.json();
        let RUB = currentCurrency.Cur_OfficialRate;
        currency_RUB = (100 / RUB).toFixed(2);
    }

    getCurrency()

// открытие калькулятора
    function openCalculator(data, action){
        const innerWidth = window.innerWidth;
        const heightDevice = window.innerHeight;
        document.body.classList.add('active-body')
        document.querySelector('.calculator__overlay').classList.add('calculator__overlay_active')
        document.querySelector('.cost-calculate__unit').classList[action]('cost-calculate__unit_active');
        if(innerWidth <= 768){
            calculator_container.classList.add('calculator__container_swipe')
            let minHeightBottomMenu = heightDevice * 0.8
            let topPoint = heightDevice * 0.2
            calculator_container.style.minHeight = `${minHeightBottomMenu}px`
            calculator_container.style.minWidth = `${innerWidth}px`;
            calculator_container.style.top = `${topPoint}px`
        }
        renderTotalCost(data.toFixed(2))
        checkBox_BYN.checked = true;
    }

    if (buttonToOpenUnitCalculator) {
        buttonToOpenUnitCalculator.addEventListener('click', () => openCalculator(tableCostData['server'], 'add'))
    }

    if (buttonToOpenTowerCalculator) {
        buttonToOpenTowerCalculator.addEventListener('click', () => openCalculator(tableCostData['tower'], 'remove'))
    }


    ranges.forEach(range => {
        range.addEventListener('input', () => {
            let valueElemOutput = range.parentNode.previousElementSibling.querySelector('.value');
            measure = valueElemOutput.getAttribute('data-value');
            valueElemOutput.innerHTML = `${range.value} ${measure}`;
            getValueFromRange(range)
        })

    })


//получение значений инпутов

    function getValueFromRange(range) {
        let x = 0;
        let fill_range = range.previousElementSibling.querySelector('.fill')

        switch (measure) {
            case 'Вт':
                x = (range.value / 12.5) - 20;
                fill_range.style.width = x + '%';
                POWER = parseFloat((((range.value - 250) / 50) * tableCostData['power']).toFixed(2));
                break;
            case 'U':
                x = (range.value * 14.286) - 14.286;
                fill_range.style.width = x + '%';
                UNIT = parseFloat(((range.value * tableCostData['unit']) - tableCostData['unit']).toFixed(2));
                break;
            case'Gb/s':
                x = (range.value * 14.286) - 14.286;
                fill_range.style.width = x + '%';
                PORT = parseFloat(((range.value * tableCostData['port']) - tableCostData['port']).toFixed(2));
            default:
                break;
        }

        getTotalCostOfService();
    }

    //Получение стоимости второго блока питания

    checkbox_second_supply.addEventListener('change', () => {
        SUPPLY = checkbox_second_supply.checked ? tableCostData['supply'] : 0
        getTotalCostOfService();
    })


//Расчет стоимости IP
    ip_count.addEventListener('input', () => {
        if(/^\d+$/.test(ip_count.value)){
            if (ip_count.value <= 1) {
                IP = 0;
            } else {
                let count = ip_count.value - 1;
                IP = parseFloat((count * tableCostData['ip']).toFixed(2));
            }
            getTotalCostOfService();
        } else{
            ip_count.value = ip_count.value.slice(0, -1);
        }
    })


// Расчет общей стоимости услуги
    function getTotalCostOfService() {
        let default_cost_server = calculatorForm.querySelector('.cost-calculate__unit_active') ?
            tableCostData['server'] : tableCostData['tower'];
        TOTAL_SUM = parseFloat(default_cost_server + POWER + UNIT + IP + PORT + SUPPLY);

        let render_total_sum = 0;

        if (checkBox_RUB.checked) {
            render_total_sum = (TOTAL_SUM.toFixed(2) * currency_RUB).toFixed(2);
        } else {
            render_total_sum = (TOTAL_SUM.toFixed(2));
        }

        renderTotalCost(render_total_sum)
        return render_total_sum

    }

    //Отрисовка итогой суммы в калькуляторе

    function renderTotalCost(totalCount, elem = currentCost) {
        if (checkBox_RUB.checked) {
            elem.innerHTML = `&asymp; ${totalCount} RUB`;
        } else {
            elem.innerHTML = `${totalCount} BYN`;
        }

    }

    function changeDisabledStateForButton(disabled) {
        addMoreServicesButton.disabled = disabled;
        if (disabled) {
            addMoreServicesButton.classList.add('button_disabled');
        } else {
            addMoreServicesButton.classList.remove('button_disabled');
        }
    }


    const buttons_currency = document.querySelectorAll('.button-currency__radio input[type="radio"]');

    buttons_currency.forEach((button_currency) => {
        button_currency.addEventListener('change', () => {
            if (button_currency.checked) {
                result_table.classList.remove('calculator__result-table_open');
                let result_table_cells = result_table_rows.querySelectorAll('.result-table__cell')
                if (result_table_cells.length > 0) {
                    result_table_cells.forEach(cell => cell.remove())
                }
                countServer = 1;
                changeDisabledStateForButton(false)
                getNullValueCalculator()
            }
        });
    });


    // рендер таблицы с серверами
    function renderResultTable(count) {
        let totalSumForAllServers = 0;
        let cost = getTotalCostOfService();
        let data = getDataForResultTable();
        calculator_container.classList.add('calculator__container_result-table');
        result_table.classList.add('calculator__result-table_open');
        result_table_total.classList.add('result-table__total_visible');
        result_table_rows.innerHTML += `<div class="result-table__cell">
            <div class="cell__name">${count}. Сервер ${data}</div>
            <div class="cell__cost">${cost}</div>
        </div>`
        document.querySelector('.point-to-scroll').scrollIntoView({ behavior: 'smooth', block: 'end' });

        for (let elem of document.querySelectorAll('.cell__cost')) {
            totalSumForAllServers = totalSumForAllServers + Number(elem.innerHTML);
            renderTotalCost(totalSumForAllServers.toFixed(2), document.querySelector('.total__cost'))
        }

        if (result_table_rows.querySelectorAll('.result-table__cell').length >= 10) {
            changeDisabledStateForButton(true)
        }

        getNullValueCalculator();
    }

    addMoreServicesButton.addEventListener('click', () => {
        renderResultTable(countServer++)
    });


    // формирование данных для таблицы

    function getDataForResultTable() {
        let ip = '';
        let supply = '';
        let power = `${document.querySelector("#power-range").value}Вт`;
        let port = `${document.querySelector('#port-range').value}Gb/s`;

        let type = calculatorForm.querySelector('.cost-calculate__unit_active') ?
            `${document.querySelector('#unit-range').value}U` : 'Tower'

        if (ip_count.value <= 1) {
            ip = `${1}IP`;
        } else {
            ip = `${ip_count.value}IP`;
        }
        if (checkbox_second_supply.checked) {
            supply = `${2}БП`;
        } else supply = `${1}БП`;

        return `${type} ${power} ${ip} ${port} ${supply}`
    }


//Функция обнулить значения калькулятора

    function getNullValueCalculator() {

        POWER = 0; UNIT = 0; IP = 0; PORT = 0; SUPPLY = 0;
        ip_count.value = '';

        ranges.forEach(range => {
            range.value = 0;
            const fill_range = range.previousElementSibling.querySelector('.fill')
            fill_range.style.width = `0%`

            const element_value = range.parentElement.previousElementSibling.querySelector('.value')
            const attribute = element_value.dataset.value;

            switch (attribute) {
                case 'Вт' :
                    element_value.innerHTML = '250 Вт'
                    break;
                case 'U' :
                    element_value.innerHTML = '1 U'
                    break;
                default :
                    element_value.innerHTML = '1 Gb/s'
            }
        })

        if (checkbox_second_supply.checked) {
            checkbox_second_supply.checked = false;
        }

        const unit_server = calculatorForm.querySelector('.cost-calculate__unit_active');


        if (checkBox_RUB.checked) {
            unit_server ? renderTotalCost((tableCostData['server'].toFixed(2) * currency_RUB).toFixed(2))
                : renderTotalCost((tableCostData['tower'].toFixed(2) * currency_RUB).toFixed(2))
        } else {
            unit_server ? renderTotalCost(tableCostData['server'].toFixed(2)) :
                renderTotalCost(tableCostData['tower'].toFixed(2))
        }

    }

// функция обнуления классов

    function removeActiveClasses() {
        let innerWidth = window.innerWidth;
        document.body.classList.remove('active-body');
        calculator_container.classList.remove('calculator__container_result-table');
        if(innerWidth <= 768){
            calculator_container.classList.remove('calculator__container_swipe');
            calculator_container.style.minHeight = `0px`
            calculator_container.style.top = `100%`
        }
        document.querySelector('.calculator__overlay').classList.remove('calculator__overlay_active')
        result_table.classList.remove('calculator__result-table_open');

        if (checkBox_RUB.checked) {
            checkBox_RUB.checked = false;
            checkBox_BYN.checked = true;
        }

        let result_table_cells = result_table_rows.querySelectorAll('.result-table__cell')
        if (result_table_cells.length > 0) {
            result_table_cells.forEach(cell => cell.remove())
        }
        changeDisabledStateForButton(false)
        getNullValueCalculator();
    }

    closeIcon.addEventListener('click', () => {
        removeActiveClasses();
        countServer = 1;
    } );
    swipe_button.addEventListener('swiped-down', () => {
        removeActiveClasses();
        countServer = 1;
    } );
    swipe_button.addEventListener('click', () => {
        removeActiveClasses();
        countServer = 1;
    } );
}

;

let stateHDD = {};
let stateRAM = {};
let stateCPU = {};
const TAX = 1.2; // 20% НДС

function getServers(servers) {
    renderCpu(servers)
}

function renderCpu(data) {
    let cpu_select = document.querySelector('.cpu__select');
    cpu_select.innerHTML += `<select name="select" id="select-cpu" class="select" >
        ${data.map(i => `<option value=${i.id['$']}>${i.name_ru['$']}</option>`).join('')}
        </select>`

    let cpu_model = document.querySelector('select')
    getCPUValue(cpu_model, data)

    cpu_model.addEventListener('change', () => {
        getCPUValue(cpu_model, data)
    })

    if(document.getElementById('first-open-body')){
        openAccordionService()
    }
}

function getCPUValue(cpu, data) {
    let cpu_data = data.filter(item => item.id['$'] === cpu.value)
    let cpu_name = cpu_data[0].name_ru['$']
    let price = Math.ceil((cpu_data.map(i => i.price.period[0]['$cost'])[0]) * TAX).toFixed(2)
    stateCPU[`cpu_select`] = {id: cpu.value, 'cpu_name': cpu_name, 'price': price}
    getAddons(cpu_data)

}


function getAddons(data) {
    let addons = data.map(addon => addon['addon']).flat(1)
    getRAMValue(addons)
    getHDDValue(addons)
    getResult()
}

function getRAMValue(data) {
    let id_addon = data.map(item => item['enumeration'][1]?.id['$'] === '14' && item.id['$']).filter(i => i)
    let addons = data.map(item => item['enumeration'][1]).filter(i => i)
    let RAM = addons.filter(item => item.id['$'] === '14').map(item => item['enumerationitem'])
    RAM.map((i, index) => {
        let name = 'ram_radio';
        let value = i[0].id['$'];
        let data = id_addon[index];
        let label = i[0]['name_ru']['$'];
        let price = i[0].price['period'][0]['$cost']

        changeState(value, name, data, label, price)
    })

    renderRAM(RAM, id_addon)

}


function getHDDValue(data) {
    let id_addon = data.map(item => item['enumeration'][1]?.id['$'] === '11' && item.id['$']).filter(i => i)
    let addons = data.map(item => item['enumeration'][1]).filter(i => i)
    let HDD = addons.filter(item => item.id['$'] === '11').map(item => item['enumerationitem'])

    HDD.map((i, index) => {
        let name = `hdd${index + 1}_radio`;
        let value = i[0].id['$'];
        let data = id_addon[index];
        let label = i[0]['name_ru']['$'];
        let price = i[0].price['period'][0]['$cost']
        changeState(value, name, data, label, price)
    })

    renderHDD(HDD, id_addon)

}


function changeState(value, name_radio, data, label, price) {

    let cost = parseFloat(price * TAX).toFixed(2)
    name_radio === 'ram_radio' ?
        stateRAM[name_radio] = {ram: value, id: data, label: label, 'price': cost}
        :
        stateHDD[name_radio] = {hdd: value, id: data, label: label, 'price': cost}
    getResult()
}


function renderRAM(data, id) {
    let ram_container = document.querySelector('.ram__container');
    if (ram_container.childElementCount > 0) {
        ram_container.innerHTML = ''
    }

    data.forEach((i, index) =>
        ram_container.innerHTML +=
            `<p class="configurator__subtitle">Оперативная память</p>
                 <div class="ram__radio">
                       ${data[index].map(item =>
                            `<label class="radio__btn" for="ram${item.id['$']}_radio" >
                                <input type="radio" 
                                       name="ram_radio" 
                                       value=${item.id['$']} 
                                       id="ram${item.id['$']}_radio"
                                       data-text='${item.name_ru['$']}' 
                                       data-value="${id[index]}"
                                       ${stateRAM[`ram_radio`].ram === item.id['$'] ? 'checked' : ""}
                                       onchange="changeState(this.value, this.name, dataset.value, dataset.text, ${item.price.period[0]['$cost']} )"  />
                                <div class="radio__text">${item.name_ru['$']}</div>
                            </label>`).join('')}
                 </div>`
    )
}

function renderHDD(data, id) {
    const showPerClick = 4;
    let hdd_container = document.querySelector('.hdd__container');
    let show_more_btn = document.querySelector('.button-show-more')

    if (hdd_container.childElementCount > 0) {
        hdd_container.innerHTML = ''
    }

    if (data.length <= 2) {
        show_more_btn.style.display = 'none'
    } else show_more_btn.style.display = 'inline-block'

    let firstHDD = data.slice(0, 2)
    let lastHDD = data.slice(2, data.length)


    if (data.length <= 2) {
        data.forEach((i, index) =>
            hdd_container.innerHTML +=
                `<p class="configurator__subtitle">Выбрать жесткий диск ${index + 1}</p>
                  <div class="hdd__radio">
                       ${data[index].map(item =>
                            `<label class="radio__btn" for="hdd${item.id['$']}${index + 1}_radio" >
                                    <input type="radio" 
                                           name="hdd${index + 1}_radio" 
                                           value=${item.id['$']} 
                                           id="hdd${item.id['$']}${index + 1}_radio"
                                           data-text='${item.name_ru['$']}'
                                           data-value="${id[index]}"
                                           ${stateHDD[`hdd${index + 1}_radio`].hdd === item.id['$'] ? 'checked' : ""}
                                            onchange="changeState(this.value, this.name, dataset.value, dataset.text, ${item.price.period[0]['$cost']})" />
                                    <div class="radio__text">${item.name_ru['$']}</div>
                            </label>`).join('')}
                        </div>`
        )
    } else {
        firstHDD.forEach((i, index) => hdd_container.innerHTML +=
            `<p class="configurator__subtitle">Выбрать жесткий диск ${index + 1}</p>
                    <div class="hdd__radio">
                        ${firstHDD[index].map(item =>
                            `<label class="radio__btn" for="hdd${item.id['$']}${index + 1}_radio" >
                                 <input type="radio" 
                                        name="hdd${index + 1}_radio" 
                                        value=${item.id['$']} 
                                        id="hdd${item.id['$']}${index + 1}_radio"
                                        data-text='${item.name_ru['$']}' 
                                        data-value='${id[index + 1]}' 
                                        ${stateHDD[`hdd${index + 1}_radio`].hdd === item.id['$'] ? 'checked' : ""}
                                        onchange="changeState(this.value, this.name, dataset.value, dataset.text, ${item.price.period[0]['$cost']})" />
                                 <div class="radio__text">${item.name_ru['$']}</div>
                            </label>`).join('')}
                    </div>`)

        lastHDD.forEach((i, index) => hdd_container.innerHTML +=
                    `<p class="visible configurator__subtitle">Выбрать жесткий диск ${index + 3}</p>
                    <div class="visible">
                        ${lastHDD[index].map(item =>
                            `<label class="radio__btn" for="hdd${item.id['$']}${index + 3}_radio" >
                                 <input type="radio" 
                                        name="hdd${index + 3}_radio" 
                                        value=${item.id['$']} 
                                        id="hdd${item.id['$']}${index + 3}_radio"
                                        data-text='${item.name_ru['$']}' 
                                        data-value='${id[index + 3]}' 
                                        ${stateHDD[`hdd${index + 3}_radio`].hdd === item.id['$'] ? 'checked' : ""}
                                        onchange="changeState(this.value, this.name, dataset.value, dataset.text, ${item.price.period[0]['$cost']})" />
                                 <div class="radio__text">${item.name_ru['$']}</div>
                            </label>`).join('')}
                    </div>`)
    }


    if (document.querySelectorAll('.visible')) {
        show_more_btn.addEventListener('click', function () {
            let hidden = document.querySelectorAll('.visible')
            for (let i = 0; i < showPerClick; i++) {
                hidden[i].classList.add('hdd__radio');
                hidden[i].classList.remove('visible');
            }
            let box = document.querySelectorAll('div.hdd__radio')
            if (box.length === Object.keys(stateHDD).length) {
                show_more_btn.style.display = 'none'
            }

        })
    }


}

function getResult() {

    const result = document.querySelector('.result__server')
    const result_cost = document.querySelector('.result__cost')

    const cpu = Object.keys(stateCPU).map(i => stateCPU[i].cpu_name)
    const ram = Object.keys(stateRAM).map(i => stateRAM[i].label)
    const hdd = Object.keys(stateHDD).map(i => stateHDD[i].label)

    const cpu_price = Object.keys(stateCPU).map(i => Number(stateCPU[i].price))[0]
    const ram_price = Object.keys(stateRAM).map(i => Number(stateRAM[i].price))[0]
    const hdd_price = Object.keys(stateHDD).map(i => Number(stateHDD[i].price))





    let sumOfHdd = hdd_price.reduce((sum, current) => sum + current, 0)

    let totalSum =  (cpu_price + ram_price  + sumOfHdd).toFixed(2)

    result_cost.innerHTML = `${totalSum}&nbsp<span>BYN/мес</span>`

    result.innerHTML =
        `<div class = 'server__config'>
            <div class ='config-cpu'>${cpu}</div>
        ${ram.length ? `<div class = 'config-ram'>Оперативная память - ${ram}</div>` : ''}
            ${hdd.map((i, index) => i === 'Без диска' ? null :
            `<p class = 'config-hdd'>Диск ${index + 1} - ${i}</p>`).join('')}
        </div>`

}


if(document.querySelector('.result__btn')){
    document.querySelector('.result__btn').addEventListener('click', function () {
        const strCpu = Object.keys(stateCPU).map(i => stateCPU[i].id)
        const strHdd = Object.keys(stateHDD).map(i => `26addon_${stateHDD[i].id}%3D${stateHDD[i].hdd}`).join('%')
        const strRam = Object.keys(stateRAM).map(i => `26addon_${stateRAM[i].id}%3D${stateRAM[i].ram}`).join('%')
        window.open(`https://my.datahata.by/billmgr?func=register&redirect=startpage%3Ddedic%26startform%3Dquickorder%26pricelist%3D${strCpu}%26period%3D1%26project%3D1%${strHdd}%${strRam}%26redirect%3Dbasket`, '_blank')
    })
}





























;


    const tables = document.querySelectorAll('.table__body_loading');
    tables.forEach(table => {
        const loader = document.createElement('img');
        loader.src = 'img/loader/loader.gif';
        loader.alt = 'loader';
        if (table.classList.contains('table__body_dedicated')) {
            table.querySelector('.configurator').style.display = 'none'
        }
        table.style.alignItems = 'center'
        table.append(loader);
        if (document.querySelectorAll('.service__button')) {
            document.querySelectorAll('.service__button').forEach(btn => btn.classList.add('button_disabled'))
        }

        if (document.querySelectorAll('.button__arrow')) {
            document.querySelectorAll('.button__arrow').forEach(btn => btn.classList.add('button__arrow_disabled'))
        }

        getData(function (data) {
            if (data) {
                if (table.classList.contains('table__body_dedicated')) {
                    table.querySelector('.configurator').style.display = 'flex'
                }
                table.style.alignItems = 'stretch';

                if (table.contains(loader)) {
                    table.removeChild(loader);
                }
                if (document.querySelectorAll('.service__button')) {
                    document.querySelectorAll('.service__button').forEach(btn => btn.classList.remove('button_disabled'))
                }

                if (document.querySelectorAll('.button__arrow')) {
                    document.querySelectorAll('.button__arrow').forEach(btn => btn.classList.remove('button__arrow_disabled'))
                }

                if (document.querySelector('.all-services__accordion')) {
                    openAccordionService()
                }


            }
        });
    })


    const domain = document.getElementById('domain')
    const ssl = document.getElementById('ssl')
    const backup = document.getElementById('backup')
    const soft = document.getElementById('soft')


    function getOtherServicesData(sslType, domainType, backUpType) {
        if (ssl) {
            renderData(sslType, ssl)
        }
        if (domain) {
            renderData(domainType, domain)
        }
        if (backup) {
            renderData(backUpType, backup)
        }
    }

    function getSoftData(softType) {
        if (soft) {
            renderData(softType, soft)
        }
    }


    function renderData(data, elem) {
        switch (elem) {
            case backup:
                data.length ? backup.innerHTML = `${data.map(i => `<div class="table__row"> 
                    <p class="text">${i.name_ru['$']} (за 1 ГБ) </p>
                    <p class ='price'>${((i.addon[0].price.period[0]['$cost']) * 1.2).toFixed(2)} BYN/мес</p>
        </div>`).join('')}` : backup.innerHTML = ''
                break;
            case ssl :
                data.length ? ssl.innerHTML = `${data.map(i => `<div class="table__row"> 
                    <p class="text">${i.name_ru['$']}</p>
                    <p class="description">${i.description_markdown_ru['$']}</p>
                    <p class ='price'>${Math.ceil((i.price.period['$cost']) * 1.2).toFixed(2)} BYN/год</p>
        </div>`).join('')}` : ssl.innerHTML = ''
                break;
            case domain:
                data.length ? domain.innerHTML = `${data.map(i => `<div class="table__row"> 
                    <p class="text">${i.name_ru['$']}</p>
                    <p class ='price'>${Math.ceil((i.price.period[1]['$cost']) * 1.2).toFixed(2)} BYN/год</p>
        </div>`).join('')}` : domain.innerHTML = ''
                break;
            case soft:
                data.length ? soft.innerHTML = `${data.map(i => `<div class="table__row"> 
                    <p class="text">${i.name_ru['$']}</p>
                    <p class ='price'>${Math.ceil((i.price.period[0]['$cost']) * 1.2).toFixed(2)} BYN/мес</p>
        </div>`).join('')}` : soft.innerHTML = ''
                break;
            default:
                return
        }


    }


;

async function getData(callback) {
    const url = `https://my.datahata.by/billmgr?func=pricelist.export&elid=1&out=json&onlyavailable=on`;
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        let typeOfService = data.doc.pricelist
        let servers = typeOfService.filter(i => i.itemtype['$'] === '21')
        let soft = typeOfService.filter(i => i.itemtype['$'] === '40')
        let ssl = typeOfService.filter(i => i.itemtype['$'] === '48')
        let domain = typeOfService.filter(i => i.itemtype['$'] === '49')
        let back_up = typeOfService.filter(i => i.itemtype['$'] === '66')

        callback(data)

        if (document.getElementById("server-page")) {
            getServers(servers)

        } else if (document.getElementById("other-page")) {
            getOtherServicesData(ssl, domain, back_up)

        } else if(document.getElementById('soft-page')){
            getSoftData(soft);
        }

    } else {
        alert('error')
    }

    if(document.querySelector('.all-services__accordion')){
        openAccordionService()
    }

}






;
/*!
 * swiped-events.js - v1.1.6
 * Pure JavaScript swipe events
 * https://github.com/john-doherty/swiped-events
 * @inspiration https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
!function(t,e){"use strict";"function"!=typeof t.CustomEvent&&(t.CustomEvent=function(t,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var a=e.createEvent("CustomEvent");return a.initCustomEvent(t,n.bubbles,n.cancelable,n.detail),a},t.CustomEvent.prototype=t.Event.prototype),e.addEventListener("touchstart",function(t){if("true"===t.target.getAttribute("data-swipe-ignore"))return;s=t.target,r=Date.now(),n=t.touches[0].clientX,a=t.touches[0].clientY,u=0,i=0},!1),e.addEventListener("touchmove",function(t){if(!n||!a)return;var e=t.touches[0].clientX,r=t.touches[0].clientY;u=n-e,i=a-r},!1),e.addEventListener("touchend",function(t){if(s!==t.target)return;var e=parseInt(l(s,"data-swipe-threshold","20"),10),o=parseInt(l(s,"data-swipe-timeout","500"),10),c=Date.now()-r,d="",p=t.changedTouches||t.touches||[];Math.abs(u)>Math.abs(i)?Math.abs(u)>e&&c<o&&(d=u>0?"swiped-left":"swiped-right"):Math.abs(i)>e&&c<o&&(d=i>0?"swiped-up":"swiped-down");if(""!==d){var b={dir:d.replace(/swiped-/,""),touchType:(p[0]||{}).touchType||"direct",xStart:parseInt(n,10),xEnd:parseInt((p[0]||{}).clientX||-1,10),yStart:parseInt(a,10),yEnd:parseInt((p[0]||{}).clientY||-1,10)};s.dispatchEvent(new CustomEvent("swiped",{bubbles:!0,cancelable:!0,detail:b})),s.dispatchEvent(new CustomEvent(d,{bubbles:!0,cancelable:!0,detail:b}))}n=null,a=null,r=null},!1);var n=null,a=null,u=null,i=null,r=null,s=null;function l(t,n,a){for(;t&&t!==e.documentElement;){var u=t.getAttribute(n);if(u)return u;t=t.parentNode}return a}}(window,document);;







