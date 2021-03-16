class PagingView {

    renderElement (isLoading ,stepsNumber) {
        const loadindClass = isLoading ? 'paging--loading' : '';
        const containerElement = document.createElement('div');
        containerElement.innerHTML = `
        <div class="paging js-paging ${loadindClass}">
        </div>
        `;
        this._appendSteps(containerElement, this.renderSteps(stepsNumber));
        return containerElement.firstElementChild;
    }

    _appendSteps(containerElement, steps) {
        if (typeof steps !== undefined) {
            containerElement.append(steps);
        }
    }

    renderSteps(stepsNumber) {
        const steps = [];
        const containerElement = document.createElement('div');
        for (let i = 0; i < stepsNumber; i++) {
            steps.push(`<span class="paging__step js-paging-step"></span>`);
        }
        containerElement.innerHTML = steps.join('');
        return containerElement.children;
    }

}

PagingView.jsPagingSelector = '.js-paging';
PagingView.jsPagingStepSelector = '.js-paging-step';
// look for and refactor into cssPagingStepActiveClass
PagingView.pagingStepActiveClass = 'paging__step--active';
PagingView.cssPagingLoadingClass = 'paging--loading';

export default PagingView;