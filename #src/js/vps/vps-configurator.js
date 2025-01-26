class VpsConfigurator {
    constructor() {
        this.tariff = new Tariff()
        this.inputs = new CustomInputs()
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
        this.vps_order_url = `${this.tariffCard.URL}${this.params}`;
    }

    prepareInitialData(data) {
        this.typeRangeData = data.vps.addons.filter(
            (addon) =>
                addon.addontype["$"] === "2" &&
                addon.billtype["$"] === "2" &&
                addon.id["$"] !== "2210",
        );
        this.typeSelectData = data.vps.addons.filter(
            (addon) => addon.addontype["$"] === "3" && addon.id["$"] !== "2195",
        );
        this.typeBooleanData = data.vps.addons.filter(
            (addon) =>
                addon.addontype["$"] === "1" ||
                addon.id["$"] === "2225" ||
                addon.id["$"] === "2195",
        );


        this.dataForOS = data.vps.configuration.itemtypeparam.find(
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
                value: this.inputs.getMinValue(addon.id["$"], addon.addonmin["$"]),
                price: 0
            })
        })


        this.typeBooleanData.forEach((addon) => {
            this.name = addon.id["$"] === '2197' ? 'ipv6' : 'support'
            this.initValue({name: this.name, id: addon.id["$"], value: "off", price: 0});
        });

        this.initValue({name: "os", id: this.dataForOS[0].intname["$"], value: 0, price: 0});

        this.initValue({name: "servers", id: data.vps.configuration.id["$"], value: 1, price: 0});

        return {
            rangeAddons: this.typeRangeData,
            selectAddons: this.typeSelectData,
            booleanAddons: this.typeBooleanData,
            operatingSystems: this.dataForOS
        };
    }

    render(data) {
        this.baseSum = Number(data.vps.baseCost);
        const {rangeAddons, selectAddons, booleanAddons, operatingSystems} = this.prepareInitialData(data)
        this.innerHTMLRanges = this.inputs.generateRanges(rangeAddons);
        this.innerHTMLSelectTabs = this.inputs.generateCustomTabs(selectAddons);
        this.innerHTMLBooleanTabs = this.inputs.generateCustomTabs(booleanAddons);
        this.innerHTMLSelect = this.inputs.generateOsSelect(operatingSystems);
        this.innerHTMLSelect = this.inputs.generateOsSelect(operatingSystems);
        this.innerServerRange = this.inputs.generateServersRange(+data.vps.configuration.max_multiple_order_count["$"])

        this.innerHTMLAllRanges = this.innerHTMLRanges.concat(this.innerServerRange);

        this.innerHTMLTabs = this.innerHTMLSelect.concat(this.innerHTMLSelectTabs).concat(this.innerHTMLBooleanTabs)
        this.ranges = this.generateConfiguratorContainer(this.innerHTMLAllRanges, '');
        this.tabs = this.generateConfiguratorContainer(this.innerHTMLTabs, 'background');

        this.total_cost = this.createTotalCostBlock()

        this.order_button = this.createOrderButton({
            id: 'vps_btn',
            url: this.vps_order_url,
            isVlan: false,
            className: '',
            value: null
        })

        this.vps_calculator.append(this.tabs);
        this.vps_calculator.append(this.ranges)
        this.vps_calculator.append(this.total_cost);
        this.vps_calculator.append(this.order_button);

        this.selectOs()
        this.changeCustomTab({
            state: this.vps_state,
            isVlan: false,
            baseSum: this.baseSum,
            billing_url: this.tariffCard.URL,
            id_btn: 'vps_btn'
        });
        this.changeRangeValue({
            state: this.vps_state,
            isVlan: false,
            baseSum: this.baseSum,
            billing_url: this.tariffCard.URL,
            id_btn: 'vps_btn'
        });
        this.changeRangeValueFromLabelInput({
            state: this.vps_state,
            isVlan: false,
            baseSum: this.baseSum,
            billing_url: this.tariffCard.URL,
            id_btn: 'vps_btn'
        });
    }

    getTotalSum({id_btn, state, billing_url, isVlan, baseSum}) {
        this.order_button = document.getElementById(id_btn)
        this.total = 0;
        this.url_with_params = ''

        if (isVlan) {
            this.url_with_params = `${billing_url}${state["vlan"].id}%3D${state["vlan"].value}`;
            this.total = ((baseSum + state["vlan"].price) * 1.2).toFixed(2);
        } else {
            this.total = this.tariffCard.getTotalCost({
                state: state,
                base_cost: baseSum,
                quantity: state["servers"].value
            })




            this.params = this.tariffCard.generateUrlParams(Object.values(state));
            this.url_with_params = `${this.tariffCard.URL}${this.params}`;
        }

        if (this.order_button) {
            this.order_button.href = this.url_with_params
        }
        return this.total
    }

    updateTotalPriceDisplay({state, isVlan, baseSum, billing_url, id_btn}) {
        this.totalSum = this.getTotalSum({
            id_btn,
            state,
            isVlan,
            baseSum,
            billing_url,
        })


        if (!isVlan) {
            const total_cost = document.querySelector(".vps__calculator-total");
            total_cost.innerHTML = `<p class="vps__calculator-total-title">Итоговая цена виртуального сервера</p><p>${this.totalSum} BYN/месяц</p>`;
        } else {
            const total_cost = document.querySelector(".vlan__total-sum");
            total_cost.innerHTML = `${this.totalSum}`;
        }

    }

    createTotalCostBlock() {
        this.total_cost = document.createElement("div");
        this.total_cost.classList.add("vps__calculator-total");
        this.totalSum = this.getTotalSum({
            id_btn: 'vps_btn',
            state: this.vps_state,
            isVlan: false,
            baseSum: this.baseSum,
            billing_url: this.tariffCard.URL,
        })

        this.total_cost.innerHTML = `<p class="vps__calculator-total-title">Итоговая цена виртуального сервера</p><p>${this.totalSum} BYN/месяц</p>`;

        return this.total_cost
    }

    changeCustomTab({state, isVlan, baseSum, billing_url, id_btn}) {
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

                state[name] = {
                    name,
                    id: name === "support" || name === "ipv6" ? input.name : input.id,
                    value: input.value,
                    price: +Number(price).toFixed(2),
                };

                this.updateTotalPriceDisplay({state, isVlan, baseSum, billing_url, id_btn});

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


    changeRangeValue({state, isVlan, baseSum, billing_url, id_btn}) {
        const ranges = document.querySelectorAll(".custom-range__slider-input");
        ranges.forEach((range) => {
            range.addEventListener("input", () => {
                const mainParent = range.parentNode.parentNode;
                const valueLabelVpsOutput = mainParent.querySelector(
                    ".custom-range__label .label input",
                );

                const valueLabelVlanOutput = mainParent.querySelector(
                    ".custom-range__label .label .custom-range__label-span",
                );

                if (valueLabelVlanOutput) {
                    valueLabelVlanOutput.innerHTML = `${range.value}`;
                }

                if (valueLabelVpsOutput) {
                    valueLabelVpsOutput.value = `${range.value}`;
                }

                this.getValueFromRange({range, state, isVlan, baseSum, billing_url, id_btn});
            });
        });
    }

    changeRangeValueFromLabelInput({state, isVlan, baseSum, billing_url, id_btn}) {
        const label_inputs = document.querySelectorAll(".custom-range__label-input");

        label_inputs.forEach((input) => {
            const range =
                input.parentElement.parentElement.nextElementSibling.querySelector(
                    ".custom-range__slider-input"
                );

            const min = parseFloat(input.min) || 0;
            const max = parseFloat(input.max) || 100;
            const step = parseFloat(input.step) || 1;

            input.addEventListener("input", () => {
                if (input.value === "") return;
                range.value = input.value;
                this.getValueFromRange({range, state, isVlan, baseSum, billing_url, id_btn});
            });

            input.addEventListener("blur", () => {
                if (input.value === "") {
                    input.value = min;
                }

                if (input.value < min) {
                    input.value = min;
                }
                if (input.value > max) {
                    input.value = max;
                }

                const inputValue = parseFloat(input.value);
                if ((inputValue - min) % step !== 0) {
                    input.value = Math.round((inputValue - min) / step) * step + min;
                }

                range.value = input.value;
                this.getValueFromRange({range, state, isVlan, baseSum, billing_url, id_btn});
            });
        });
    }

    selectOs() {
        const customSelect = document.querySelector(".custom-select");
        const trigger = customSelect.querySelector(".custom-select-trigger");
        const options = customSelect.querySelector(".custom-options");
        const arrow = customSelect.querySelector(".custom-select-arrow");

        trigger.addEventListener("click", () => {
            options.classList.toggle("open");
            if (options.classList.contains("open")) {
                trigger.classList.add("active");
                arrow.classList.add("arrow-rotate");
            } else {
                arrow.classList.remove("arrow-rotate");
                trigger.classList.remove("active");
            }
        });

        options.addEventListener("click", (e) => {
            if (e.target.classList.contains("custom-option")) {
                const id = e.target.getAttribute("data-value");
                this.vps_state["os"] = {...this.vps_state['os'], id, value: 0, price: 0};

                trigger.querySelector("span").innerText = e.target.innerText;
                options.querySelectorAll(".custom-option").forEach((option) => {
                    option.classList.remove("selected");
                });
                e.target.classList.add("selected");
                options.classList.remove("open");
                trigger.classList.remove("active");
                arrow.classList.remove("arrow-rotate");
            }
        });

        document.addEventListener("click", (e) => {
            if (!customSelect.contains(e.target)) {
                options.classList.remove("open");
                arrow.classList.remove("arrow-rotate");
                trigger.classList.remove("active");
            }
        });
    }

    getValueFromRange({range, state, isVlan, baseSum, billing_url, id_btn}) {
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
            state[name] = {
                name,
                id: range.id,
                price: +Number(calculatedPrice).toFixed(2),
                value: +range.value,
            };
        } else if (name === "servers") {
            state["servers"] = {name: 'servers', id: null, value: +range.value, price: 0};
            this.disabledOrderBtn(+range.value)
        } else if (name === "vlan") {
            state["vlan"] = {
                id: range.id,
                price: +Number(calculatedPrice).toFixed(2),
                value: +range.value,
            };
        }

        this.updateTotalPriceDisplay({state, isVlan, baseSum, billing_url, id_btn});
        const normalizedValue = ((value - min) / (max - min)) * 100;

        fill_range.style.width = normalizedValue + "%";
        this.checkCurrentTick(sliderTicks, value);
    }

    checkCurrentTick(sliderTicks, value) {
        const spans = sliderTicks.querySelectorAll("span");
        spans.forEach((span) => {
            if (
                Number(span.innerHTML) === Number(value) ||
                Number(span.innerHTML) < Number(value)
            ) {
                span.style.background = "#6562FE";
                span.style.borderColor = "#D7D6FF";
                span.style.color =
                    Number(span.innerHTML) === Number(value)
                        ? "rgba(0, 0, 0, 0.90)"
                        : "#808080";
            } else {
                span.style.background = "#808080";
                span.style.borderColor = "#B3B3B3";
                span.style.color = "#808080";
            }
        });
    }

    disabledOrderBtn(value) {
        const order_button = document.getElementById("vlan_btn");
        if (order_button) {
            order_button.disabled = this.disable(value, order_button);
        }
    }

    disable(value, btn) {
        const svg = btn.querySelector("div p svg path");
        if (btn && value < 2) {
            svg.style.fill = "rgba(69, 69, 69, 0.7)";
            btn.style.background = "rgba(69, 69, 69, 0.1)";
            btn.style.color = "rgba(69, 69, 69, 0.7)";
        } else {
            svg.style.fill = "";
            btn.style.background = "";
            btn.style.color = "";
        }
        return !(value >= 2);
    }

    generateConfiguratorContainer(innerHTML, className) {
        this.div = document.createElement("div");
        if (className) {
            this.div.classList.add("vps__calculator-container", className);
        } else {
            this.div.classList.add("vps__calculator-container");
        }
        this.div.innerHTML = innerHTML;
        return this.div;
    }


    createOrderButton({id, url, isVlan, className, value, totalSum}) {
        this.order_button = document.createElement("a");
        this.order_button.id = id;
        this.order_button.target = '_blank';
        this.order_button.href = url
        if (className) {
            this.order_button.classList.add(
                "custom-button-brand",
                "custom-button-brand_brand",
                className
            );
        } else {
            this.order_button.classList.add(
                "custom-button-brand",
                "custom-button-brand_brand",
            );
        }

        if (this.order_button && !isVlan) {
            this.order_button.innerHTML = `Добавить в коризну ${addToBasket}`;

        } else {
            this.order_button.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
                <p class="vlan__btn-name" style="display: flex; align-items: center; justify-content: center; gap:2px;">Добавить в коризну ${addToBasket}</p>
                <p style="font-size: 14px; font-weight: normal"><span class="vlan__total-sum">${totalSum}</span> BYN/месяц</p>
            </div>`;

            this.order_button.disabled = this.disable(
                value,
                this.order_button,
            );
        }

        return this.order_button
    }

}

