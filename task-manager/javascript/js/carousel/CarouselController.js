'use strict';

import CarouselView from './CarouselView.js';

class CarouselController {
    constructor(pageList, pagingController) {
        this.pagingController = pagingController;
        this.view = new CarouselView(this.pagingController.renderView(), pageList);
        this.pageListCount = pageList.length - 1;
        this.renderedView = null;
        this.nextBtn = null;
        this.previousBtn = null;
        this.pageListElement = null;
        this.observers = [];
    }

    subscribe(f) {
        this.observers.push(f);
    }

    unsubscribe(f) {
        this.observers = this.observers.filter(subscriber => subscriber !== f);
    }

    _notify(data) {
        this.observers.forEach(observer => observer(data));
    }

    renderView() {
        if (this.view) {
            this.renderedView = this.view.renderElement();
            if (this.renderedView) {
                this._queryElements();
                this._bindPreviousBtnEvent();
                this._bindNextBtnEvent();
                this._toggleBtns();
                return this.renderedView;
            }
        }
        return null;
    }

    _queryElements() {
        this.previousBtn = this.renderedView.querySelector(CarouselView.jsPreviousBtnSelector);
        this.nextBtn = this.renderedView.querySelector(CarouselView.jsNextBtnSelector);
        this.pageListElement = this.renderedView.querySelector(CarouselView.jsPageListSelector);
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
        if (this.pageListElement) {
            this._notify({ event: CarouselController.actions.PREVIOUS_BTN });
            const previousElement = this.pageListElement.children[window.state.currentCarouselScreen];
            if (previousElement) {
                previousElement.focus();
            }
            this._toggleBtns();
        }
    }

    _loadNextPage() {
        if (this.pageListElement) {
            this._notify({ event: CarouselController.actions.NEXT_BTN });
            const nextElement = this.pageListElement.children[window.state.currentCarouselScreen];
            if (nextElement) {
                nextElement.focus();
            }
            this._toggleBtns();
        }
    }

    _toggleBtns() {
        if (window.state) {
            if (window.state.currentCarouselScreen === 0) {
                this._hidePreviousBtn();
            } else if (window.state.currentCarouselScreen > 0 && window.state.currentCarouselScreen < this.pageListCount) {
                this._showAllBtns();
            } else if (window.state.currentCarouselScreen === this.pageListCount) {
                this._hideNextBtn();
            }
        }
    }

    _showAllBtns() {
        if (this.previousBtn && this.nextBtn) {
            this.previousBtn.style.transform = 'scale(1)';
            this.nextBtn.style.transform = 'scale(1)';
        }
    }

    _hidePreviousBtn() {
        if (this.previousBtn) {
            this.previousBtn.style.transform = 'scale(0)';
            this.previousBtn.style.transform = 'scale(0)';
        }
    }

    _hideNextBtn() {
        if (this.nextBtn) {
            this.nextBtn.style.transform = 'scale(0)';
        }
    }
    // this doesn't belong here
    _getBtnComputedStyle(button, property) {
        return window.getComputedStyle(button).getPropertyValue(property);
    }
}

CarouselController.actions = {
    NEXT_BTN: "action_next_btn",
    PREVIOUS_BTN: "action_previous_btn"
}
export default CarouselController;