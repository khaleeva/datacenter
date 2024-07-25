const addToBasket = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M17.8125 16.875C17.8125 17.1236 17.7137 17.3621 17.5379 17.5379C17.3621 17.7137 17.1236 17.8125 16.875 17.8125H3.125C2.87636 17.8125 2.6379 17.7137 2.46209 17.5379C2.28627 17.3621 2.1875 17.1236 2.1875 16.875C2.1875 16.6264 2.28627 16.3879 2.46209 16.2121C2.6379 16.0363 2.87636 15.9375 3.125 15.9375H16.875C17.1236 15.9375 17.3621 16.0363 17.5379 16.2121C17.7137 16.3879 17.8125 16.6264 17.8125 16.875ZM6.25 14.0625C6.37315 14.0626 6.49511 14.0384 6.60892 13.9914C6.72273 13.9443 6.82615 13.8753 6.91328 13.7883L14.0625 6.64062V11.875C14.0625 12.1236 14.1613 12.3621 14.3371 12.5379C14.5129 12.7137 14.7514 12.8125 15 12.8125C15.2486 12.8125 15.4871 12.7137 15.6629 12.5379C15.8387 12.3621 15.9375 12.1236 15.9375 11.875V4.375C15.9375 4.12636 15.8387 3.8879 15.6629 3.71209C15.4871 3.53627 15.2486 3.4375 15 3.4375H7.5C7.25136 3.4375 7.0129 3.53627 6.83709 3.71209C6.66127 3.8879 6.5625 4.12636 6.5625 4.375C6.5625 4.62364 6.66127 4.8621 6.83709 5.03791C7.0129 5.21373 7.25136 5.3125 7.5 5.3125H12.7344L5.58672 12.4617C5.45546 12.5928 5.36605 12.7599 5.32982 12.9419C5.29358 13.1239 5.31215 13.3125 5.38317 13.4839C5.45418 13.6553 5.57446 13.8017 5.72877 13.9047C5.88307 14.0077 6.06447 14.0626 6.25 14.0625Z" fill="white" fill-opacity="0.9"/>
</svg>`;

async function getDataFromBillmng() {
  const url = `https://my.datahata.by/billmgr?func=pricelist.export&elid=1&out=json&onlyavailable=on`;
  try {
    const vps_calculator = document.querySelector(".vps__calculator");
    vps_calculator.innerHTML = loader;
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    console.error(e);
  } finally {
    const vps_calculator = document.querySelector(".vps__calculator");
    vps_calculator.innerHTML = "";
  }
}

let vps_state = {};
let baseSum = 0;
let vps_order_url = "";

document.addEventListener("DOMContentLoaded", async () => {
  const vps_calculator = document.querySelector(".vps__calculator");

  if (vps_calculator) {
    const response = await getDataFromBillmng();
    const typeOfService = response.doc.pricelist;
    const vps = typeOfService.filter((i) => i.itemtype["$"] === "3");
    const vps_addons = vps[0].addon;

    baseSum = Number(vps[0].price.period[0]["$cost"]);

    console.log(vps);

    const dataForRange = getDataForRange(vps_addons);
    const dataSelectForTab = getDataSelectForTabs(vps_addons);
    const dataBooleanForTab = getDataBooleanForTabs(vps_addons);
    const dataForSelect = vps[0].itemtypeparam.find(
      (i) => i.id["$"] == "106",
    ).itemtypeparamvalue;

    dataForRange.forEach((addon) => {
      initValue(
        getVPSAddonName[addon.name_ru["$"]],
        addon.id["$"],
        getMinValue(addon.name_ru["$"], addon.addonmin["$"]),
        0,
      );
    });

    initValue("os", dataForSelect[0].intname["$"], 0, 0);

    initValue("service", vps[0].id["$"], 1, 0);

    dataSelectForTab.forEach((addon) => {
      addon.enumeration[1].enumerationitem.forEach((d) =>
        initValue(
          addon.intname["$"],
          d.id["$"],
          "on",
          Number(d.price.period[0]["$cost"]),
        ),
      );
    });

    dataBooleanForTab.forEach((addon) => {
      initValue(
        "support",
        addon.id["$"],
        "on",
        Number(addon.price.period[0]["$cost"]),
      );
    });

    console.log(vps_state);

    const innerHTMLRanges = generateCustomVpsRange(dataForRange);
    const innerHTMLSelectTabs = generateCustomVpsTabs(dataSelectForTab);
    const innerHTMLBooleanTabs = generateCustomVpsTabs(dataBooleanForTab);

    const innerHTMLSelect = generateCustomSelect(dataForSelect);

    const servicesRange = `<div class="custom-range">
      <div class="custom-range__label">${getIcon["Количество серверов для заказа"]}
        <p>Количество серверов для заказа</p>
        <div  class="label" data-value="шт">${1}<span>шт</span></div>
      </div>
      <div class="custom-range__slider">
        <span class="custom-range__slider-track"></span>
        <div class="custom-range__slider-progress">
          <span class="fill"></span>
        </div>
        <input
            data-name='service'
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

    const innerHTMLAllRanges = innerHTMLRanges.concat(servicesRange);
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

function generateUrlParams(state) {
  const ram = state.ram ? `26addon_${state.ram.id}%3D${state.ram.value}` : "";
  const cpu = state.cpu ? `26addon_${state.cpu.id}%3D${state.cpu.value}` : "";
  const ip4 = state.ip4 ? `26addon_${state.ip4.id}%3D${state.ip4.value}` : "";
  const port = state.port
    ? `26addon_${state.port.id}%3D${state.port.value}`
    : "";
  const space = state.space
    ? `26addon_${state.space.id}%3D${state.space.value}`
    : "";
  const backup = state.backup
    ? state.backup.value === 0
      ? `26addon_2208%3D2210`
      : `26addon_2208%26addon_${state.backup.id}%3D${state.backup.value}`
    : "";
  const panel = state.panel ? `26addon_2190%3D${state.panel.id}` : "";
  const support = state.support
    ? `26addon_${state.support.id}%3D${state.support.value}`
    : "";
  const ipv6subnet_prefix =
    state.ipv6subnet_prefix && state.ipv6subnet_prefix.id !== "ipv6"
      ? `26addon_2198%3D${state.ipv6subnet_prefix.id}`
      : `26addon_2198%3D81`;

  const os = state.os ? `26ostempl%3D${state.os.id}` : "";
  const service = state.service ? `26order_count%3D${state.service.value}` : "";

  return `${ram}%${cpu}%${ip4}%${port}%${space}%${backup}%${panel}%${support}%${ipv6subnet_prefix}%${service}%${os}`;
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
  return ((total + baseSum) * 1.2 * vps_state["service"].value).toFixed(2);
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
    (addon) => addon.addontype["$"] === "1" && addon.id["$"] === "2225",
  );
}

function changeRangeValue() {
  const ranges = document.querySelectorAll(".custom-range__slider-input");
  ranges.forEach((range) => {
    range.addEventListener("input", () => {
      const mainParent = range.parentNode.parentNode;
      const valueElemOutput = mainParent.querySelector(
        ".custom-range__label .label",
      );
      const measure = valueElemOutput.getAttribute("data-value");
      valueElemOutput.innerHTML = `${range.value} ${measure}`;
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
        id: name === "support" ? input.name : input.id,
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

function getValueFromRange(range) {
  let fill_range = range.previousElementSibling.querySelector(".fill");
  const sliderTicks = range.nextElementSibling;
  const value = range.value;
  const min = range.min;
  const max = range.max;

  const price = range.getAttribute("data-value");
  const name = range.getAttribute("data-name");

  if (name !== "service") {
    vps_state[name] = {
      id: range.id,
      price: +Number(price * range.value - price * range.min).toFixed(2),
      value: range.value,
    };
  } else {
    vps_state["service"] = { id: null, value: range.value, price: null };
  }

  updateTotalCost();
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
