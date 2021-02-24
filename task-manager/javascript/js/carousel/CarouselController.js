'use strict';

import CarouselView from './CarouselView.js';
import PagingView from '../paging/PagingView.js';

class CarouselController {

    constructor() {
        this.view = new CarouselView(new PagingView());
        this.renderedView = null;
        this.nextBtn = null;
        this.previousBtn = null;
    }

    renderView() {
        if (this.view) {
            this.renderedView = this.view.renderElement();
            if (this.renderedView) {
                this.previousBtn = this.renderedView.querySelector(CarouselView.jsPreviousBtnSelector);
                this.nextBtn = this.renderedView.querySelector(CarouselView.jsNextBtnSelector);
                this._bindPreviousBtnEvent();
                this._bindNextBtnEvent();
                return this.renderedView;
            }
        }
        return null;
    }

    _bindNextBtnEvent() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', this._loadNextPage);
        } else {
            throw new Error('Next button is not rendered.');
        }
    }

    _bindPreviousBtnEvent() {
        if (this.previousBtn) {
            this.previousBtn.addEventListener('click', this._loadPreviousPage);
        } else {
            throw new Error('Previous button is not rendered.');
        }
    }

    _loadPreviousPage() {
        console.log('hello previous page');
    }

    _loadNextPage() {
        console.log('hello next page');
    }
}

export default CarouselController;