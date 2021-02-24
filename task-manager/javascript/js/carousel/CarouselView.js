'use strict'

class CarouselView {

    constructor(pagingView) {
        this.pagingView = pagingView;
    }

    renderElement() {
        const containerElement = document.createElement('div');
        containerElement.innerHTML = `
        <section class="carousel">
            <div class="carousel__img"></div>
            <div class="carousel__content">
                ${this.pagingView.renderToString()}
                <div class="carousel__slider">
                    <h1 class="carousel__title">Sample Title</h1>
                    <p class="carousel__text"> Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    <div class="carousel__action-bar">
                        <button class="carousel__btn carousel__btn--primary js-previous-btn"><i class="fas fa-arrow-left"></i></button>
                        <button class="carousel__btn carousel__btn--primary js-next-btn"><i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        </section>`
        return containerElement.firstElementChild;
    }
}

CarouselView.jsPreviousBtnSelector = '.js-previous-btn';
CarouselView.jsNextBtnSelector = '.js-next-btn';

export default CarouselView;