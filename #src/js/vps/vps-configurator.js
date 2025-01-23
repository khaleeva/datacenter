class VpsConfigurator {
    constructor() {
        this.input_range = new InputRange()
        this.tariffCard = new TariffCard()
        this.vps_state = {};
        this.baseSum = 0;
        this.vps_order_url = "";
    }

    render(data) {
        this.typeRangeData = this.getDataForRange(data.vps_addons)
        this.typeSelectData = this.getDataSelectForTabs(data.vps_addons)
        this.typeBooleanData = this.getDataBooleanForTabs(data.vps_addons)
        this.dataForOS = data.vps.itemtypeparam.find(
            (i) => i.id["$"] === "106",
        ).itemtypeparamvalue;


        this.typeRangeData.map((addon) => {
            this.initValue({
                name: getVPSAddonName[addon.id["$"]],
                id: addon.id["$"],
                value: this.input_range.getMinValue(addon.name_ru["$"], addon.addonmin["$"]),
                price: 0
            })
        })

        this.typeBooleanData.forEach((addon) => {
            this.initValue({name: "support", id: addon.id["$"], value: "off", price: 0});
        });

        this.initValue({name: "os", id: this.dataForOS[0].intname["$"], value: 0, price: 0});

        this.initValue({name: "servers", id: data.vps.id["$"], value: 1, price: 0});

        this.typeSelectData.forEach((addon) => {
            addon.enumeration[1].enumerationitem.forEach((d) => {
                if (addon.id["$"] === "2198") {
                    this.initValue({name: addon.intname["$"], id: "111", value: "off", price: 0});
                } else {
                    this.initValue(
                        {
                            name: addon.intname["$"],
                            id: d.id["$"],
                            value: "on",
                            price: Number(d.price.period[0]["$cost"])
                        })

                }
            });
        });


        console.log(this.vps_state)

    }


    initValue({name, id, value, price}) {
        this.vps_state[name] = {
            name,
            id,
            price,
            value,
        };

        this.params = this.tariffCard.generateUrlParams(Object.values(this.vps_state));
        this.vps_order_url = `${this.tariffCard.url}${this.params}`;
    }

    getDataForRange(addons) {
        return addons.filter(
            (addon) =>
                addon.addontype["$"] === "2" &&
                addon.billtype["$"] === "2" &&
                addon.id["$"] !== "2210",
        );
    }

    getDataSelectForTabs(addons) {
        return addons.filter(
            (addon) => addon.addontype["$"] === "3" && addon.id["$"] !== "2195",
        );
    }

    getDataBooleanForTabs(addons) {
        return addons.filter(
            (addon) =>
                addon.addontype["$"] === "1" ||
                addon.id["$"] === "2225" ||
                addon.id["$"] === "2195",
        );
    }
}