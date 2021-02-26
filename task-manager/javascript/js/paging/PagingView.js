class PagingView {

    constructor(stepsNumber) {
        this.stepsNumber = stepsNumber;
    }

    renderElement () {
        if (this.stepsNumber > 0) {
            const containerElement = document.createElement('div');
            containerElement.innerHTML = `
            <div class="paging">
                <span class="paging__step"></span>
                <span class="paging__step"></span>
                <span class="paging__step"></span>
            </div>
            `;
            return containerElement.firstElementChild;
        }
        return null;
    }

    renderToString() {
        if (this.stepsNumber > 0) {
            return `
            <div class="paging">
                ${this._renderSteps()}
            </div>
            `;
        }

        return '';
    }

    _renderSteps() {
        const steps = [];
        for (let i = 0; i < this.stepsNumber; i++) {
            if (i === 0) {
                steps.push(`<span class="paging__step paging__step--active"></span>`);
            } else {
                steps.push(`<span class="paging__step"></span>`);
            }
        }
        return steps.join('');
    }

}

export default PagingView;