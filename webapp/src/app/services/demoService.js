class DemoService {
    getPanier() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token") }
        };

        return fetch(window.API_URL+ '/demo/getPanier', requestOptions);
    }

    getRecommendation(nomProduit) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        return fetch('https://apiml.brilliant-market.com/recommend?article=' + nomProduit, requestOptions);
    }
}

export default new DemoService();