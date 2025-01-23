class Tariff {
    constructor() {
        this.tariffCard = new TariffCard();
        this.cards = document.querySelectorAll(".tariff__details");
    }

    showHideLoader(isLoading) {
        if (isLoading) {

            this.cards.forEach((card) => {
                card.innerHTML = card_loader;
                card.classList.add("tariff__details_loader");
            })


        } else {
            this.cards.forEach((card) => {
                card.classList.remove("tariff__details_loader")
            })

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


