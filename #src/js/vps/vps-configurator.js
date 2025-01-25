class VpsConfigurator {
    constructor() {
        // this.vlan = new VlanConfigurator()
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

        this.order_button = this.createOrderButton({
            id: 'vps_btn',
            url: this.vps_order_url,
            isVlan: false,
            className: '',
            value: null
        })
        this.total_cost = this.createTotalCostBlock()

        this.vps_calculator.append(this.tabs);
        this.vps_calculator.append(this.ranges)
        this.vps_calculator.append(this.total_cost);
        this.vps_calculator.append(this.order_button);

        this.selectOs()
        this.changeCustomTab();
        this.changeRangeValue(this.vps_state);
        this.changeRangeValueFromLabelInput();

    }


    getTotalSum() {
        this.total = this.tariffCard.getTotalCost({
            state: this.vps_state,
            base_cost: this.baseSum,
            quantity: this.vps_state["servers"].value
        })

        this.params = this.tariffCard.generateUrlParams(Object.values(this.vps_state));
        this.vps_order_url = `${this.tariffCard.URL}${this.params}`;
        return this.total
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

                this.updateTotalPriceDisplay();

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


    updateTotalPriceDisplay() {
        const total_cost = document.querySelector(".vps__calculator-total");
        total_cost.innerHTML = `<p class="vps__calculator-total-title">Итоговая цена виртуального сервера</p><p>${this.getTotalSum()} BYN/месяц</p>`;
    }


    changeRangeValue(state, isVlan) {
        const ranges = document.querySelectorAll(".custom-range__slider-input");
        ranges.forEach((range) => {
            range.addEventListener("input", () => {
                const mainParent = range.parentNode.parentNode;
                const valueLabelOutput = mainParent.querySelector(
                    ".custom-range__label .label input",
                );
                // const valueElemOutput = mainParent.querySelector(
                //     ".custom-range__label .label .custom-range__label-span",
                // );
                // console.log(valueElemOutput)
                // if (valueElemOutput) {
                //     valueElemOutput.innerHTML = `${range.value}`;
                // }

                if (valueLabelOutput) {
                    valueLabelOutput.value = `${range.value}`;
                }

                this.getValueFromRange(range, state, isVlan);
            });
        });
    }

    changeRangeValueFromLabelInput() {
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
                // Позволяем временно вводить любое значение, включая пустое
                if (input.value === "") return;

                const inputValue = parseFloat(input.value);

                // Проверка на шаг (если значение не кратно шагу, отклоняем)
                if ((inputValue - min) % step !== 0) {
                    input.setCustomValidity("Значение должно быть кратно шагу.");
                } else {
                    input.setCustomValidity(""); // Если шаг верный, сбрасываем ошибку
                }

                // Присваиваем значение range
                range.value = input.value;
                this.getValueFromRange(range);
            });

            // Проверка диапазона после завершения ввода
            input.addEventListener("blur", () => {
                if (input.value === "") {
                    input.value = min; // Устанавливаем минимальное значение, если поле пустое
                }

                // Приводим значение к диапазону
                if (input.value < min) {
                    input.value = min;
                }
                if (input.value > max) {
                    input.value = max;
                }

                // Проверка на шаг при потере фокуса
                const inputValue = parseFloat(input.value);
                if ((inputValue - min) % step !== 0) {
                    input.value = Math.round((inputValue - min) / step) * step + min;
                }

                // Обновляем значение range
                range.value = input.value;
                this.getValueFromRange(range);
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

    getValueFromRange(range, state, isVlan) {
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
            state["servers"] = {id: null, value: +range.value, price: null};
            this.disabledOrderBtn(+range.value)
        } else if (name === "vlan") {
            state["vlan"] = {
                id: range.id,
                price: +Number(calculatedPrice).toFixed(2),
                value: +range.value,
            };
        }
        if (!isVlan) {
            this.updateTotalPriceDisplay();
        }

        const normalizedValue = ((value - min) / (max - min)) * 100;

        fill_range.style.width = normalizedValue + "%";
        this.checkCurrentTick(sliderTicks, value);
    }


    createTotalCostBlock() {
        this.total_cost = document.createElement("div");
        this.total_cost.classList.add("vps__calculator-total");
        this.total_cost.innerHTML = `<p class="vps__calculator-total-title">Итоговая цена виртуального сервера</p><p>${this.getTotalSum()} BYN/месяц</p>`;

        return this.total_cost
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
        this.order_button = document.createElement("button");
        this.order_button.id = id;
        if(className){
            this.order_button.classList.add(
                "custom-button-brand",
                "custom-button-brand_brand",
                className
            );
        } else{
            this.order_button.classList.add(
                "custom-button-brand",
                "custom-button-brand_brand",
            );
        }

        if (this.order_button && !isVlan) {
            this.order_button.innerHTML = `Добавить в коризну ${addToBasket}`;

        } else{
            this.order_button.innerHTML = `<div>
            <p class="vlan__btn-name">Добавить в коризну ${addToBasket}</p>
            <p style="font-size: 14px; font-weight: normal"><span class="vlan__total-sum">${totalSum}</span> BYN/месяц</p>
            </div>`;

            this.order_button.disabled = this.disable(
                value,
                this.order_button,
            );
        }

        this.order_button.addEventListener("click", () => {
            window.open(url, "_blank");
        });

        return this.order_button
    }

    // updateTotalVlanCost() {
    //     const total_cost = document.querySelector(".vlan__total-sum");
    //     total_cost.innerHTML = `${getTotalVlanSum()}`;
    // }


}

