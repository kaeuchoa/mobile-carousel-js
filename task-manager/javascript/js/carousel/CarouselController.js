'use strict';

import CarouselView from './CarouselView.js';

class CarouselController {

    constructor() {
        this.view = new CarouselView();
        this.renderedView = null;
        this.nextBtn = null;
        this.previousBtn = null;
    }

    renderView() {
        if (this.view) {
            this.renderedView = this.view.render();
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
            this.nextBtn.addEventListener('click', () => console.log('bindNextBtnEvent'));
        } else {
            throw new Error('Next button is not rendered.');
        }
    }

    _bindPreviousBtnEvent() {
        if (this.previousBtn) {
            this.previousBtn.addEventListener('click', () => console.log('bindPreviousBtnEvent'));
        } else {
            throw new Error('Previous button is not rendered.');
        }
    }
}

export default CarouselController;