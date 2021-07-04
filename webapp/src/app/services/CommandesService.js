class CommandesService {
    CommandesApiPath = '/commandes';

    getSupermarketOrders() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token") }
        };

        return fetch(window.API_URL+this.CommandesApiPath + '/getSupermarketOrders', requestOptions);
    }

    addSupermarketOrders(consumer, orderDate, deliveryDate, lots, price) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token") },
            body: JSON.stringify(
                {
                    'consumer': consumer,
                    'orderDate': orderDate,
                    'deliveryDate': deliveryDate,
                    'lots': lots,
                    'price': price,
                })
        };

        return fetch(window.API_URL+this.CommandesApiPath + '/addSupermarketOrders', requestOptions);
    }
}

export default new CommandesService();