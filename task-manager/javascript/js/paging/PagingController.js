import PagingView from './PagingView.js';

class PagingController {
    constructor(pageList) {
        this.pageList = pageList;
        this.view = new PagingView(this.pageList.length);
        this.renderedView = null;
        this.paging = null;
        this.pagingSteps = [];
    }

    renderView() {
        this.renderedView = this.view.renderElement();
        if (this.renderedView) {
            this.paging = this.renderedView.querySelector(PagingView.jsPagingSelector);
            this.pagingSteps = Array.from(this.renderedView.querySelectorAll(PagingView.jsPagingStepSelector));
        }
        return this.renderedView;
    }

    updatePagingView() {
        if (this.pagingSteps && this.pagingSteps.length > 0 && window.state) {
            const stateIndex = window.state.currentCarouselScreen;
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