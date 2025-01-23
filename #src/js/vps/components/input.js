class InputRange {




    draw(addon) {
        return addon.id["$"] === "2244"
            ? `<span class="custom-range__label-span">${this.getMinValue(addon.name_ru["$"], addon.addonmin["$"])}</span>`
            : `<input class="custom-range__label-input" type="number"
               step=${addon.addonstep["$"]}
               min=${this.getMinValue(addon.name_ru["$"], addon.addonmin["$"])}
               max=${addon.addonmax["$"]}
               value=${this.getMinValue(addon.name_ru["$"], addon.addonmin["$"])}
        />`;
    }

    getMinValue(name, value) {
        return name === 'Купить место для бэкапов' ? 0 : +value
    }

}