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

    login(email, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };

        return fetch(window.API_URL+this.userApiPath+"/login", requestOptions);
    }
}

export default new UserService();