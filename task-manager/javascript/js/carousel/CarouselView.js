'use strict'

class CarouselView {

    constructor(renderedPaging, carouselPageModelList) {
        this.renderedPaging = renderedPaging;
        this.pageList = carouselPageModelList;
    }

    renderElement(pageList, renderedPaging) {
        // does this belong here?
        const isPageListSet = pageList.length !== 0;
        const isPagingRendered = typeof renderedPaging !== 'undefined';
        const loadingClass = !isPageListSet ? 'carousel--loading' : '';
        if (isPageListSet) {
            this.pageList = pageList;
        }
        if (isPagingRendered) {
            this.renderedPaging = renderedPaging;
        }


        const containerElement = document.createElement('div');
        containerElement.innerHTML = `
        <section class="carousel ${loadingClass}">
            <div class="carousel__img">
                <img src="" class="js-carousel-img"/>
            </div>
            <div class="carousel__content">
                <span id="paging-placeholder"></span>
                <ul class="carousel__slider js-page-list">
                    ${this._renderCarouselItems()}
                </ul>
                <div class="carousel__action-bar">
                    <button class="carousel__btn carousel__btn--primary js-previous-btn"><i class="fas fa-arrow-left"></i></button>
                    <button class="carousel__btn carousel__btn--primary js-next-btn"><i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
        </section>`;
        this._appendRenderedPaging(containerElement);
        return containerElement.firstElementChild;
    }

    _renderCarouselItems() {
        if (this.pageList && this.pageList.length) {
            return this.pageList.map((listItem) => `
            <li class="carousel__item" id="${this._getItemId(listItem)}" tabindex="-1">
                <h1 class="carousel__title">${listItem.title}</h1>
                <p class="carousel__text"> ${listItem.text}</p>
            </li>
            `).join('');
        } 
        return `
            <li class="carousel__item" id="" tabindex="-1">
                <h1 class="carousel__title"></h1>
                <p class="carousel__text"></p>
            </li>`;
    }

    _appendRenderedPaging(containerElement) {
        const placeholder = containerElement.querySelector('#paging-placeholder');
        placeholder.appendChild(this.renderedPaging);
        placeholder.replaceWith(placeholder.firstElementChild);
    }

    _getItemId(listItem){
        return listItem.text.toLowerCase().trim() + "__" + new Date().getTime();
    }
}

CarouselView.jsPreviousBtnSelector = '.js-previous-btn';
CarouselView.jsNextBtnSelector = '.js-next-btn';
CarouselView.jsPageListSelector = '.js-page-list';
CarouselView.jsCarouselImg = '.js-carousel-img';

export default CarouselView;