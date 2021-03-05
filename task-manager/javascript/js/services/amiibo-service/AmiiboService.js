class AmiiboService {

    API_URL = 'https://www.amiiboapi.com/api/amiibo/';

    constructor(httpService) {
        this.httpService = httpService;
    }

    getList() {
        return new Promise((resolve, reject) => {
            this.httpService.get(this.API_URL)
                .then(jsonResponse => {
                    if (jsonResponse) {
                        resolve(jsonResponse);
                    }
                })
                .catch(error => console.error('Request Failed: ' + error));
        })
    }

}

export default AmiiboService;