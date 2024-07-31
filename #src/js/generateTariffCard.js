function getPriceForAddon(value, min, step, price) {
  const additionalSteps = Math.floor((value - min) / step);

  console.log(additionalSteps);

  const calculatedPrice = additionalSteps * price;
  return +Number(calculatedPrice).toFixed(2);
}

function createStateObject(vps_addons, addonValues, type) {
  const findAddon = (id) => vps_addons.find((d) => d.id["$"] === id);

  return {
    ram: {
      name: findAddon("2189").name_ru["$"],
      id: "2189",
      price: getPriceForAddon(
        addonValues.ram,
        +findAddon("2189").addonmin["$"],
        +findAddon("2189").addonstep["$"],
        findAddon("2189").price.period[0]["$cost"],
      ),
      value: addonValues.ram,
      measure: "ГБ",
      icon: type === "black" ? ram_icon : ram_icon_white,
    },
    ip4: {
      name: findAddon("2191").name_ru["$"],
      id: "2191",
      price: getPriceForAddon(
        addonValues.ip4,
        +findAddon("2191").addonmin["$"],
        +findAddon("2191").addonstep["$"],
        findAddon("2191").price.period[0]["$cost"],
      ),
      value: addonValues.ip4,
      measure: "Шт",
      icon: type === "black" ? check_icon : check_icon_white,
    },
    cpu: {
      name: findAddon("2192").name_ru["$"],
      id: "2192",
      price: getPriceForAddon(
        addonValues.cpu,
        +findAddon("2192").addonmin["$"],
        +findAddon("2192").addonstep["$"],
        findAddon("2192").price.period[0]["$cost"],
      ),
      value: addonValues.cpu,
      measure: "Шт",
      icon: type === "black" ? check_icon : check_icon_white,
    },
    space: {
      name: findAddon("2194").name_ru["$"],
      id: "2194",
      price: getPriceForAddon(
        addonValues.space,
        +findAddon("2194").addonmin["$"],
        +findAddon("2194").addonstep["$"],
        findAddon("2194").price.period[0]["$cost"],
      ),
      value: addonValues.space,
      measure: "ГБ",
      icon: type === "black" ? space_icon : space_icon_white,
    },
    backup: {
      name: "",
      id: "2211",
      price: getPriceForAddon(
        addonValues.backup + 10,
        +findAddon("2211").addonmin["$"],
        +findAddon("2211").addonstep["$"],
        findAddon("2211").price.period[0]["$cost"],
      ),
      value: addonValues.backup,
      measure: "ГБ",
      icon: type === "black" ? check_icon : check_icon_white,
    },
    os: {
      name: "",
      id: "VM6_ISPsystem_Windows-10-RUS",
      price: 0,
      value: 0,
      measure: "",
      icon: type === "black" ? check_icon : check_icon_white,
    },
    panel: {
      name: "Панель управления",
      id: addonValues.panel === "off" ? "111" : "110",
      price:
        addonValues.panel === "off"
          ? 0
          : +findAddon("2190").enumeration[1].enumerationitem[1].price
              .period[0]["$cost"],
      value: addonValues.panel,
      measure: "",
      icon: type === "black" ? check_icon : check_icon_white,
    },
    support: {
      name: "Администрирование сервера",
      id: 2225,
      price:
        addonValues.support === "off"
          ? 0
          : +findAddon("2225").price.period[0]["$cost"],
      value: addonValues.support,
      measure: "",
      icon: type === "black" ? check_icon : check_icon_white,
    },
  };
}

const light_state_values = {
  ram: 2,
  ip4: 1,
  cpu: 1,
  space: 5,
  backup: 10,
  panel: "off",
  support: "off",
};

const optima_state_values = {
  ram: 5,
  ip4: 2,
  cpu: 2,
  space: 20,
  backup: 40,
  panel: "on",
  support: "off",
};

const best_state_values = {
  ram: 8,
  ip4: 4,
  cpu: 4,
  space: 25,
  backup: 10,
  panel: "on",
  support: "on",
};

const max_state_values = {
  ram: 16,
  ip4: 8,
  cpu: 8,
  space: 25,
  backup: 40,
  panel: "on",
  support: "on",
};

function generateTariffDetails(baseSum, vps_addons, type) {
  const light_state = createStateObject(
    vps_addons,
    light_state_values,
    "black",
  );
  const optima_state = createStateObject(
    vps_addons,
    optima_state_values,
    "black",
  );
  const best_state = createStateObject(vps_addons, best_state_values, "white");
  const max_state = createStateObject(vps_addons, max_state_values, "white");

  const params_light = generateUrlParams(light_state);
  const params_optima = generateUrlParams(optima_state);
  const params_best = generateUrlParams(best_state);
  const params_max = generateUrlParams(max_state);

  const link_light = `https://my.datahata.by?func=register&redirect=startpage%3Dvds%26startform%3Dvds%252Eorder%252Eparam%26pricelist%3D2187%26period%3D1%26project%3D1%${params_light}`;
  const link_optima = `https://my.datahata.by?func=register&redirect=startpage%3Dvds%26startform%3Dvds%252Eorder%252Eparam%26pricelist%3D2187%26period%3D1%26project%3D1%${params_optima}`;
  const link_best = `https://my.datahata.by?func=register&redirect=startpage%3Dvds%26startform%3Dvds%252Eorder%252Eparam%26pricelist%3D2187%26period%3D1%26project%3D1%${params_best}`;
  const link_max = `https://my.datahata.by?func=register&redirect=startpage%3Dvds%26startform%3Dvds%252Eorder%252Eparam%26pricelist%3D2187%26period%3D1%26project%3D1%${params_max}`;

  const totalLightPrice = getTotalCardSum(baseSum, light_state);
  const totalOptimaPrice = getTotalCardSum(baseSum, optima_state);
  const totalBestPrice = getTotalCardSum(baseSum, best_state);
  const totalMaxPrice = getTotalCardSum(baseSum, max_state);

  switch (type) {
    case "light":
      return `<div class="tariff__card-detail">${generateBlockDetail("black", totalLightPrice, link_light, light_state.ram, light_state.space, light_state.ip4, light_state.cpu)}</div>`;
    case "optima":
      return `<div class="tariff__card-detail">${generateBlockDetail("black", totalOptimaPrice, link_optima, optima_state.ram, optima_state.space, optima_state.ip4, optima_state.cpu)}</div>`;
    case "best":
      return `<div class="tariff__card-detail">${generateBlockDetail("white", totalBestPrice, link_best, best_state.ram, best_state.space, best_state.ip4, best_state.cpu, best_state.panel)}</div>`;
    case "max":
      return `<div class="tariff__card-detail">${generateBlockDetail("white", totalMaxPrice, link_max, max_state.ram, max_state.space, max_state.ip4, max_state.cpu, max_state.panel, max_state.support)}</div>`;
    default:
      return `<div>${card_loader}</div>`;
  }
}

function generateBlockDetail(type, totalPrice, link, ...state) {
  const paragraphs = state
    .map(
      (s) =>
        `<div>${s.icon}<div><p>${typeof s.value === "string" ? "" : s.value}${s.measure}</p><p>${s.name}</p></div></div>`,
    )
    .join("");

  return `
            <div class="tariff__card-cost">  
                <p><span>${totalPrice}</span>&nbsp;BYN</p>
                <p style="color: ${type === "black" ? "rgba(0, 0, 0, 0.30)" : "rgba(255, 255, 255, 0.30)"}">за месяц</p>
            </div>
            <div class="tariff__card-characteristics">${paragraphs}</div>
            <button class='custom-button-brand ${type === 'black' ? "custom-button-brand_brand-outlined" : "custom-button-brand_brand-shadow"}' style="margin-top: auto; height: 48px; " onclick="window.open('${link}', '_blank');">Заказать</button>
          `;
}

function getTotalCardSum(baseSum, state) {
  let total = 0;
  for (let key in state) {
    if (state[key].price) {
      total += state[key].price;
    }
  }
  return ((total + baseSum) * 1.2).toFixed(2);
}
