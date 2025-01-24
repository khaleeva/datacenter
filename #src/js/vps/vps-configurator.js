class VpsConfigurator {
    constructor() {
        this.custom_input = new CustomInput()
        this.tariffCard = new TariffCard()
        this.vps_state = {};
        this.baseSum = 0;
        this.vps_order_url = "";
        this.vps_calculator = document.querySelector(".vps__calculator");
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

    prepareInitialData(data) {
        this.typeRangeData = data.vps_addons.filter(
            (addon) =>
                addon.addontype["$"] === "2" &&
                addon.billtype["$"] === "2" &&
                addon.id["$"] !== "2210",
        );
        this.typeSelectData = data.vps_addons.filter(
            (addon) => addon.addontype["$"] === "3" && addon.id["$"] !== "2195",
        );
        this.typeBooleanData = data.vps_addons.filter(
            (addon) =>
                addon.addontype["$"] === "1" ||
                addon.id["$"] === "2225" ||
                addon.id["$"] === "2195",
        );

        console.log(this.typeBooleanData, 'this.typeBooleanData')

        this.dataForOS = data.vps.itemtypeparam.find(
            (i) => i.id["$"] === "106",
        ).itemtypeparamvalue;

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
        this.typeRangeData.forEach((addon) => {
            this.initValue({
                name: getVPSAddonName[addon.id["$"]],
                id: addon.id["$"],
                value: this.custom_input.getMinValue(addon.id["$"], addon.addonmin["$"]),
                price: 0
            })
        })

        this.typeBooleanData.forEach((addon) => {
            this.name = addon.id["$"] === '2197' ? 'ipv6' : 'support'
            this.initValue({name: this.name, id: addon.id["$"], value: "off", price: 0});
        });

        this.initValue({name: "os", id: this.dataForOS[0].intname["$"], value: 0, price: 0});

        this.initValue({name: "servers", id: data.vps.id["$"], value: 1, price: 0});

        console.log(this.vps_state)
        return {
            rangeAddons: this.typeRangeData,
            selectAddons: this.typeSelectData,
            booleanAddons: this.typeBooleanData,
            operatingSystems: this.dataForOS
        };
    }

    render(data) {
        this.baseSum = Number(data.vps_cost);
        const {rangeAddons, selectAddons, booleanAddons, operatingSystems} = this.prepareInitialData(data)
        this.innerHTMLRanges = this.custom_input.generateRange(rangeAddons);
        this.innerHTMLSelectTabs = this.custom_input.generateCustomTabs(selectAddons);
        this.innerHTMLBooleanTabs = this.custom_input.generateCustomTabs(booleanAddons);
        this.innerHTMLSelect = this.custom_input.generateOsSelect(operatingSystems);
        this.innerHTMLSelect = this.custom_input.generateOsSelect(operatingSystems);
        this.innerServerRange = this.custom_input.generateServersRange(+data.vps.max_multiple_order_count["$"])

        this.innerHTMLAllRanges = this.innerHTMLRanges.concat(this.innerServerRange);

        this.innerHTMLTabs = this.innerHTMLSelect.concat(this.innerHTMLSelectTabs).concat(this.innerHTMLBooleanTabs)
        this.ranges = this.generateInputsContainer(this.innerHTMLAllRanges);
        this.tabs = this.generateInputsContainer(this.innerHTMLTabs, 'background');


        this.total_cost = document.createElement("div");
        this.total_cost.classList.add("vps__calculator-total");
        this.total_cost.innerHTML = `<p class="vps__calculator-total-title">Итоговая цена виртуального сервера</p><p>${this.getTotalSum()} BYN/месяц</p>`;

        this.order_button = document.createElement("button");
        this.order_button.classList.add(
            "custom-button-brand",
            "custom-button-brand_brand",
        );
        this.order_button.innerHTML = `Добавить в коризну ${addToBasket}`;

        if (this.order_button) {
            this.order_button.addEventListener("click", () => {
                window.open(vps_order_url, "_blank");
            });
        }

        this.vps_calculator.append(this.tabs);
        this.vps_calculator.append(this.ranges)
        this.vps_calculator.append(this.total_cost);
        this.vps_calculator.append(this.order_button);


        this.changeCustomTab();
        this.changeRangeValue();

    }


    generateInputsContainer(innerHTML, className) {
        this.div = document.createElement("div");
        if (className) {
            this.div.classList.add("vps__calculator-container", className);
        } else {
            this.div.classList.add("vps__calculator-container");
        }

        this.div.innerHTML = innerHTML;
        return this.div;
    }

    getTotalSum() {
        this.total = 0;
        for (let key in this.vps_state) {
            if (this.vps_state[key].price) {
                this.total += this.vps_state[key].price;
            }
        }

        this.params = this.tariffCard.generateUrlParams(Object.values(this.vps_state));
        this.vps_order_url = `${this.tariffCard.url}${this.params}`;
        return ((this.total + this.baseSum) * 1.2 * this.vps_state["servers"].value).toFixed(2);
    }

    changeCustomTab() {
        this.tabsContainer = document.querySelectorAll(".custom-tabs");
        this.tabLabels = document.querySelectorAll(".custom-tabs__tab label");
        this.tabsContainer.forEach((tab) => {
            const firstInput = tab.querySelector("label input");
            firstInput.checked = true;
        });

        this.tabLabels.forEach((label) => {
            const input = label.querySelector('input[type="radio"]');
            const groupName = input.name;
            const groupInputs = document.querySelectorAll(`input[name="${groupName}"]`);

            if (input.checked) {
                label.classList.add("label-active");
            }

            input.addEventListener("change", () => {
                const name = input.getAttribute("data-name");
                const price = input.getAttribute("data-value");

                this.vps_state[name] = {
                    name,
                    id: name === "support" || name === "ipv6" ? input.name : input.id,
                    value: input.value,
                    price: +Number(price).toFixed(2),
                };

                this.updateTotalCost();

                groupInputs.forEach((groupInput) => {
                    const groupLabel = groupInput.closest("label");
                    if (groupLabel) {
                        groupLabel.classList.remove("label-active");
                    }
                });

                if (input.checked) {
                    label.classList.add("label-active");
                }
            });
        });
    }


    updateTotalCost() {
        console.log(this.vps_state)
        const total_cost = document.querySelector(".vps__calculator-total");
        total_cost.innerHTML = `<p class="vps__calculator-total-title">Итоговая цена виртуального сервера</p><p>${this.getTotalSum()} BYN/месяц</p>`;
    }


    changeRangeValue(isVlan) {
        const ranges = document.querySelectorAll(".custom-range__slider-input");
        ranges.forEach((range) => {
            range.addEventListener("input", () => {
                const mainParent = range.parentNode.parentNode;
                const valueInputOutput = mainParent.querySelector(
                    ".custom-range__label .label input",
                );
                const valueElemOutput = mainParent.querySelector(
                    ".custom-range__label .label .custom-range__label-span",
                );

                if (valueElemOutput) {
                    valueElemOutput.innerHTML = `${range.value}`;
                }

                if (valueInputOutput) {
                    valueInputOutput.value = `${range.value}`;
                }

                this.getValueFromRange(range, isVlan);
            });
        });
    }

    getValueFromRange(range, isVlan) {
        let fill_range = range.previousElementSibling.querySelector(".fill");
        const sliderTicks = range.nextElementSibling;
        const value = range.value;
        const min = range.min;
        const max = range.max;
        const step = range.step;

        const price = range.getAttribute("data-value");
        const name = range.getAttribute("data-name");

        const additionalSteps = Math.floor((value - min) / step);
        const calculatedPrice = additionalSteps * price;

        if (name !== "servers" && name !== "vlan") {
            this.vps_state[name] = {
                name,
                id: range.id,
                price: +Number(calculatedPrice).toFixed(2),
                value: +range.value,
            };
        } else if (name === "servers") {
            this.vps_state["servers"] = { id: null, value: +range.value, price: null };
            const order_button = document.getElementById("vlan_btn");
            if (order_button) {
                // order_button.disabled = disableButton(+range.value, order_button);
            }
        } else if (name === "vlan") {
            vlan_state["vlan"] = {
                id: range.id,
                price: +Number(calculatedPrice).toFixed(2),
                value: +range.value,
            };
        }
        if (!isVlan) {
            this.updateTotalCost();
        }

        const normalizedValue = ((value - min) / (max - min)) * 100;

        fill_range.style.width = normalizedValue + "%";
        // checkCurrentTick(sliderTicks, value);
    }

}