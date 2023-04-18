

// let hddContainer = document.querySelector('.hdd');
// let ramContainer = document.querySelector('.ram');



// let resultServer = document.querySelector('.result-order');
// let constructor = document.querySelector('.constructor');
// let bucketBtn = document.querySelector(`#bucket-btn`);
// let config = document.querySelector('.config-server');
// let price = document.querySelector('.server-price');
// let showMore_btn = document.querySelector('.showMore');
// const formElement = document.getElementById('order-form');


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
}

function getCPUValue(cpu, data) {
    let cpu_data = data.filter(item => item.id['$'] === cpu.value)
    let cpu_name = cpu_data[0].name_ru['$']
    let price = Math.ceil((cpu_data.map(i => i.price.period[0]['$cost'])[0]) * 1.2)
    stateCPU[`cpu_select`] = {id: cpu.value, 'cpu_name': cpu_name, 'price': price}
    getAddons(cpu_data)

}


function getAddons(data) {
    let addons = data.map(addon => addon['addon']).flat(1)
    getRAMValue(addons)
    getHDDValue(addons)
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

    let cost = Math.ceil(price) * TAX
    name_radio === 'ram_radio' ?
        stateRAM[name_radio] = {ram: value, id: data, label: label, 'price': cost}
        :
        stateHDD[name_radio] = {hdd: value, id: data, label: label, 'price': cost}

}


function renderRAM(data, id) {
    let ram_container = document.querySelector('.ram__container');
    if (ram_container.childElementCount > 0) {
        ram_container.innerHTML = ''
    }

    data.forEach((i, index) =>
        ram_container.innerHTML +=
            `<p class="ram__title">Оперативная память</p>
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
                `<p class="ram__title">Выбрать жесткий диск ${index + 1}</p>
                  <div class="box">
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
                            </label>`).join('')},
                        </div>`
        )
    } else {
        firstHDD.forEach((i, index) => hdd_container.innerHTML +=
            `<p class="ram__title">Выбрать жесткий диск ${index + 1}</p>
                    <div class="box">
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
                    `<p class="visible ram__title">Выбрать жесткий диск ${index + 3}</p>
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
                hidden[i].classList.add('box');
                hidden[i].classList.remove('visible');
            }
            let box = document.querySelectorAll('div.box')
            if (box.length === Object.keys(stateHDD).length) {
                show_more_btn.style.display = 'none'
            }

        })
    }


}






























