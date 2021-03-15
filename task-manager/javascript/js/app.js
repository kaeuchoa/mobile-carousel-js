'use strict'
import CarouselController from './carousel/CarouselController.js';
import CPModel from './carousel/CarouselPageModel.js';
import PagingController from './paging/PagingController.js';
import HttpService from './services/HttpService.js';
import AmiiboService from './services/amiibo-service/AmiiboService.js';
import State from './State.js';
import { Constants } from './misc.js';

// notes: Controllers will know and manage state

class App {
    constructor() {
        this.mainMockFrame = document.getElementById('main-mock-frame');
        this.amiiboService = new AmiiboService(new HttpService());
        this._setInitialState();
        this._loadData();

        this.pagingController = new PagingController();
        this.carouselController = new CarouselController();
    }

    _setInitialState() {
        this.state = new State();
        this.state.set(Constants.STATE_PAGE_LIST, []);
        this.state.set(Constants.STATE_PAGE_INDEX, 0);
    }

    _loadData() {
        this.amiiboService.getList().then(list => {
            const cpModelList = [];
            for (let i = 0; i < Constants.MAX_RESULTS; i++) {
                let item = list.amiibo[i];
                cpModelList.push(new CPModel(item.character, item.name, item.image));
            }
            this.state.set(Constants.STATE_PAGE_LIST, cpModelList);
        });
    }

    _updateView(newNode) {
        this.mainMockFrame.innerHTML = '';
        this.mainMockFrame.appendChild(newNode);
    }

    run() {
        const renderedPaging = this.pagingController.renderView();
        const renderedCarousel = this.carouselController.renderView(renderedPaging);
        if (renderedCarousel) {
            this._updateView(renderedCarousel);
        } else {
            throw new Error('The view was not rendered correctly');
        }
    }
}

export default App;