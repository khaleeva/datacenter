class App {
    constructor() {
        this.apiService = new ApiService();
        this.tariff = new Tariff();
        this.vps = new VpsConfigurator();
        this.vlan = new VlanConfigurator();


    }

    async start() {
        this.tariff.showHideLoader(true)
        try {
            // this.vps_calculator.innerHTML = loader;
            // this.vlan_calculator.innerHTML = loader;
            this.data = await this.apiService.getData();
            if (this.data) {
                // this.vps_calculator.innerHTML =
                // this.vlan_calculator.innerHTML = '';
                this.tariff.render(this.data)
                this.vps.render(this.data)
                this.vlan.render(this.data)
            }
        } catch (error) {
            console.error(error);
        }

    }
}


window.addEventListener('DOMContentLoaded', async () => {
    const app = new App();
    const vpsPage = document.querySelector('.vps');
    if (vpsPage) {
        await app.start();
    }
})

