class StockService {
    stockApiPath = '/stock';

    //#region Categories
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
    //#endregion

    //#region Lots
    getLots() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        return fetch(window.API_URL+this.stockApiPath + '/getInfosLot', requestOptions);
    }
    getLot(idLot) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'idLot': idLot})
        };

        return fetch(window.API_URL+this.stockApiPath + '/getLot', requestOptions);
    }

    addLot(idProduit, numLot, quantity, expiration) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'idProduit': idProduit, 'numLot': numLot, 'quantity': quantity, 'expiration': expiration})
        };

        return fetch(window.API_URL+this.stockApiPath + '/addLot', requestOptions);
    }
    //#endregion

    //#region Products
    getProducts() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        return fetch(window.API_URL+this.stockApiPath + '/getInfosProduit', requestOptions);
    }

    getProduit(idProduit) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'idProduit': idProduit})
        };

        return fetch(window.API_URL+this.stockApiPath + '/getProduit', requestOptions);
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
    //#endregion

    //#region Rayons
    getRayons() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        return fetch(window.API_URL+this.stockApiPath + '/getInfosRayons', requestOptions);
    }
    //#endregion
}

export default new StockService();