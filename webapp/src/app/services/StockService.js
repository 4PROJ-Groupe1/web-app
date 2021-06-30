class StockService {
    stockApiPath = '/stock';

    getCategories() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        return fetch(window.API_URL+this.stockApiPath + '/getCategories', requestOptions);
    }

    addCategory(categorie) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'categorie': categorie})
        };

        return fetch(window.API_URL+this.stockApiPath + '/addCategory', requestOptions);
    }
}

export default new StockService();