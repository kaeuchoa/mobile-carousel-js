class SteamGamesService {

    API_URL = 'https://www.cheapshark.com/api/1.0/games';

    constructor(httpService) {
        this.httpService = httpService;
    }

    getListOfGames() {
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

export default SteamGamesService;