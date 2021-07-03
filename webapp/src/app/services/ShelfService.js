class ShelfService {
    shelfApiPath = '/rayon';

    getInfosRayons() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        return fetch(window.API_URL+this.shelfApiPath + '/getInfosRayons', requestOptions);
    }

    addRayon(rayon) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'nomRayon': rayon})
        };

        return fetch(window.API_URL+this.shelfApiPath + '/addRayon', requestOptions);
    }

    addProduitRayon(idRayon, idProduit, quantiteMax) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'idRayon': idRayon, 'idProduit': idProduit, 'quantiteMax': quantiteMax})
        };

        return fetch(window.API_URL+this.shelfApiPath + '/addProduitRayon', requestOptions);
    }

    fillRayon(idRayon) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'idRayon': idRayon})
        };

        return fetch(window.API_URL+this.shelfApiPath + '/fillRayon', requestOptions);
    }
}

export default new ShelfService();