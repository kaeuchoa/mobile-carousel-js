'use strict';

import CarouselView from './CarouselView.js';
import PagingView from '../paging/PagingView.js';
import CPModel from './CarouselPageModel.js';

class CarouselController {
    constructor() {
        const arr = [
            new CPModel("Lorem Ipsum", "Lorem ipsum dolor, sit amet consectetur adipisicing elit."), 
            new CPModel("Nulla lorem eros", "Nulla lorem eros, facilisis ac."), 
            new CPModel("Integer", "Integer non mauris a elit.")
        ];
        this.view = new CarouselView(new PagingView(), arr);
        this.renderedView = null;
        this.nextBtn = null;
        this.previousBtn = null;
        this.pageList = null;
        this.state = {
            currentIndex: 0
        }
        this.pageCount = arr.length;
    }

    renderView() {
        if (this.view) {
            this.renderedView = this.view.renderElement();
            if (this.renderedView) {
                this._queryElements();
                this._bindPreviousBtnEvent();
                this._bindNextBtnEvent();
                return this.renderedView;
            }
        }
        return null;
    }

    _queryElements() {
        this.previousBtn = this.renderedView.querySelector(CarouselView.jsPreviousBtnSelector);
        this.nextBtn = this.renderedView.querySelector(CarouselView.jsNextBtnSelector);
        this.pageList = this.renderedView.querySelector(CarouselView.jsPageListSelector);
    }

    _bindNextBtnEvent() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this._loadNextPage());
        } else {
            throw new Error('Next button is not rendered.');
        }
    }

    _bindPreviousBtnEvent() {
        if (this.previousBtn) {
            this.previousBtn.addEventListener('click', () => this._loadPreviousPage());
        } else {
            throw new Error('Previous button is not rendered.');
        }
    }

    _loadPreviousPage() {
        if (this.pageList) {
            this._decreaseCurrentIndex();
            const previousElement = this.pageList.children[this.state.currentIndex];
            if (previousElement) {
                previousElement.focus();
            }
        }
    }

    _loadNextPage() {
        if (this.pageList) {
            this._increaseCurrentIndex();
            const nextElement = this.pageList.children[this.state.currentIndex];
            if (nextElement) {
                nextElement.focus();
            }
        }
    }

    _increaseCurrentIndex() {
        if (this.state.currentIndex < this.pageCount) {
            const newState = {...this.state};
            newState.currentIndex++;
            this.state = {...newState};
        }
    }

    _decreaseCurrentIndex() {
        if (this.state.currentIndex > 0) {
            const newState = {...this.state};
            newState.currentIndex--;
            this.state = {...newState};
        }
    }
}

export default CarouselController;