async function getDataFromBillmng() {
  const vps_calculator = document.querySelector(".vps__calculator");
  const vlan_calculator = document.querySelector(".vlan__calculator");
  const tariffLight = document.querySelector("#light");
  const tariffOptima = document.querySelector("#optima");
  const tariffBest = document.querySelector("#best");
  const tariffMax = document.querySelector("#max");
  const url = `https://my.datahata.by/billmgr?func=pricelist.export&elid=1&out=json&onlyavailable=on`;
  try {
    vps_calculator.innerHTML = loader;
    vlan_calculator.innerHTML = loader;
    tariffLight.classList.add("tariff__details_loader");
    tariffOptima.classList.add("tariff__details_loader");
    tariffBest.classList.add("tariff__details_loader");
    tariffMax.classList.add("tariff__details_loader");
    tariffLight.innerHTML = card_loader;
    tariffOptima.innerHTML = card_loader;
    tariffBest.innerHTML = card_loader;
    tariffMax.innerHTML = card_loader;
    const response = await fetch(url);
    const data = await response.json();
    if (data) {
      const typeOfService = data.doc.pricelist;

      const vps = typeOfService.filter((i) => i.itemtype["$"] === "3");

      const vps_addons = vps[0].addon;

      vps_calculator.innerHTML = "";
      vlan_calculator.innerHTML = "";

      if (vps_addons) {
        tariffLight.classList.remove("tariff__details_loader");
        tariffOptima.classList.remove("tariff__details_loader");
        tariffBest.classList.remove("tariff__details_loader");
        tariffMax.classList.remove("tariff__details_loader");

        tariffLight.innerHTML = generateTariffDetails(
          Number(vps[0].price.period[0]["$cost"]),
          vps_addons,
          "light",
        );
        tariffOptima.innerHTML = generateTariffDetails(
          Number(vps[0].price.period[0]["$cost"]),
          vps_addons,
          "optima",
        );
        tariffBest.innerHTML = generateTariffDetails(
          Number(vps[0].price.period[0]["$cost"]),
          vps_addons,
          "best",
        );
        tariffMax.innerHTML = generateTariffDetails(
          Number(vps[0].price.period[0]["$cost"]),
          vps_addons,
          "max",
        );
      }
    }
    return data;
  } catch (e) {
    console.error(e);
  } finally {
    vps_calculator.innerHTML = "";
    vlan_calculator.innerHTML = "";
  }
}

let vps_state = {};
let vlan_state = {};
let baseSum = 0;
let baseVlanSum = 0;
let vps_order_url = "";
let vlan_order_url = "";

document.addEventListener("DOMContentLoaded", async () => {
  const response = await getDataFromBillmng();
  const typeOfService = response.doc.pricelist;
  const vps_calculator = document.querySelector(".vps__calculator");
  const vlan_calculator = document.querySelector(".vlan__calculator");

  if (vps_calculator) {
    const vps = typeOfService.filter((i) => i.itemtype["$"] === "3");
    const vps_addons = vps[0].addon;

    baseSum = Number(vps[0].price.period[0]["$cost"]);

    const dataForRange = getDataForRange(vps_addons);

    const dataSelectForTab = getDataSelectForTabs(vps_addons);
    const dataBooleanForTab = getDataBooleanForTabs(vps_addons);
    const dataForSelect = vps[0].itemtypeparam.find(
      (i) => i.id["$"] === "106",
    ).itemtypeparamvalue;

    dataForRange.forEach((addon) => {
      initValue(
        getVPSAddonName[addon.id["$"]],
        addon.id["$"],
        getMinValue(addon.name_ru["$"], addon.addonmin["$"]),
        0,
      );
    });

    initValue("os", dataForSelect[0].intname["$"], 0, 0);

    initValue("servers", vps[0].id["$"], 1, 0);

    dataSelectForTab.forEach((addon) => {
      addon.enumeration[1].enumerationitem.forEach((d) => {
        if (addon.id["$"] === "2198") {
          initValue(addon.intname["$"], '111', "111", 0);
        } else {
          initValue(
            addon.intname["$"],
            d.id["$"],
            "on",
            Number(d.price.period[0]["$cost"]),
          );
        }
      });
    });

    dataBooleanForTab.forEach((addon) => {
      const name = addon.id["$"] === '2197' ? 'ipv6' : 'support'
      initValue(name , addon.id["$"], "off", 0);
    });

    const innerHTMLRanges = generateCustomVpsRange(dataForRange);
    const innerHTMLSelectTabs = generateCustomVpsTabs(dataSelectForTab);
    const innerHTMLBooleanTabs = generateCustomVpsTabs(dataBooleanForTab);

    const innerHTMLSelect = generateCustomSelect(dataForSelect);

    const serversRange = `<div class="custom-range">
      <div class="custom-range__label">${getIcon["Количество серверов для заказа"]}
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
            max=${vps[0].max_multiple_order_count["$"]}
            value="0"
            id=${null}
            step=${1}
        />
        <div class="custom-range__ticks">
          ${generateSpanElements(1, +vps[0].max_multiple_order_count["$"], 1)}
        </div>
      </div>
    </div>`;

    const innerHTMLAllRanges = innerHTMLRanges.concat(serversRange);
    const innerHTMLTabs = innerHTMLSelect
      .concat(innerHTMLSelectTabs)
      .concat(innerHTMLBooleanTabs);
    const tabs = generateInputsContainer(innerHTMLTabs, "background");
    const ranges = generateInputsContainer(innerHTMLAllRanges);

    const total_cost = document.createElement("div");
    total_cost.classList.add("vps__calculator-total");
    total_cost.innerHTML = `<p class="vps__calculator-total-title">Итоговая цена виртуального сервера</p><p>${getTotalSum()} BYN/месяц</p>`;

    const order_button = document.createElement("button");
    order_button.classList.add(
      "custom-button-brand",
      "custom-button-brand_brand",
    );
    order_button.innerHTML = `Добавить в коризну ${addToBasket}`;

    if (order_button) {
      order_button.addEventListener("click", () => {
        window.open(vps_order_url, "_blank");
      });
    }

    vps_calculator.append(tabs);
    vps_calculator.append(ranges);
    vps_calculator.append(total_cost);
    vps_calculator.append(order_button);

    changeRangeValue();
    changeCustomTab();
    selectOption();
    changeRangeValueFromLabelInput();
  }

  if (vlan_calculator) {
    const vlan = typeOfService.filter((i) => i.itemtype["$"] === "66192");
    const vlan_addons = vlan[0].addon;
    const dataForRange = getDataForRange(vlan_addons);

    dataForRange.forEach((addon) => {
      vlan_state["vlan"] = {
        id: addon.id["$"],
        value: getMinValue(addon.name_ru["$"], addon.addonmin["$"]),
        price: 0,
      };
    });
    baseVlanSum = Number(vlan[0].price.period[0]["$cost"]);
    vlan_order_url = `https://my.datahata.by?func=register&redirect=startpage%3Dvirtual%255Fnetwork%26startform%3Dvirtual%255Fnetwork%252Eorder%252Eparam%26pricelist%3D2243%26period%3D1%26project%3D1%26addon_${vlan_state["vlan"].id}%3D1`;
    const innerHTMLRanges = generateCustomVpsRange(dataForRange);

    const ranges = generateInputsContainer(
      innerHTMLRanges,
      "vlan__calculator-container",
    );

    const title = document.createElement("div");
    title.innerHTML = `<div class="vlan__title"><div class="vlan__title-main">${vlan_icon}<h3>VLAN</h3></div>
<p class="vlan__title-paragraph">Закрытая виртуальная сеть между вашими виртуальными машинами. Оптимально при заказе 2 и более серверов</p></div>`;

    const order_button = document.createElement("button");
    order_button.id = "vlan_btn";
    order_button.classList.add(
      "custom-button-brand",
      "custom-button-brand_brand",
      "custom-button-brand_size",
    );

    order_button.innerHTML = `<div>
            <p class="vlan__btn-name">Добавить в коризну ${addToBasket}</p>
            <p style="font-size: 14px; font-weight: normal"><span class="vlan__total-sum">${getTotalVlanSum()}</span> BYN/месяц</p>
            </div>`;

    if (order_button) {
      order_button.addEventListener("click", () => {
        window.open(vlan_order_url, "_blank");
      });

      order_button.disabled = disableButton(
        vps_state["servers"].value,
        order_button,
      );
    }

    vlan_calculator.append(title);
    vlan_calculator.append(ranges);
    vlan_calculator.append(order_button);

    changeRangeValue(true);
  }
});

function initValue(name, id, value, price) {
  vps_state[name] = {
    id,
    price,
    value,
  };

  const params = generateUrlParams(vps_state);
  vps_order_url = `https://my.datahata.by?func=register&redirect=startpage%3Dvds%26startform%3Dvds%252Eorder%252Eparam%26pricelist%3D2187%26period%3D1%26project%3D1%${params}`;
}

function updateTotalCost() {
  const total_cost = document.querySelector(".vps__calculator-total");
  total_cost.innerHTML = `<p class="vps__calculator-total-title">Итоговая цена виртуального сервера</p><p>${getTotalSum()} BYN/месяц</p>`;
}

function updateTotalVlanCost() {
  const total_cost = document.querySelector(".vlan__total-sum");
  total_cost.innerHTML = `${getTotalVlanSum()}`;
}

function generateUrlParams(state) {
  const ram = state.ram ? `26addon_${state.ram.id}%3D${state.ram.value}` : "";
  const cpu = state.cpu ? `%26addon_${state.cpu.id}%3D${state.cpu.value}` : "";
  const ip4 = state.ip4 ? `%26addon_${state.ip4.id}%3D${state.ip4.value}` : "";
  const port = state.port
    ? `%26addon_${state.port.id}%3D${state.port.value}`
    : "";
  const space = state.space
    ? `%26addon_${state.space.id}%3D${state.space.value}`
    : "";
  const backup = state.backup
    ? state.backup.value === 0
      ? `%26addon_2208%3D2210`
      : `%26addon_2208%3D${state.backup.id}%26addon_${state.backup.id}%3D${state.backup.value}`
    : "";
  const panel = state.panel ? `%26addon_2190%3D${state.panel.id}` : "";
  const support = state.support
    ? `%26addon_${state.support.id}%3D${state.support.value}`
    : "";
  const ipv6subnet_prefix =
    state.ipv6subnet_prefix && state.ipv6subnet_prefix.id !== "ipv6"
      ? `%26addon_2198%3D${state.ipv6subnet_prefix.id}`
      : `%26addon_2198%3D81`;

  const os = state.os ? `%26ostempl%3D${state.os.id}` : "";
  const servers = state.servers
    ? `%26order_count%3D${state.servers.value}`
    : "";

  return `${ram}${cpu}${ip4}${port}${space}${backup}${panel}${support}${ipv6subnet_prefix}${servers}${os}`;
}

function getTotalSum() {
  let total = 0;
  for (let key in vps_state) {
    if (vps_state[key].price) {
      total += vps_state[key].price;
    }
  }

  const params = generateUrlParams(vps_state);
  vps_order_url = `https://my.datahata.by?func=register&redirect=startpage%3Dvds%26startform%3Dvds%252Eorder%252Eparam%26pricelist%3D2187%26period%3D1%26project%3D1%${params}`;
  return ((total + baseSum) * 1.2 * vps_state["servers"].value).toFixed(2);
}

function getTotalVlanSum() {
  let total = vlan_state["vlan"].price;
  vlan_order_url = `https://my.datahata.by?func=register&redirect=startpage%3Dvirtual%255Fnetwork%26startform%3Dvirtual%255Fnetwork%252Eorder%252Eparam%26pricelist%3D2243%26period%3D1%26project%3D1%26addon_${vlan_state["vlan"].id}%3D${vlan_state["vlan"].value}`;
  return ((baseVlanSum + total) * 1.2).toFixed(2);
}

function generateInputsContainer(innerHTML, className) {
  const div = document.createElement("div");
  if (className) {
    div.classList.add("vps__calculator-container", className);
  } else {
    div.classList.add("vps__calculator-container");
  }

  div.innerHTML = innerHTML;
  return div;
}

function getDataForRange(addons) {
  return addons.filter(
    (addon) =>
      addon.addontype["$"] === "2" &&
      addon.billtype["$"] === "2" &&
      addon.id["$"] !== "2210",
  );
}

function getDataSelectForTabs(addons) {
  return addons.filter(
    (addon) => addon.addontype["$"] === "3" && addon.id["$"] !== "2195",
  );
}

function getDataBooleanForTabs(addons) {
  return addons.filter(
    (addon) =>
      addon.addontype["$"] === "1" ||
      addon.id["$"] === "2225" ||
      addon.id["$"] === "2195",
  );
}

function changeRangeValue(isVlan) {
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

      getValueFromRange(range, isVlan);
    });
  });
}

function changeRangeValueFromLabelInput() {
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
      getValueFromRange(range);
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
      getValueFromRange(range);
    });
  });
}

function changeCustomTab() {
  const tabsContainer = document.querySelectorAll(".custom-tabs");
  const tabLabels = document.querySelectorAll(".custom-tabs__tab label");
  tabsContainer.forEach((tab) => {
    const firstInput = tab.querySelector("label input");
    firstInput.checked = true;
  });

  tabLabels.forEach((label) => {
    const input = label.querySelector('input[type="radio"]');
    const groupName = input.name;
    const groupInputs = document.querySelectorAll(`input[name="${groupName}"]`);

    if (input.checked) {
      label.classList.add("label-active");
    }

    input.addEventListener("change", () => {
      const name = input.getAttribute("data-name");
      const price = input.getAttribute("data-value");

      vps_state[name] = {
        id: name === "support" || name === 'ipv6' ? input.name : input.id,
        value: input.value,
        price: +Number(price).toFixed(2),
      };

      updateTotalCost();

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

function getValueFromRange(range, isVlan) {
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
    vps_state[name] = {
      id: range.id,
      price: +Number(calculatedPrice).toFixed(2),
      value: +range.value,
    };
  } else if (name === "servers") {
    vps_state["servers"] = { id: null, value: +range.value, price: null };
    const order_button = document.getElementById("vlan_btn");
    if (order_button) {
      order_button.disabled = disableButton(+range.value, order_button);
    }
  } else if (name === "vlan") {
    vlan_state["vlan"] = {
      id: range.id,
      price: +Number(calculatedPrice).toFixed(2),
      value: +range.value,
    };
  }
  if (!isVlan) {
    updateTotalCost();
  } else {
    updateTotalVlanCost();
  }

  const normalizedValue = ((value - min) / (max - min)) * 100;

  fill_range.style.width = normalizedValue + "%";
  checkCurrentTick(sliderTicks, value);
}

function checkCurrentTick(sliderTicks, value) {
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

function selectOption() {
  const customSelect = document.querySelector(".custom-select");
  const trigger = customSelect.querySelector(".custom-select-trigger");
  const options = customSelect.querySelector(".custom-options");
  const arrow = customSelect.querySelector(".custom-select-arrow");

  trigger.addEventListener("click", function () {
    options.classList.toggle("open");
    if (options.classList.contains("open")) {
      trigger.classList.add("active");
      arrow.classList.add("arrow-rotate");
    } else {
      arrow.classList.remove("arrow-rotate");
      trigger.classList.remove("active");
    }
  });

  options.addEventListener("click", function (e) {
    if (e.target.classList.contains("custom-option")) {
      const id = e.target.getAttribute("data-value");
      vps_state["os"] = { id, value: 0, price: 0 };
      const selectedOption = e.target.innerText;
      trigger.querySelector("span").innerText = selectedOption;
      options.querySelectorAll(".custom-option").forEach((option) => {
        option.classList.remove("selected");
      });
      e.target.classList.add("selected");
      options.classList.remove("open");
      trigger.classList.remove("active");
      arrow.classList.remove("arrow-rotate");
    }
  });

  document.addEventListener("click", function (e) {
    if (!customSelect.contains(e.target)) {
      options.classList.remove("open");
      arrow.classList.remove("arrow-rotate");
      trigger.classList.remove("active");
    }
  });
}

function disableButton(value, btn) {
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
