import State from '../State.js';
import { Constants } from '../misc.js';
import PagingView from './PagingView.js';

class PagingController {
    constructor() {
        this.renderedView = null;
        this.paging = null;
        this.pagingSteps = [];
        this.state = new State();
        const stepsNumber = this.state.get(Constants.STATE_PAGE_LIST).length;
        this.view = new PagingView(stepsNumber);
    }

    renderView() {
        const stepsNumber = this.state.get(Constants.STATE_PAGE_LIST).length;
        this.renderedView = this.view.renderElement(stepsNumber);
        if (this.renderedView) {
            this.paging = this.renderedView.querySelector(PagingView.jsPagingSelector);
            this.pagingSteps = Array.from(this.renderedView.querySelectorAll(PagingView.jsPagingStepSelector));
        }
        return this.renderedView;
    }

    updatePagingView() {
        if (this.pagingSteps && this.pagingSteps.length > 0) {
            const stateIndex = this.state.get(Constants.STATE_PAGE_INDEX);
            this.pagingSteps.forEach((stepElement, index) => {
                if (index === stateIndex) {
                    stepElement.classList.add(PagingView.pagingStepActiveClass);
                    return;
                }
                stepElement.classList.remove(PagingView.pagingStepActiveClass);
            });
        }
    }
}

export default PagingController;