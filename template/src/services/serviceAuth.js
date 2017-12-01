import axios from "axios";

export class ServiceAuth {
    constructor () {
        var parser = document.createElement("a");
        parser.href = document.href;

        this.endpoint = "/api/login";

        axios.defaults.withCredentials = true;
    }

    login (username, password) {
        return axios.post(this.endpoint, {
            username: username,
            password: password,
        });
    }

    getUserAsync () {
        return axios.get(this.endpoint);
    }

    getUser () {
        var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.responseType = "application/json";

        request.open("GET", this.endpoint, false); // `false` makes the request synchronous
        request.send(null);

        if (request.status === 200) { // authentifié
            return JSON.parse(request.response);
        }
        // pas authentifié
        return null;
    }

    logout () {
        return axios.delete(this.endpoint);
    }
}
