'use strict'
import CarouselController from './carousel/CarouselController.js';
import CPModel from './carousel/CarouselPageModel.js';
import PagingController from './paging/PagingController.js';
import HttpService from './services/HttpService.js';
import AmiiboService from './services/amiibo-service/AmiiboService.js';

// TODO: Create a state class to make it observable, then I'm gonna update the view based on subscription on state

class App {
    constructor() {
        this.mainMockFrame = document.getElementById('main-mock-frame');
        this.amiiboService = new AmiiboService(new HttpService());
        this.pageList = [];
        this.amiiboService.getList().then(list => {
            console.log('returned');
            for (let i = 0; i < 3; i++) {
                let item = list.amiibo[i];
                this.pageList.push(new CPModel(item.character, item.name, item.image));
            }
            this.pagingController = new PagingController(this.pageList);
            this.carouselController = new CarouselController(this.pageList, this.pagingController);

            this.carouselController.subscribe(data => this._updateCurrentCarouselState(data));
            this.carouselController.subscribe(data => this._updatePaging(data));
        });


        // simple state just for the sake of having one global state
        window.state = {
            currentCarouselScreen: 0
        };
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

    run() {
        setTimeout(() => {
            console.log('render');
            const renderedCarousel = this.carouselController.renderView();
            if (renderedCarousel) {
                this.mainMockFrame.appendChild(renderedCarousel);
            } else {
                throw new Error('The view was not rendered correctly');
            }
        }, 3000);
    }
}

export default App;