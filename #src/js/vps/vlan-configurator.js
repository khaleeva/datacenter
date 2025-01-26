class VlanConfigurator {

    constructor() {
        this.URL = "https://my.datahata.by?func=register&redirect=startpage%3Dvirtual%255Fnetwork%26startform%3Dvirtual%255Fnetwork%252Eorder%252Eparam%26pricelist%3D2243%26period%3D1%26project%3D1%26addon_"
        this.inputs = new CustomInputs()
        this.tariff = new Tariff()
        this.vps = new VpsConfigurator()
        this.vlan_calculator = document.querySelector(".vlan__calculator");
        this.vlan_state = {};
        this.baseSum = 0;
        this.vlan_order_url = "";
    }

    prepareInitialData(data) {
        this.typeRangeData = data.vlan.addons.filter(
            (addon) =>
                addon.addontype["$"] === "2" &&
                addon.billtype["$"] === "2" &&
                addon.id["$"] !== "2210",
        );

        this.typeRangeData.forEach((addon) => {
            this.vlan_state["vlan"] = {
                id: addon.id["$"],
                value: this.inputs.getMinValue(addon.name_ru["$"], addon.addonmin["$"]),
                price: 0,
            };
        });

        this.vlan_order_url = `${this.URL}${this.vlan_state["vlan"].id}%3D${this.vlan_state["vlan"].value}`;

        return {
            rangeAddons: this.typeRangeData,
        }
    }


    render(data) {
        this.baseSum = data.vlan.baseCost;
        const {rangeAddons} = this.prepareInitialData(data)
        this.innerHTMLRanges = this.inputs.generateRanges(rangeAddons);
        this.ranges = this.vps.generateConfiguratorContainer(this.innerHTMLRanges, 'vlan__calculator-container');
        this.totalSum = this.vps.getTotalSum({
            id_btn: 'vlan_btn',
            state: this.vlan_state,
            isVlan: true,
            baseSum: this.baseSum,
            billing_url: this.URL,
        })


        this.order_button = this.vps.createOrderButton({
            id: 'vlan_btn',
            url: this.vlan_order_url,
            isVlan: true,
            className: 'custom-button-brand_size',
            value: 1,
            totalSum: this.totalSum,
        })

        this.title = this.createConfiguratorTitle()

        this.vlan_calculator.append(this.title)
        this.vlan_calculator.append(this.ranges)
        this.vlan_calculator.append(this.order_button)
        this.vps.changeRangeValue({
            state: this.vlan_state,
            isVlan: true,
            baseSum: this.baseSum,
            billing_url: this.URL,
            id_btn: 'vlan_btn'
        });

    }

    createConfiguratorTitle() {
        const title = document.createElement("div");
        title.innerHTML = `<div class="vlan__title"><div class="vlan__title-main">${vlan_icon}<h3>VLAN</h3></div>
        <p class="vlan__title-paragraph">Закрытая виртуальная сеть между вашими виртуальными машинами. Оптимально при заказе 2 и более серверов</p></div>`;

        return title
    }


}