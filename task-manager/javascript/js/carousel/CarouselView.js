'use strict'

class CarouselView {

    constructor(renderedPaging, carouselPageModelList) {
        this.renderedPaging = renderedPaging;
        this.pageList = carouselPageModelList;
    }

    renderElement() {
        const containerElement = document.createElement('div');
        containerElement.innerHTML = `
        <section class="carousel">
            <div class="carousel__img"></div>
            <div class="carousel__content">
                ${this.renderedPaging}
                <ul class="carousel__slider js-page-list">
                    ${this._renderCarouselItems()}
                </ul>
                <div class="carousel__action-bar">
                    <button class="carousel__btn carousel__btn--primary js-previous-btn"><i class="fas fa-arrow-left"></i></button>
                    <button class="carousel__btn carousel__btn--primary js-next-btn"><i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
        </section>`
        return containerElement.firstElementChild;
    }

    _renderCarouselItems() {
        if (this.pageList.length) {
            return this.pageList.map((listItem) => `
            <li class="carousel__item" id="${this._getItemId(listItem)}" tabindex="-1">
                <h1 class="carousel__title">${listItem.title}</h1>
                <p class="carousel__text"> ${listItem.text}</p>
            </li>
            `).join('');
        }
    }

    _getItemId(listItem){
        return listItem.text.toLowerCase().trim() + "__" + new Date().getTime();
    }
}

CarouselView.jsPreviousBtnSelector = '.js-previous-btn';
CarouselView.jsNextBtnSelector = '.js-next-btn';
CarouselView.jsPageListSelector = '.js-page-list';

export default CarouselView;