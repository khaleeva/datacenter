function generateSpanElements(min, max, step) {
  const inputWidth = 376;
  const minSpanWidth = 60;

  let numSpans = Math.floor(inputWidth / minSpanWidth);
  let majorStep;

  if (max <= 10) {
    numSpans = Math.floor((max - min) / step) + 1;
    majorStep = step;
  } else {
    majorStep = Math.ceil((max - min) / numSpans / step) * step;
  }

  let spanElements = "";
  for (let i = 0; i <= numSpans; i++) {
    const value = min + i * majorStep;
    if (value <= max) {
      spanElements += `<span>${value}</span>`;
    }
  }

  if (spanElements.indexOf(`<span>${max}</span>`) === -1) {
    spanElements += `<span>${max}</span>`;
  }

  return spanElements;
}

function generateCustomVpsRange(data) {
  return data
    .map(
      (addon) => `<div class="custom-range">
        <div class="custom-range__label">${getIcon[addon.name_ru["$"]]}
            <p>${getTitle(addon.name_ru["$"])}</p>
            <div  class="label" data-value="${addon.measure[1].name_ru["$"]}">${getMinValue(addon.name_ru["$"], addon.addonmin["$"])}<span>${addon.measure[1].name_ru["$"]}</span></div>
        </div>
            <div class="custom-range__slider">
                <span class="custom-range__slider-track"></span>
                <div class="custom-range__slider-progress">
                    <span class="fill"></span>
                </div>
                <input
                data-name=${getVPSAddonName[addon.name_ru["$"]]}
                data-value=${Number(addon.price.period[0]["$cost"]).toFixed(2) ?? 0}
                        class="custom-range__slider-input"
                        type="range"
                        min=${getMinValue(addon.name_ru["$"], addon.addonmin["$"])}
                        max=${addon.addonmax["$"]}
                        value="0"
                        id=${addon.id["$"]}
                        step=${addon.addonstep["$"]}
                />
                <div class="custom-range__ticks">
                 ${generateSpanElements(getMinValue(addon.name_ru["$"], addon.addonmin["$"]), +addon.addonmax["$"], addon.addonstep["$"])}
                </div>
            </div>

</div>`,
    )
    .join("");
}

function generateCustomVpsTabs(data) {
  return data
      .map(
          (d) => `
                 <div class="custom-tabs">
                    <p>${d.name_ru["$"]}</p>
                    <div class="custom-tabs__container">
                        ${generateCustomTab(d, d.intname['$'])}
                        ${d.intname['$'] === 'ipv6subnet_prefix' ? 
                        `<div class="custom-tabs__tab">
     			            <label for='ipv6'>Нет
     			                <input type="radio" data-value=${0} data-name="ipv6subnet_prefix" name=${d.id['$']} id='ipv6' value=${null} />
     			            </label>
 			            </div>`
				        : ''
		  }
                    </div>
                 </div>`,
      )
      .join("");
}

function generateCustomTab(data, name) {
  if (data.enumeration && data.enumeration.length > 0) {
    return data.enumeration[1].enumerationitem
        .reverse()
        .map(
            (d) => `<div class="custom-tabs__tab">
     			<label for=${d.id["$"]}>${getTabsName[d.name_ru["$"]] || d.name_ru["$"]}
     			<input type="radio" data-name=${name} data-value=${d.price.period[0]["$cost"]} name=${data.id["$"]} id=${d.id["$"]} value=${d.id["$"]} />
     			</label>
 			</div>`,
        )
        .join("");
  } else {
      return `<div class="custom-tabs__tab">
                 <label for='support-active'>Включена
                     <input type="radio" data-value=${data.price.period[0]['$cost']} data-name="support" name=${data.id['$']} id='support-active' value=${true} />
                 </label>
             </div>
             <div class="custom-tabs__tab">
                 <label for='support-inactive'>Нет
                     <input type="radio" data-value=${0} data-name="support" name=${data.id['$']} id='support-inactive' value=${false} />
                 </label>
             </div>`
    }
}
