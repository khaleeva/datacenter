class App {
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
      this.vps_addons = await this.apiService.getData();
      if (this.vps_addons) {
        this.tariffLight.classList.remove("tariff__details_loader");
        this.tariffOptima.classList.remove("tariff__details_loader");
        this.tariffBest.classList.remove("tariff__details_loader");
        this.tariffMax.classList.remove("tariff__details_loader");
        // await this.tariffCard.generateTariffCharacteristic()
      }
    } catch (error) {}

  }
}

const app = new App();
await app.start();
