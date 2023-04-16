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
    data.length ? elem.innerHTML = `${data.map(i => ` <div class="table__row"" >
 ${elem===backup ? `<p class="text">${i.name_ru['$']} (за 1 ГБ) </p>` : `<p class="text">${i.name_ru['$']}</p>`}
                                   
                                    ${elem === ssl ? `<div class="ssl-description">?<div class="ssl-text-description">${i.description_ru['$']}</div></div>` : ''}
                                    
                                    ${elem===ssl ? `<p class ='price'>${Math.ceil((i.price.period['$cost']) * 1.2).toFixed(2)} BYN/год</p>`: ''}
                                    ${elem===domain ? `<p class ='price'>${Math.ceil((i.price.period[1]['$cost']) * 1.2).toFixed(2)} BYN/год</p>`: ''}
                                    ${elem===backup ? `<p class ='price'>${((i.addon[0].price.period[0]['$cost']) * 1.2).toFixed(2)} BYN/мес</p>`: ''}
                                    ${elem===soft ? `<p class ='price'>${Math.ceil((i.price.period[0]['$cost']) * 1.2).toFixed(2)} BYN/мес</p>`: ``}
         
                                   
                                    
                                    
                                </div>`).join('')}` : elem.closest('.accordion-section-services').style.display = 'none'

    openAccordionService()
}



