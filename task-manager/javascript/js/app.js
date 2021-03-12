'use strict'
import CarouselController from './carousel/CarouselController.js';
import CPModel from './carousel/CarouselPageModel.js';
import PagingController from './paging/PagingController.js';
import HttpService from './services/HttpService.js';
import AmiiboService from './services/amiibo-service/AmiiboService.js';
import State from './State.js';
import { Constants } from './misc.js';

class App {
    constructor() {
        this.mainMockFrame = document.getElementById('main-mock-frame');
        this.amiiboService = new AmiiboService(new HttpService());
        this._setInitialState();
        this._loadData();

        this.pagingController = new PagingController(this.state.get(Constants.STATE_PAGE_LIST));
        this.carouselController = new CarouselController(this.state.get(Constants.STATE_PAGE_LIST), this.pagingController);

        this.state.subscribe(data => {
            if (this._stateContainsRightData(data)) {
                const renderedPaging = this.pagingController.renderView(data[Constants.STATE_PAGE_LIST])
                const renderedCarousel = this.carouselController.renderView(data[Constants.STATE_PAGE_LIST], renderedPaging);
                this.pagingController.updatePagingView();
                this._updateView(renderedCarousel);
            }
        });

        this.carouselController.subscribe(data => {
            this._updateCurrentCarouselState(data);
        });
    }

    _stateContainsRightData(data) {
        return data.hasOwnProperty(Constants.STATE_PAGE_LIST) && data.hasOwnProperty(Constants.STATE_PAGE_INDEX);
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

    _updateCurrentCarouselState(eventData) {
        if (eventData) {
            // check filipe deschamps' obj method to reduce ifs/switchs
            switch (eventData.event) {
                case CarouselController.actions.PREVIOUS_BTN:
                    this._decreaseCurrentPageIndexState();
                    break;
                case CarouselController.actions.NEXT_BTN:
                    this._increaseCurrentPageIndexState();
                    break;

            }
        }
    }

    _increaseCurrentPageIndexState() {
        let currentPageIndex = this.state.get(Constants.STATE_PAGE_INDEX);
        let pageListCount = this.state.get(Constants.STATE_PAGE_LIST).length - 1;
        if (currentPageIndex < pageListCount) {
            currentPageIndex++;
            this.state.set(Constants.STATE_PAGE_INDEX, currentPageIndex);
        }
    }

    _decreaseCurrentPageIndexState() {
        let currentPageIndex = this.state.get(Constants.STATE_PAGE_INDEX);
        if (currentPageIndex > 0) {
            currentPageIndex--;
            this.state.set(Constants.STATE_PAGE_INDEX, currentPageIndex);
        }
    }

    _updateView(newNode) {
        this.mainMockFrame.innerHTML = '';
        this.mainMockFrame.appendChild(newNode);
    }

    run() {
        const renderedCarousel = this.carouselController.renderView(this.state.get(Constants.STATE_PAGE_LIST));
        if (renderedCarousel) {
            this._updateView(renderedCarousel);
        } else {
            throw new Error('The view was not rendered correctly');
        }
    }
}

export default App;