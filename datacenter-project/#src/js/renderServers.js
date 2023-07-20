
let stateHDD = {};
let stateRAM = {};
let stateCPU = {};
const TAX = 1.2; // 20% НДС

function getServers(servers) {
    renderCpu(servers)
};

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
};

function getCPUValue(cpu, data) {
    let cpu_data = data.filter(item => item.id['$'] === cpu.value)
    let cpu_name = cpu_data[0].name_ru['$']
    let price = Math.ceil((cpu_data.map(i => i.price.period[0]['$cost'])[0]) * TAX).toFixed(2)
    stateCPU[`cpu_select`] = {id: cpu.value, 'cpu_name': cpu_name, 'price': price}
    stateRAM = {}
    stateHDD = {}
    getAddons(cpu_data)

};


function getAddons(data) {
    let addons = data.map(addon => addon['addon']).flat(1)
    getRAMValue(addons)
    getHDDValue(addons)
    getResult()
};

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

};


function getHDDValue(data) {
    let id_addon = data.map(item => item['enumeration'][1]?.id['$'] === '11' && item.id['$']).filter(i => i)
    let addons = data.map(item => item['enumeration'][1]).filter(i => i)
    let HDD = addons.filter(item => item.id['$'] === '11').map(item => item['enumerationitem'])
    console.log(HDD, 'HDD')
    HDD.map((i, index) => {
        let name = `hdd${index + 1}_radio`;
        let value = i[0].id['$'];
        let data = id_addon[index];
        let label = i[0]['name_ru']['$'];
        let price = i[0].price['period'][0]['$cost']
        changeState(value, name, data, label, price)
    })

    renderHDD(HDD, id_addon)

};


function changeState(value, name_radio, data, label, price) {

    let cost = parseFloat(price * TAX).toFixed(2)
    name_radio === 'ram_radio' ?
        stateRAM[name_radio] = {ram: value, id: data, label: label, 'price': cost}
        :
        stateHDD[name_radio] = {hdd: value, id: data, label: label, 'price': cost}
    getResult()
};


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
};

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

};

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

};


if(document.querySelector('.result__btn')){
    document.querySelector('.result__btn').addEventListener('click', function () {
        const strCpu = Object.keys(stateCPU).map(i => stateCPU[i].id)
        const strHdd = Object.keys(stateHDD).map(i => `26addon_${stateHDD[i].id}%3D${stateHDD[i].hdd}`).join('%')
        const strRam = Object.keys(stateRAM).map(i => `26addon_${stateRAM[i].id}%3D${stateRAM[i].ram}`).join('%')
        window.open(`https://my.datahata.by/billmgr?func=register&redirect=startpage%3Ddedic%26startform%3Dquickorder%26pricelist%3D${strCpu}%26period%3D1%26project%3D1%${strHdd}%${strRam}%26redirect%3Dbasket`, '_blank')
    })
};





























