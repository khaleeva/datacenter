class ApiService {
    constructor() {
        this.FETCH_URL = 'https://my.datahata.by/billmgr?func=pricelist.export&elid=1&out=json&onlyavailable=on';
    }


    async getData() {
        try {
            const response = await fetch(`${this.FETCH_URL}`);
            const data = await response.json();
            if (data) {
                const typeOfService = data.doc.pricelist;
                const vps = typeOfService.filter((i) => i.itemtype["$"] === "3");
                const vps_addons = vps[0].addon;
                const vps_cost = Number(vps[0].price.period[0]["$cost"]);

                const vlan = typeOfService.filter((i) => i.itemtype["$"] === "66192");
                const vlan_addons = vlan[0].addon;
                const vlan_cost = Number(vlan[0].price.period[0]["$cost"]);

                return {
                    vps: {addons: vps_addons, baseCost: vps_cost, configuration: vps[0]},
                    vlan: {addons: vlan_addons, baseCost: vlan_cost, configuration: vps[0]}
                }
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

