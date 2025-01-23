

class ApiService {
    FETCH_URL = 'https://my.datahata.by/billmgr?func=pricelist.export&elid=1&out=json&onlyavailable=on';

    async getData() {
        try {
            const response = await fetch(`${this.FETCH_URL}`);
            const data = await response.json();
            if(data){
                const typeOfService = data.doc.pricelist;
                const vps = typeOfService.filter((i) => i.itemtype["$"] === "3");
                const vps_addons = vps[0].addon;
                return {vps_addons}

            }

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // async getWinners() {
    //     try {
    //         const response = await fetch(`${this.FETCH_URL}/winners`);
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // }
    //
    // async createCar(carData: { name: ICar['name']; color: ICar['color'] }) {
    //     try {
    //         const response = await fetch(`${this.FETCH_URL}/garage`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(carData),
    //         });
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // }
    //
    // async removeCar(id: ICar['id']) {
    //     try {
    //         const response = await fetch(`${this.FETCH_URL}/garage/${id}`, {
    //             method: 'DELETE',
    //         });
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // }
    //
    // async startStopCarsEngine(id: ICar['id'], status: StatusEngine) {
    //     try {
    //         const response = await fetch(`${this.FETCH_URL}/engine?id=${id}&status=${status}`, {
    //             method: 'PATCH',
    //         });
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // }
    //
    // async getCar(id: ICar['id']) {
    //     try {
    //         const response = await fetch(`${this.FETCH_URL}/garage/${id}`);
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // }
    //
    // async updateCar(carData: { name: ICar['name']; color: ICar['color']; id: ICar['id'] }) {
    //     try {
    //         const response = await fetch(`${this.FETCH_URL}/garage/${carData.id}`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(carData),
    //         });
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // }
}

