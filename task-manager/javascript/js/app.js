'use strict'
import CarouselController from './carousel/CarouselController.js';
import CPModel from './carousel/CarouselPageModel.js';
import PagingController from './paging/PagingController.js';

// TODO: Create a state class to make it observable, then I'm gonna update the view based on subscription on state

class App {
    constructor() {
        this.mainMockFrame = document.getElementById('main-mock-frame');
        this.pageList = [
            new CPModel("Lorem Ipsum", "Lorem ipsum dolor, sit amet consectetur adipisicing elit."), 
            new CPModel("Nulla lorem eros", "Nulla lorem eros, facilisis ac."), 
            new CPModel("Integer", "Integer non mauris a elit.")
        ];
        this.pagingController = new PagingController(this.pageList);
        this.carouselController = new CarouselController(this.pageList, this.pagingController);

        this.carouselController.subscribe(data => this._updateCurrentCarouselState(data));
        this.carouselController.subscribe(data => this._updatePaging(data));

        // simple state just for the sake of having one global state
        window.state = {
            currentCarouselScreen: 0
        };
    }

    _updateCurrentCarouselState(eventData) {
        if (eventData) {
            // check filipe deschamps' obj method to reduce ifs/switchs
            switch(eventData.event) {
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
            const newState = {...window.state};
            newState.currentCarouselScreen++;
            window.state = {...newState};
        }
    }

    _decreaseCurrentCarouselScreenState() {
        if (window.state.currentCarouselScreen > 0) {
            const newState = {...window.state};
            newState.currentCarouselScreen--;
            window.state = {...newState};
        }
    }

    run() {
        const renderedCarousel = this.carouselController.renderView();
        if (renderedCarousel) {
            this.mainMockFrame.appendChild(renderedCarousel);
        } else {
            throw new Error('The view was not rendered correctly');
        }
    }
}

export default App;