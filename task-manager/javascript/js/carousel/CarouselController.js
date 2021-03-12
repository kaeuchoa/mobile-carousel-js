'use strict';

import CarouselView from './CarouselView.js';
import Misc from '../misc.js';
import State from '../State.js';

class CarouselController {
    constructor(pageList, pagingController) {
        this.pagingController = pagingController;
        this.view = new CarouselView(this.pagingController.renderView(pageList), pageList);
        this.pageListCount = pageList.length - 1;
        this.renderedView = null;
        this.nextBtn = null;
        this.previousBtn = null;
        this.pageListElement = null;
        this.carouselImage = null;
        this.observers = [];
        this.state = new State();
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

    renderView(pageList, renderedPaging) {
        if (this.view) {
            this.renderedView = this.view.renderElement(pageList, renderedPaging);
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
        this.carouselImage = this.renderedView.querySelector(CarouselView.jsCarouselImg);
    }

    _bindNextBtnEvent() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this._triggerNextEvent();
                this._updateCarousel();
            });
            this.nextBtn.addEventListener('click', (e) => Misc.createRipple(e));
        } else {
            throw new Error('Next button is not rendered.');
        }
    }

    _bindPreviousBtnEvent() {
        if (this.previousBtn) {
            this.previousBtn.addEventListener('click', () => {
                this._triggerPreviousEvent();
                this._updateCarousel();
            });
            this.previousBtn.addEventListener('click', (e) => Misc.createRipple(e));
        } else {
            throw new Error('Previous button is not rendered.');
        }
    }

    _triggerPreviousEvent() {
        this._notify({ event: CarouselController.actions.PREVIOUS_BTN });
    }

    _triggerNextEvent() {
        this._notify({ event: CarouselController.actions.NEXT_BTN });
    }

    _updateCarousel() {
        const pageList = this.state.get(Misc.constants.STATE_PAGE_LIST),
            currentPageIndex = this.state.get('currentPageIndex');
        if (pageList && currentPageIndex) {
            const currentElement = this.pageListElement.children[currentPageIndex];
            if (currentElement) {
                currentElement.focus();
            }
            this._toggleBtns();
        }
    }

    _toggleBtns() {
        if (window.state) {
            if (window.state.currentCarouselScreen === 0) {
                this._disablePreviousBtn();
            } else if (window.state.currentCarouselScreen > 0 && window.state.currentCarouselScreen < this.pageListCount) {
                this._enableAllBtns();
            } else if (window.state.currentCarouselScreen === this.pageListCount) {
                this._disableNextBtn();
            }
        }
    }

    _enableAllBtns() {
        if (this.previousBtn && this.nextBtn) {
            this.previousBtn.removeAttribute('style');
            this.previousBtn.disabled = false;
            this.nextBtn.removeAttribute('style');
            this.nextBtn.disabled = false;
        }
    }

    _disablePreviousBtn() {
        if (this.previousBtn) {
            this.previousBtn.style.background = "#eee";
            this.previousBtn.disabled = true;
        }
    }

    _disableNextBtn() {
        if (this.nextBtn) {
            this.nextBtn.style.background = "#eee";
            this.nextBtn.disabled = true;
        }
    }
}

CarouselController.actions = {
    NEXT_BTN: "action_next_btn",
    PREVIOUS_BTN: "action_previous_btn"
}
export default CarouselController;