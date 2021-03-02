class PagingView {

    constructor(stepsNumber) {
        this.stepsNumber = stepsNumber;
    }

    renderElement () {
        if (this.stepsNumber > 0) {
            const containerElement = document.createElement('div');
            containerElement.innerHTML = `
            <div class="paging js-paging">
                ${this._renderSteps()}
            </div>
            `;
            return containerElement.firstElementChild;
        }
        return null;
    }

    _renderSteps() {
        const steps = [];
        for (let i = 0; i < this.stepsNumber; i++) {
            if (i === 0) {
                steps.push(`<span class="paging__step paging__step--active js-paging-step"></span>`);
            } else {
                steps.push(`<span class="paging__step js-paging-step"></span>`);
            }
        }
        return steps.join('');
    }

}

PagingView.jsPagingSelector = '.js-paging';
PagingView.jsPagingStepSelector = '.js-paging-step';
PagingView.pagingStepActiveClass = 'paging__step--active';

export default PagingView;