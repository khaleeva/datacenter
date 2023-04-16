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
        } else if (document.getElementById("other-page")) {
            getOtherServices(sslType, domainType, backUpType)
        } else if(document.getElementById('soft-page')){
            getSoftServices(softType);
            openAccordionService();
        }

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






