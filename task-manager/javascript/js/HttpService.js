class HttpService {

    get(url) {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this._status)
        .then(this._json);
    }

    _status(response) {
        if (response.status >= 200 && response.status <= 300) {
            return Promise.resolve(response)
        } 
        return Promise.reject(new Error(response.statusText));
    }

    _json(response) {
        return response.json();
    }
}

export default HttpService;