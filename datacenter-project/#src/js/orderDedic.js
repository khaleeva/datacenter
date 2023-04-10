
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













































