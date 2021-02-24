class PagingView {
    renderElement () {
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

    renderToString() {
        return `
        <div class="paging">
            <span class="paging__step"></span>
            <span class="paging__step"></span>
            <span class="paging__step"></span>
        </div>
        `;
    }
}

export default PagingView;