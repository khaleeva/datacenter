class Tariff {
    constructor() {
        this.tariffCard = new TariffCard();
        this.vps_calculator = document.querySelector(".vps__calculator");
        this.vlan_calculator = document.querySelector(".vlan__calculator");
        this.cards = document.querySelectorAll(".tariff__details");
    }

    showHideLoader(isLoading) {
        if (isLoading) {
            this.vps_calculator.innerHTML = "";
            this.vlan_calculator.innerHTML = "";
            this.cards.forEach((card) => {
                card.innerHTML = card_loader;
                card.classList.add("tariff__details_loader");
            })
            this.vps_calculator.innerHTML = loader;
            this.vlan_calculator.innerHTML = loader;

        } else {
            this.cards.forEach((card) => {
                card.classList.remove("tariff__details_loader")
            })
            this.vps_calculator.innerHTML = "";
            this.vlan_calculator.innerHTML = "";
        }
    }

    render(data) {
        if (data) {
            this.showHideLoader(false)
            this.cards.forEach((card) => {
                this.id = card.id;
                this.color = card.getAttribute('data-color');
                card.innerHTML = this.tariffCard.draw({data, type: this.id, color_icon: this.color})
            })
        }

    }
}


