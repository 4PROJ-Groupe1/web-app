class UserService {
    apiPath = '/register';

    register(email, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };

        fetch(window.API_URL+this.apiPath, requestOptions)
            .then(
                res => {
                    console.log('register response : ', res);
                },
                err => {
                    console.log('Registor error : ', err);
                }
            );
    }
}

export default new UserService();