class TariffCard {


    async draw({type, price, url, ...characteristics}) {
            this.characteristics = characteristics.map(
            (s) =>
                `<div>${s.value === 'off' ? "" : s.icon}<div><p>${typeof s.value === "string" ? "" : s.value}${s.measure}</p><p>${s.value === 'off' ? "" : s.name}</p></div></div>`,
        )
            .join("");
    }


    async generateTariffCharacteristic() {
        Object.values(tariff_values).map((tariff) => {
            console.log(tariff)
        })
    }
}