class CustomInput {

    generateRange(addon_data) {
        return addon_data
            .map(
                (addon) =>
                    `<div class="custom-range">
                        <div class="custom-range__label">${getIcon[addon.id["$"]]}
                            <p>${getTitle(addon.name_ru["$"])}</p>
                            <div class="label" data-value="${addon.measure[1].name_ru["$"]}">
                                ${this.generateRangeLabel(addon)}
                                <span>${addon.measure[1].name_ru["$"]}</span>
                            </div>
                        </div>
                        <div class="custom-range__slider">
                            <span class="custom-range__slider-track"></span>
                            <div class="custom-range__slider-progress">
                                <span class="fill"></span>
                            </div>
                            <input
                                data-name=${getVPSAddonName[addon.id["$"]]}
                                data-value=${Number(addon.price.period[0]["$cost"]).toFixed(2) ?? 0}
                                class="custom-range__slider-input"
                                type="range"
                                min=${this.getMinValue(addon.id["$"], addon.addonmin["$"])}
                                max=${addon.addonmax["$"]}
                                value="0"
                                id=${addon.id["$"]}
                                step=${addon.addonstep["$"]}
                            />
                            <div class="custom-range__ticks">
                                ${this.generateSpanElements(this.getMinValue(addon.id["$"], addon.addonmin["$"]), +addon.addonmax["$"], addon.addonstep["$"])}
                             </div>
                        </div>

                    </div>`,).join("");
    }

    generateOsSelect(data) {
        const options = data
            .map(
                (d, index) =>
                    `<span class='custom-option ${index === 0 ? "selected" : ""}' data-value=${d.intname["$"]}>${d.name["$"]}</span>`
            )
            .join("");

        const defaultValue = data[0].name["$"];

        return `
        <div class="custom-select-container">
            <label>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path opacity="0.2" d="M15.1875 5.0625V13.5H2.8125V4.5H14.625C14.7742 4.5 14.9173 4.55926 15.0227 4.66475C15.1282 4.77024 15.1875 4.91332 15.1875 5.0625Z" fill="#1A1A1A"/>
                    <path d="M8.24836 9.42187L3.18586 13.9219C3.13045 13.9709 3.06593 14.0086 2.99596 14.0328C2.926 14.0569 2.85196 14.067 2.77809 14.0626C2.70421 14.0581 2.63194 14.0391 2.5654 14.0067C2.49885 13.9743 2.43935 13.9291 2.39027 13.8737C2.34119 13.8183 2.30351 13.7538 2.27937 13.6838C2.25523 13.6138 2.24511 13.5398 2.24958 13.4659C2.25405 13.3921 2.27303 13.3198 2.30544 13.2532C2.33784 13.1867 2.38303 13.1272 2.43843 13.0781L7.03125 9L2.43914 4.92187C2.38374 4.87279 2.33854 4.81329 2.30614 4.74674C2.27374 4.6802 2.25476 4.60793 2.25028 4.53405C2.24581 4.46018 2.25593 4.38614 2.28007 4.31618C2.30421 4.24621 2.3419 4.18169 2.39097 4.12628C2.44005 4.07088 2.49956 4.02569 2.5661 3.99329C2.63264 3.96088 2.70491 3.9419 2.77879 3.93743C2.85267 3.93296 2.9267 3.94308 2.99667 3.96722C3.06663 3.99136 3.13116 4.02904 3.18656 4.07812L8.24906 8.57812C8.30891 8.63091 8.35685 8.69582 8.38968 8.76856C8.42252 8.8413 8.4395 8.92019 8.4395 9C8.4395 9.0798 8.42252 9.15869 8.38968 9.23143C8.35685 9.30417 8.30891 9.36908 8.24906 9.42187H8.24836ZM15.1875 12.9375H8.4375C8.28831 12.9375 8.14524 12.9968 8.03975 13.1022C7.93426 13.2077 7.875 13.3508 7.875 13.5C7.875 13.6492 7.93426 13.7923 8.03975 13.8977C8.14524 14.0032 8.28831 14.0625 8.4375 14.0625H15.1875C15.3367 14.0625 15.4798 14.0032 15.5852 13.8977C15.6907 13.7923 15.75 13.6492 15.75 13.5C15.75 13.3508 15.6907 13.2077 15.5852 13.1022C15.4798 12.9968 15.3367 12.9375 15.1875 12.9375Z" fill="#1A1A1A"/>
                </svg>
                <span>Операционная система</span>
            </label>
            <div class="custom-select">
                <div class="custom-select-trigger">
                    <span>${defaultValue}</span>
                    <svg class="custom-select-arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <path opacity="0.2" d="M14.625 6.75L9 12.375L3.375 6.75H14.625Z" />
                        <path d="M15.1446 6.53484C15.1021 6.43205 15.03 6.34419 14.9375 6.28236C14.845 6.22054 14.7363 6.18752 14.625 6.1875H3.37502C3.2637 6.18741 3.15486 6.22036 3.06228 6.28216C2.96969 6.34396 2.89753 6.43184 2.85492 6.53468C2.8123 6.63752 2.80116 6.75069 2.82291 6.85986C2.84465 6.96903 2.89829 7.0693 2.97705 7.14797L8.60205 12.773C8.65429 12.8253 8.71633 12.8668 8.78461 12.8951C8.8529 12.9234 8.9261 12.9379 9.00002 12.9379C9.07394 12.9379 9.14713 12.9234 9.21542 12.8951C9.28371 12.8668 9.34574 12.8253 9.39799 12.773L15.023 7.14797C15.1016 7.06926 15.1552 6.969 15.1768 6.85986C15.1985 6.75072 15.1873 6.63761 15.1446 6.53484ZM9.00002 11.5798L4.73275 7.3125H13.2673L9.00002 11.5798Z" />
                    </svg>
                </div>
                <div class="custom-options">
                    ${options}
                </div>
            </div>
        </div>
        `;
    }

    generateCustomTabs(data) {
        return data
            .map(
                (d) => `
                 <div class="custom-tabs">
                    <p>${d.name_ru["$"]}</p>
                    <div class="custom-tabs__container">
                        ${this.generateTab(d, d.intname["$"])}
                    </div>
                 </div>`,
            )
            .join("");
    }

    generateServersRange(max) {
        return `<div class="custom-range">
      <div class="custom-range__label">${getIcon["server"]}
        <p>Количество серверов для заказа</p>
        <div  class="label" data-value="шт">
        <input class="custom-range__label-input" type="number"
               step=${1}
               min=${1}
               max=${20}
               value=${1}
        />
        <span>шт</span></div>
      </div>
      <div class="custom-range__slider">
        <span class="custom-range__slider-track"></span>
        <div class="custom-range__slider-progress">
          <span class="fill"></span>
        </div>
        <input
            data-name='servers'
            data-value=${null}
            class="custom-range__slider-input"
            type="range"
            min=${1}
            max=${max}
            value="0"
            id=${null}
            step=${1}
        />
        <div class="custom-range__ticks">
          ${this.generateSpanElements(1, max, 1)}
        </div>
      </div>
    </div>`
    };

    generateTab(data, name) {

        console.log(data, '!!!')

        if (data.enumeration && data.enumeration.length > 0) {
            const renderData =
                data.id["$"] === "2198"
                    ? data.enumeration[1].enumerationitem
                    : data.enumeration[1].enumerationitem.reverse();
            return renderData
                .map(
                    (d) => `<div class="custom-tabs__tab">
     			<label for=${d.id["$"]}>${getTabsName[d.id["$"]] || d.name_ru["$"]}
     			<input type="radio" data-name=${name} data-value=${d.price.period[0]["$cost"]} name=${data.id["$"]} id=${d.id["$"]} value=${d.id["$"]} />
     			</label>
 			</div>`,
                )
                .join("");
        } else {
            this.name = data.id["$"] === '2197' ? 'ipv6' : 'support'
            return `
             <div class="custom-tabs__tab">
                 <label for=${this.name}>Нет
                     <input type="radio" data-value=${0} data-name=${this.name} name=${data.id["$"]} id=${this.name} value='off' />
                 </label>
             </div>
             <div class="custom-tabs__tab">
                 <label id=${this.name}>Включенo
                     <input type="radio" data-value=${data.price.period[0]["$cost"]} data-name=${this.name} name=${data.id["$"]} id=${this.name} value='on' />
                 </label>
             </div>`;
        }
    }

    generateRangeLabel(addon) {
        return addon.id["$"] === "2244"
            ? `<span class="custom-range__label-span">${this.getMinValue(addon.id["$"], addon.addonmin["$"])}</span>`
            : `<input class="custom-range__label-input" type="number"
               step=${addon.addonstep["$"]}
               min=${this.getMinValue(addon.id["$"], addon.addonmin["$"])}
               max=${addon.addonmax["$"]}
               value=${this.getMinValue(addon.id["$"], addon.addonmin["$"])}
        />`;
    }

    getMinValue(id, value) {
        return id === '2208' ? 0 : +value
    }

    generateSpanElements(min, max, step) {
        this.inputWidth = 376;
        this.minSpanWidth = 60;
        this.majorStep = 0;

        this.numSpans = Math.floor(this.inputWidth / this.minSpanWidth);


        if (max <= 10) {
            this.numSpans = Math.floor((max - min) / step) + 1;
            this.majorStep = step;
        } else {
            this.majorStep = Math.ceil((max - min) / this.numSpans / step) * step;
        }

        this.spanElements = "";
        for (let i = 0; i <= this.numSpans; i++) {
            const value = min + i * this.majorStep;
            if (value <= max) {
                this.spanElements += `<span>${value}</span>`;
            }
        }

        if (this.spanElements.indexOf(`<span>${max}</span>`) === -1) {
            this.spanElements += `<span>${max}</span>`;
        }

        return this.spanElements;
    }

}