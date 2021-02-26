import PagingView from './PagingView.js';

class PagingController {
    constructor (pageList) {
        this.pageList = pageList;
        this.view = new PagingView(this.pageList.length);
    }
    renderView() {
        return this.view.renderToString();
    }

    updatePaging(data) {
        console.log("PagingController:updatePaging()", data);
    }

    activeNextStep() {
        console.log("PagingController:activeNextStep()");
    }

    activePreviousStep() {
        console.log("PagingController:activePreviousStep()");
    }
}

export default PagingController;