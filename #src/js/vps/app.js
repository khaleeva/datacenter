class App {
    constructor() {
        this.apiService = new ApiService();
        this.tariff = new Tariff();
        this.vps = new VpsConfigurator();
        this.vlan = new VlanConfigurator();

    }

    async start() {
        try {
            this.tariff.showHideLoader(true)
            this.data = await this.apiService.getData();
            if (this.data) {
                this.tariff.render(this.data)
                this.vps.render(this.data)
                this.vlan.render(this.data)
            }
        } catch (error) {
            console.error(error);
        }

    }
}

const app = new App();
app.start();
