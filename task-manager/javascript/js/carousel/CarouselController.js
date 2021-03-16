'use strict';

import CarouselView from './CarouselView.js';
import { Constants, createRipple } from '../misc.js';
import State from '../State.js';
import StatefulController from '../StatefulController.js';

// notes: Controllers will know and manage state

class CarouselController extends StatefulController {
    constructor() {
        super();
        this.view = new CarouselView();

        this.renderedView = null;
        this.nextBtn = null;
        this.previousBtn = null;
        this.pageListElement = null;
        this.carouselImage = null;
        this.carouselElement = null;

        // maybe add this to state?
        this.isLoading = true;

        this.state.subscribe(data => {
            if (this._stateContainsRightData(data)) {
                this.isLoading = false;
                this.renderView();
            }
        });
    }

    _init() {
        this._queryElements();
        this._bindNextBtnEvent();
        this._bindPreviousBtnEvent();
        this._toggleBtns();
    }

    renderView(renderedPaging) {
        const pageList = this._getCurrentPageList();
        if (this.view && !this.renderedView) { // first run
            this.renderedView = this.view.renderCarousel(this.isLoading, pageList, renderedPaging);
            this._init();
        } else if (this.view && this.renderedView) {
            this._updateCarouselView(pageList);
        }
        return this.renderedView;
    }

    _queryElements() {
        this.previousBtn = this.renderedView.querySelector(CarouselView.jsPreviousBtnSelector);
        this.nextBtn = this.renderedView.querySelector(CarouselView.jsNextBtnSelector);
        this.pageListElement = this.renderedView.querySelector(CarouselView.jsPageListSelector);
        this.carouselImage = this.renderedView.querySelector(CarouselView.jsCarouselImg);
        this.carouselElement = this.renderedView;
    }

    _bindNextBtnEvent() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this._increaseCurrentPageIndexState();
                this._moveCarousel();
            });
            this.nextBtn.addEventListener('click', (e) => createRipple(e));
        } else {
            throw new Error('Next button is not rendered.');
        }
    }

    _bindPreviousBtnEvent() {
        if (this.previousBtn) {
            this.previousBtn.addEventListener('click', () => {
                this._decreaseCurrentPageIndexState();
                this._moveCarousel();
            });
            this.previousBtn.addEventListener('click', (e) => createRipple(e));
        } else {
            throw new Error('Previous button is not rendered.');
        }
    }

    _updateCarouselView(pageList) {
        if (this.pageListElement) {
            // pageList update
            this.carouselElement.classList.toggle(CarouselView.cssLoadingClass, this.isLoading);
            this.pageListElement.innerHTML = '';
            this.pageListElement.append(...this.view.renderCarouselItems(pageList));

            //update image
            const currentPageIndex = this._getCurrentPageIndex();
            const currentItem = pageList[currentPageIndex];
            this.carouselImage.src = currentItem.imgSrc;
        }
    }

    _moveCarousel() {
        const pageList = this._getCurrentPageList(),
            currentPageIndex = this._getCurrentPageIndex();
        if (pageList && currentPageIndex >= 0) {
            const currentElement = this.pageListElement.children[currentPageIndex];
            if (currentElement) {
                currentElement.focus();
            }
            this._toggleBtns();
        }
    }

    _increaseCurrentPageIndexState() {
        let currentPageIndex = this._getCurrentPageIndex();
        let pageListCount = this._getCurrentPageList().length - 1;
        if (currentPageIndex < pageListCount) {
            currentPageIndex++;
            this.state.set(Constants.STATE_PAGE_INDEX, currentPageIndex);
        }
    }

    _decreaseCurrentPageIndexState() {
        let currentPageIndex = this._getCurrentPageIndex();
        if (currentPageIndex > 0) {
            currentPageIndex--;
            this.state.set(Constants.STATE_PAGE_INDEX, currentPageIndex);
        }
    }

    _toggleBtns() {
        const currentPageIndex = this._getCurrentPageIndex();
        const pageListCount = this._getCurrentPageList().length - 1;
        if (currentPageIndex === 0) {
            this._disablePreviousBtn();
        } else if (currentPageIndex > 0 && currentPageIndex < pageListCount) {
            this._enableAllBtns();
        } else if (currentPageIndex === pageListCount) {
            this._disableNextBtn();
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