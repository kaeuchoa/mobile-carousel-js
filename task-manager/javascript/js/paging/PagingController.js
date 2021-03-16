import State from '../State.js';
import { Constants } from '../misc.js';
import PagingView from './PagingView.js';
import StatefulController from '../StatefulController.js';

class PagingController extends StatefulController {
    constructor() {
        super();
        this.renderedView = null;
        this.paging = null;
        this.view = new PagingView();

        this.isLoading = true;

        this.state.subscribe(data => {
            if (this._stateContainsRightData(data)) {
                this.isLoading = false;
                this.renderView();
            }
        });
    }

    _getStepsNumber() {
        return this.state.get(Constants.STATE_PAGE_LIST).length;
    }

    _init() {
        this._queryElements();
    }

    renderView() {
        const stepsNumber = this._getStepsNumber();
        if (this.view && !this.renderedView) { // first run
            console.log('PagingController -> First Run');
            this.renderedView = this.view.renderElement(this.isLoading, stepsNumber);
            this._init();
        } else if (this.view && this.renderedView) {
            console.log('PagingController -> Update Paging View');
            this._updatePagingView(stepsNumber);
        }
        return this.renderedView;
    }

    _queryElements() {
        this.paging = this.renderedView;
    }

    // todo: review animation for steps
    _updatePagingView(stepsNumber) {
        if (this.paging) {
            // paging update
            this.paging.classList.toggle(PagingView.cssPagingLoadingClass, this.isLoading);
            this.paging.innerHTML = '';
            this.paging.append(...this.view.renderSteps(stepsNumber));

            // steps update
            const currentPageIndex = this._getCurrentPageIndex();
            const pagingSteps = Array.from(this.paging.children);
            pagingSteps.forEach((stepElement, index) => {
                if (index === currentPageIndex) {
                    stepElement.classList.add(PagingView.pagingStepActiveClass);
                    return;
                }
                stepElement.classList.remove(PagingView.pagingStepActiveClass);
            });
        }
    }
}

export default PagingController;