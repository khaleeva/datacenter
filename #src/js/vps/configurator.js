class Configurator {
  constructor() {
    this.apiService = new ApiService();
    this.tariffCard = new TariffCard()
  }

  async start() {
    this.vps_calculator = document.querySelector(".vps__calculator");
    this.vlan_calculator = document.querySelector(".vlan__calculator");
    this.tariffLight = document.querySelector("#light");
    this.tariffOptima = document.querySelector("#optima");
    this.tariffBest = document.querySelector("#best");
    this.tariffMax = document.querySelector("#max");

    this.vps_calculator.innerHTML = "";
    this.vlan_calculator.innerHTML = "";

    this.tariffLight.innerHTML = card_loader;
    this.tariffOptima.innerHTML = card_loader;
    this.tariffBest.innerHTML = card_loader;
    this.tariffMax.innerHTML = card_loader;

    try {
      this.data = await this.apiService.getData();
      if (this.data) {
        this.tariffLight.classList.remove("tariff__details_loader");
        this.tariffOptima.classList.remove("tariff__details_loader");
        this.tariffBest.classList.remove("tariff__details_loader");
        this.tariffMax.classList.remove("tariff__details_loader");
        this.tariffLight.innerHTML = this.tariffCard.draw({data: this.data,  type: 'light', color_icon: 'black'})
        this.tariffOptima.innerHTML = this.tariffCard.draw({data: this.data,  type: 'optima', color_icon: 'black'})
        this.tariffBest.innerHTML = this.tariffCard.draw({data: this.data,  type: 'best', color_icon: 'white'})
        this.tariffMax.innerHTML = this.tariffCard.draw({data: this.data,  type: 'max', color_icon: 'white'})
      }
    } catch (error) {}

  }
}

const configurator = new Configurator();
configurator.start();
