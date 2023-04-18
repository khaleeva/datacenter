
// const formOther = document.querySelector('.form-other-container')
// let state = {}




    const tables = document.querySelectorAll('.table__body_loading');
    tables.forEach(table => {
        const loader = document.createElement('img');
        loader.src = 'img/loader/loader.gif';
        if(table.classList.contains('table__body_dedicated')){
            table.querySelector('.configurator').style.display = 'none'
        }
        table.style.alignItems = 'center'
        table.append(loader);
        if(document.querySelectorAll('.service__button')){
            document.querySelectorAll('.service__button').forEach(btn => btn.classList.add('button_disabled'))
        }

        getData(function(data) {
            if (data) {
                if(table.classList.contains('table__body_dedicated')){
                    table.querySelector('.configurator').style.display = 'flex'
                }
                table.style.alignItems = 'stretch';
                if (table.contains(loader)) {
                    table.removeChild(loader);
                }
                if(document.querySelectorAll('.service__button')){
                    document.querySelectorAll('.service__button').forEach(btn => btn.classList.remove('button_disabled'))
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
       renderData(softType,soft)
    }
}



function renderData(data, elem) {
    switch (elem){
        case backup: data.length ? backup.innerHTML = `${data.map(i => `<div class="table__row"> 
                    <p class="text">${i.name_ru['$']} (за 1 ГБ) </p>
                    <p class ='price'>${((i.addon[0].price.period[0]['$cost']) * 1.2).toFixed(2)} BYN/мес</p>
        </div>`).join('')}` : backup.innerHTML = ''
            break;
        case ssl : data.length ? ssl.innerHTML = `${data.map(i => `<div class="table__row"> 
                    <p class="text">${i.name_ru['$']}</p>
                    <p class="description">${i.description_markdown_ru['$']}</p>
                    <p class ='price'>${Math.ceil((i.price.period['$cost']) * 1.2).toFixed(2)} BYN/год</p>
        </div>`).join('')}` : ssl.innerHTML = ''
            break;
        case domain: data.length ? domain.innerHTML = `${data.map(i => `<div class="table__row"> 
                    <p class="text">${i.name_ru['$']}</p>
                    <p class ='price'>${Math.ceil((i.price.period[1]['$cost']) * 1.2).toFixed(2)} BYN/год</p>
        </div>`).join('')}` : domain.innerHTML = ''
            break;
        case soft: data.length ? soft.innerHTML = `${data.map(i => `<div class="table__row"> 
                    <p class="text">${i.name_ru['$']}</p>
                    <p class ='price'>${Math.ceil((i.price.period[0]['$cost']) * 1.2).toFixed(2)} BYN/мес</p>
        </div>`).join('')}`: soft.innerHTML = ''
            break;
        default: return
    }
    if(document.getElementById('first-open-body')){
        openAccordionService()
    }



}



