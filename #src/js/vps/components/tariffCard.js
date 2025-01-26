class TariffCard {
    constructor() {
        this.URL = "https://my.datahata.by?func=register&redirect=startpage%3Dvds%26startform%3Dvds%252Eorder%252Eparam%26pricelist%3D2187%26period%3D1%26project%3D1%";
        this.addons_data = [
            {id: "2189", name: 'ram', measure: 'Гб'},
            {id: "2191", name: 'ip4', measure: 'Шт'},
            {id: "2192", name: 'cpu', measure: 'Шт'},
            {id: "2194", name: 'space', measure: 'Гб'},
            {id: "2211", name: 'backup', measure: 'Гб'},
            {id: "2190", name: 'panel', measure: ''},
            {id: "2197", name: 'ipv6', measure: ''},
            {id: "2225", name: 'support', measure: ''},
            {id: "2198", name: 'ipv6subnet_prefix', measure: ''},
        ]
    }


    draw({data, type, color_icon}) {
        this.tariffCardData = this.generateTariffCharacteristic({data, type, color_icon})

        this.link_url = `${this.URL}${this.tariffCardData.params}`

        this.characteristics = this.tariffCardData.state
            .map(
                (s) => {
                    if (s.value) {
                        return `<div>${s.value === 'off' ? "" : s.icon}
                        <div>
                            <p>${typeof s.value === "string" ? "" : s.value}&nbsp;${s.measure}</p>
                            <p>${s.value === 'off' ? "" : s.name_ru}</p>
                        </div>
                    </div>`
                    }
                }
            )
            .join("");

        return `
            <div class="tariff__card-detail">
            <div class="tariff__card-cost">
             <p><span>${this.tariffCardData.totalCost}</span>&nbsp;BYN</p>
                <p style="color: ${type === "black" ? "rgba(0, 0, 0, 0.30)" : "rgba(255, 255, 255, 0.30)"}">за месяц</p>
            </div>
            <div class="tariff__card-characteristics">${this.characteristics}</div>
                <button class='custom-button-brand ${type === "black" ? "custom-button-brand_brand-outlined" : "custom-button-brand_brand-shadow"}' style="margin-top: auto; height: 48px;" onclick="window.open('${this.link_url}', '_blank');">Заказать</button>
            </div>
          `;

    }


    generateTariffCharacteristic({data, type, color_icon}) {
        this.state = this.createState({addons: data.vps.addons, value: tariff_values[type], color_icon})
        this.params = this.generateUrlParams(this.state)
        this.totalCost = this.getTotalCost({base_cost: data.vps.baseCost, state: this.state, quantity: 1})
        return {state: this.state, params: this.params, totalCost: this.totalCost}
    }

    findAddon(id, addons) {
        this.current_addon = addons.find((d) => d.id["$"] === id);

        return {
            name: this.current_addon.name_ru["$"] ? this.current_addon.name_ru["$"] : '',
            min_value: this.current_addon.addonmin['$'] ? +this.current_addon.addonmin["$"] : 0,
            step: this.current_addon.addonstep["$"] ? +this.current_addon.addonstep["$"] : 0,
            cost: this.current_addon.price ? +this.current_addon.price.period[0]["$cost"] : +this.current_addon.enumeration[1].enumerationitem[1].price.period[0]["$cost"],
        }
    }


    getColorIcon(color) {
        return color === "black" ? check_icon : check_icon_white
    }

    getTotalCost({state, base_cost, quantity}) {
        this.total = 0;
        for (let key in state) {
            if (state[key].price) {
                this.total += state[key].price;
            }
        }

        return ((this.total + base_cost) * 1.2 * quantity).toFixed(2);
    }


    getPriceForAddon({value, min, step, cost}) {

        if (value === 'off') {
            return 0
        }

        if (value === 'on') {
            return cost
        }

        this.additionalSteps = Math.floor((value - min) / step);
        this.calculatedPrice = this.additionalSteps * cost;
        return +this.calculatedPrice.toFixed(2);
    }

    createState({addons, value, color_icon}) {

        this.os = {
            name_ru: "Операционная система",
            name: "os",
            id: "VM6_ISPsystem_Windows-10-RUS",
            price: 0,
            value: 0,
            measure: "",
            icon: this.icon
        }

        this.state = this.addons_data.map((addon) => {
            this.addon = this.findAddon(addon.id, addons);
            this.price = this.getPriceForAddon(
                {
                    value: addon.name === 'backup' ? value[addon.name] + 10 : value[addon.name],
                    min: this.addon.min_value,
                    step: this.addon.step,
                    cost: this.addon.cost,
                }
            )
            this.icon = this.getColorIcon(color_icon)


            this.panel_id = value['panel'] === "off" ? "111" : "110"


            return {
                name_ru: addon.name === 'backup' ? 'для резервного копирования' : this.addon.name,
                name: addon.name,
                id: addon.name === 'panel' ? this.panel_id : addon.id,
                price: this.price,
                value: value[addon.name],
                icon: this.icon,
                measure: addon.measure
            }
        })


        return [...this.state, this.os]
    }

    generateUrlParams(state) {

        this.params = state.map((s) => {
            this.param = ''
            if (s.name === 'backup') {
                this.param = s ? s.value === 0
                        ? `26addon_2208%3D2210`
                        : `26addon_2208%3D${s.id}%26addon_${s.id}%3D${s.value}`
                    : "";
            } else if (s.name === 'ipv6subnet_prefix') {
                this.param = s.id === '2198' ? `26addon_2198%3D111` : `26addon_2198%3D${s.id}`

            } else if (s.name === 'panel') {
                this.param = s ? `26addon_2190%3D${s.id}` : "";
            } else if (s.name === 'servers') {
                this.param = s
                    ? `26order_count%3D${s.value}`
                    : "";
            } else if (s.name === 'os') {
                this.param = s ? `26ostempl%3D${s.id}` : ""
            } else {
                this.param = s ? `26addon_${s.id}%3D${s.value}` : ""
            }
            return this.param
        })
        return this.params.join('%')
    }
}

