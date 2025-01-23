class TariffCard {
    constructor() {
        this.url = "https://my.datahata.by?func=register&redirect=startpage%3Dvds%26startform%3Dvds%252Eorder%252Eparam%26pricelist%3D2187%26period%3D1%26project%3D1%";
    }


    draw({data, type, color_icon}) {
        this.tariffCardData = this.generateTariffCharacteristic({data, type, color_icon})

        this.link_url = `${this.url}${this.tariffCardData.params}`

        this.characteristics = Object.values(this.tariffCardData.state)
            .map(
                (s) => {
                    if (s.value) {
                        return `<div>${s.value === 'off' ? "" : s.icon}
                        <div>
                            <p>${typeof s.value === "string" ? "" : s.value}${s.measure}</p>
                            <p>${s.value === 'off' ? "" : s.name}</p>
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
        this.state = this.createStateObject({addons: data.vps_addons, value: tariff_values[type], color_icon})
        this.params = this.generateUrlParams(this.state)
        this.totalCost = this.getTotalTariffCost({base_cost: data.vps_cost, state: this.state})
        return {state: this.state, params: this.params, totalCost: this.totalCost}
    }

    findAddon(id, addons) {
        return addons.find((d) => d.id["$"] === id);
        // this.current_addon = addons.find((d) => d.id["$"] === id);
        // return {
        //     name: this.current_addon.name_ru["$"],
        //     min_value: +this.current_addon.addonmin["$"],
        //     step: +this.current_addon.addonstep["$"],
        //     cost: +this.current_addon.price.period[0]["$cost"] || +this.current_addon.enumeration[1].enumerationitem[1].price,
        //
        // }
    }

    getPriceForAddon(value, min, step, price) {
        this.additionalSteps = Math.floor((value - min) / step);
        this.calculatedPrice = this.additionalSteps * price;
        return +Number(this.calculatedPrice).toFixed(2);
    }

    getColorIcon(color) {
        return color === "black" ? check_icon : check_icon_white
    }

    getTotalTariffCost({base_cost, state}) {
        this.total = 0;
        for (let key in state) {
            if (state[key].price) {
                this.total += state[key].price;
            }
        }
        return ((this.total + base_cost) * 1.2).toFixed(2);
    }

    createStateObject({addons, value, color_icon}) {
        return {
            ram: {
                name: this.findAddon("2189", addons).name,
                id: "2189",
                price: this.getPriceForAddon(
                    value.ram,
                    +this.findAddon("2189", addons).addonmin["$"],
                    +this.findAddon("2189", addons).addonstep["$"],
                    this.findAddon("2189", addons).price.period[0]["$cost"],
                ),
                value: value.ram,
                measure: "ГБ",
                icon: this.getColorIcon(color_icon),
            },
            ip4: {
                name: this.findAddon("2191", addons).name_ru["$"],
                id: "2191",
                price: this.getPriceForAddon(
                    value.ip4,
                    +this.findAddon("2191", addons).addonmin["$"],
                    +this.findAddon("2191", addons).addonstep["$"],
                    this.findAddon("2191", addons).price.period[0]["$cost"],
                ),
                value: value.ip4,
                measure: "Шт",
                icon: this.getColorIcon(color_icon),
            },
            cpu: {
                name: this.findAddon("2192", addons).name_ru["$"],
                id: "2192",
                price: this.getPriceForAddon(
                    value.cpu,
                    +this.findAddon("2192", addons).addonmin["$"],
                    +this.findAddon("2192", addons).addonstep["$"],
                    this.findAddon("2192", addons).price.period[0]["$cost"],
                ),
                value: value.cpu,
                measure: "Шт",
                icon: this.getColorIcon(color_icon),
            },
            space: {
                name: this.findAddon("2194", addons).name_ru["$"],
                id: "2194",
                price: this.getPriceForAddon(
                    value.space,
                    +this.findAddon("2194", addons).addonmin["$"],
                    +this.findAddon("2194", addons).addonstep["$"],
                    this.findAddon("2194", addons).price.period[0]["$cost"],
                ),
                value: value.space,
                measure: "ГБ",
                icon: this.getColorIcon(color_icon),
            },
            backup: {
                name: "",
                id: "2211",
                price: this.getPriceForAddon(
                    value.backup + 10,
                    +this.findAddon("2211", addons).addonmin["$"],
                    +this.findAddon("2211", addons).addonstep["$"],
                    this.findAddon("2211", addons).price.period[0]["$cost"],
                ),
                value: value.backup,
                measure: "ГБ",
                icon: this.getColorIcon(color_icon),
            },
            os: {
                name: "",
                id: "VM6_ISPsystem_Windows-10-RUS",
                price: 0,
                value: 0,
                measure: "",
                icon: this.getColorIcon(color_icon),
            },
            panel: {
                name: "Панель управления",
                id: value.panel === "off" ? "111" : "110",
                price:
                    value.panel === "off"
                        ? 0
                        : +this.findAddon("2190", addons).enumeration[1].enumerationitem[1].price
                            .period[0]["$cost"],
                value: value.panel,
                measure: "",
                icon: this.getColorIcon(color_icon),
            },
            support: {
                name: "Администрирование сервера",
                id: 2225,
                price:
                    value.support === "off"
                        ? 0
                        : +this.findAddon("2225", addons).price.period[0]["$cost"],
                value: value.support,
                measure: "",
                icon: this.getColorIcon(color_icon),
            },
        };
    }

    generateUrlParams(state) {
        this.ram = state.ram ? `26addon_${state.ram.id}%3D${state.ram.value}` : "";
        this.cpu = state.cpu ? `%26addon_${state.cpu.id}%3D${state.cpu.value}` : "";
        this.ip4 = state.ip4 ? `%26addon_${state.ip4.id}%3D${state.ip4.value}` : "";
        this.port = state.port
            ? `%26addon_${state.port.id}%3D${state.port.value}`
            : "";
        this.space = state.space
            ? `%26addon_${state.space.id}%3D${state.space.value}`
            : "";
        this.backup = state.backup
            ? state.backup.value === 0
                ? `%26addon_2208%3D2210`
                : `%26addon_2208%3D${state.backup.id}%26addon_${state.backup.id}%3D${state.backup.value}`
            : "";
        this.panel = state.panel ? `%26addon_2190%3D${state.panel.id}` : "";
        this.support = state.support
            ? `%26addon_${state.support.id}%3D${state.support.value}`
            : "";
        this.ipv6subnet_prefix =
            state.ipv6subnet_prefix && state.ipv6subnet_prefix.id !== "ipv6"
                ? `%26addon_2198%3D${state.ipv6subnet_prefix.id}`
                : `%26addon_2198%3D81`;

        this.os = state.os ? `%26ostempl%3D${state.os.id}` : "";
        this.servers = state.servers
            ? `%26order_count%3D${state.servers.value}`
            : "";

        return `${this.ram}${this.cpu}${this.ip4}${this.port}${this.space}${this.backup}${this.panel}${this.support}${this.ipv6subnet_prefix}${this.servers}${this.os}`;
    }

}