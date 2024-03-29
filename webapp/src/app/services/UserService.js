class UserService {
    registerApiPath = '/register';
    userApiPath = '/user';

    register(name, surname, email, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, surname: surname, email: email, password: password })
        };

        return fetch(window.API_URL+this.registerApiPath, requestOptions);
    }

    addProducer(name, surname, company, email, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token")},
            body: JSON.stringify({ name: name, surname: surname, email: email, password: password, producer: true, company: company})
        };

        return fetch(window.API_URL+this.registerApiPath, requestOptions);
    }

    login(email, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };

        return fetch(window.API_URL+this.userApiPath+"/login", requestOptions);
    }

    getUser(id) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token") },
            body: JSON.stringify({ "id": id })
        };

        return fetch(window.API_URL+this.userApiPath+"/getUser", requestOptions);
    }

    getAllUser() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.localStorage.getItem("jwt_token") }
        };

        return fetch(window.API_URL+this.userApiPath+"/getAllUser", requestOptions);
    }

    verifyToken(token) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        };

        return fetch(window.API_URL+this.userApiPath+"/verifyToken", requestOptions);
    }
}

export default new UserService();