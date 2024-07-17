async function getDataFromBillmng() {
  const url = `https://my.datahata.by/billmgr?func=pricelist.export&elid=1&out=json&onlyavailable=on`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    console.error(e);
  } finally {
    console.log("Finally");
  }
}

let vps_state = {};

document.addEventListener("DOMContentLoaded", async () => {
  const vps_calculator = document.querySelector(".vps__calculator");

  if (vps_calculator) {
    const response = await getDataFromBillmng();
    const typeOfService = response.doc.pricelist;
    const vps = typeOfService.filter((i) => i.itemtype["$"] === "3");
    const vps_addons = vps[0].addon;

    const dataForRange = getDataForRange(vps_addons);
    const dataSelectForTab = getDataSelectForTabs(vps_addons);
    const dataBooleanForTab = getDataBooleanForTabs(vps_addons);

    const innerHTMLRanges = generateCustomVpsRange(dataForRange);
    const innerHTMLSelectTabs = generateCustomVpsTabs(dataSelectForTab);
    const innerHTMLBooleanTabs = generateCustomVpsTabs(dataBooleanForTab);

    const innerHTMLTabs = innerHTMLSelectTabs.concat(innerHTMLBooleanTabs)


    generateInputsContainer(vps_calculator, innerHTMLRanges);
    generateInputsContainer(vps_calculator, innerHTMLTabs);
    changeRangeValue();
    changeCustomTab();
  }
});





function generateInputsContainer(container, innerHTML) {
  const div = document.createElement("div");
  div.classList.add("vps__calculator-container");
  div.innerHTML = innerHTML;
  container.append(div);
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
        const tabsContainer = document.querySelectorAll('.custom-tabs')
        const tabLabels = document.querySelectorAll('.custom-tabs__tab label')
        tabsContainer.forEach((tab) => {
            const firstInput = tab.querySelector('label input')
            firstInput.checked = true
        })


        tabLabels.forEach((label) => {
            const input = label.querySelector('input[type="radio"]')
            const groupName = input.name
            const groupInputs = document.querySelectorAll(
                `input[name="${groupName}"]`
            )

            if (input.checked) {
                label.classList.add('label-active')
            }

            input.addEventListener('change', () => {
                const name = input.getAttribute('data-name')
                const price = input.getAttribute('data-value')

                vps_state[name] = {
                    id: name === 'support' ? input.name : input.id,
                    value: input.value,
                    price: +Number(price).toFixed(2),
                }

                groupInputs.forEach((groupInput) => {
                    const groupLabel = groupInput.closest('label')
                    if (groupLabel) {
                        groupLabel.classList.remove('label-active')
                    }
                })

                if (input.checked) {
                    label.classList.add('label-active')
                }
            })
        })
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
    vps_state[name] = { value: range.value };
  }

  console.log(vps_state);

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
