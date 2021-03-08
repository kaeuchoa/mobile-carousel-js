'use strict'
import CarouselController from './carousel/CarouselController.js';
import CPModel from './carousel/CarouselPageModel.js';
import PagingController from './paging/PagingController.js';
import HttpService from './services/HttpService.js';
import AmiiboService from './services/amiibo-service/AmiiboService.js';
import State from './State.js';

class App {
    constructor() {
        this.mainMockFrame = document.getElementById('main-mock-frame');
        this.amiiboService = new AmiiboService(new HttpService());
        this.state = new State();
        this.state.set('pageList', []);
        this.state.set('currentPageIndex', 0);
        this.amiiboService.getList().then(list => {
            const cpModelList = [];
            for (let i = 0; i < 3; i++) {
                let item = list.amiibo[i];
                cpModelList.push(new CPModel(item.character, item.name, item.image));
            }
            this.state.set('pageList', cpModelList);
        });

        this.pagingController = new PagingController(this.state.get('pageList'));
        this.carouselController = new CarouselController(this.state.get('pageList'), this.pagingController);

        this.state.subscribe(data => {
            if (data.hasOwnProperty('pageList')) {
                const renderedCarousel = this.carouselController.renderView(data['pageList']);
                this._updateMainMockFrame(renderedCarousel);
            }
        });

        // simple state just for the sake of having one global state
        // window.state = {
        //     currentCarouselScreen: 0
        // };
    }

    _updateCurrentCarouselState(eventData) {
        if (eventData) {
            // check filipe deschamps' obj method to reduce ifs/switchs
            switch (eventData.event) {
                case CarouselController.actions.PREVIOUS_BTN:
                    this._decreaseCurrentCarouselScreenState();
                    break;
                case CarouselController.actions.NEXT_BTN:
                    this._increaseCurrentCarouselScreenState();
                    break;

            }
        }
    }

    _updatePaging(eventData) {
        // state increase and decrease happens before, so I just need to update 
        // the paging view based on the current state number
        if (eventData) {
            this.pagingController.updatePagingView();
        }
    }

    _increaseCurrentCarouselScreenState() {
        if (window.state.currentCarouselScreen < this.pageList.length - 1) {
            const newState = { ...window.state };
            newState.currentCarouselScreen++;
            window.state = { ...newState };
        }
    }

    _decreaseCurrentCarouselScreenState() {
        if (window.state.currentCarouselScreen > 0) {
            const newState = { ...window.state };
            newState.currentCarouselScreen--;
            window.state = { ...newState };
        }
    }

    _updateMainMockFrame(renderedCarousel) {
        this.mainMockFrame.innerHTML = '';
        this.mainMockFrame.appendChild(renderedCarousel);
    }

    run() {
        const renderedCarousel = this.carouselController.renderView(this.state.get('pageList'));
        if (renderedCarousel) {
            this.mainMockFrame.appendChild(renderedCarousel);
        } else {
            throw new Error('The view was not rendered correctly');
        }
    }
}

export default App;