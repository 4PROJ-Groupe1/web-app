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

    getLots() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        return fetch(window.API_URL+this.stockApiPath + '/getInfosLot', requestOptions);
    }

    getProducts() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        return fetch(window.API_URL+this.stockApiPath + '/getInfosProduit', requestOptions);
    }

    getProduitByIdProducer(idProducer) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'idProducer': idProducer})
        };
        
        return fetch(window.API_URL+this.stockApiPath + '/getProduitByIdProducer', requestOptions);
    }

    deleteProduit(idProduit) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'idProduit': idProduit})
        };

        return fetch(window.API_URL+this.stockApiPath + '/deleteProduit', requestOptions);
    }

    addProduit(name, category, producer, prix) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'name': name, 'category': category, 'producer': producer, 'prix': prix})
        };

        return fetch(window.API_URL+this.stockApiPath + '/addProduit', requestOptions);
    }

    getRayons() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        return fetch(window.API_URL+this.stockApiPath + '/getInfosRayons', requestOptions);
    }
}

export default new StockService();