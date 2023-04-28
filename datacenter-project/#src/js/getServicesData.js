
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






