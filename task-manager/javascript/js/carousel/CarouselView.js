'use strict'

class CarouselView {

    renderCarousel(isLoading, pageList, renderedPaging) {
        const loadingClass = isLoading ? 'carousel--loading' : '';
        const containerElement = document.createElement('div');
        containerElement.innerHTML = `
        <section class="carousel ${loadingClass}">
            <div class="carousel__img">
                <span class="loader"></span>
                <img src="${!isLoading ? currentItem.imgSrc : ''}" class="js-carousel-img"/>
            </div>
            <div class="carousel__content">
                <span id="paging-placeholder"></span>
                <ul class="carousel__slider js-page-list">
                </ul>
                <div class="carousel__action-bar">
                    <button class="carousel__btn carousel__btn--primary js-previous-btn"><i class="fas fa-arrow-left"></i></button>
                    <button class="carousel__btn carousel__btn--primary js-next-btn"><i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
        </section>`;
        this._appendListItems(containerElement, this.renderCarouselItems(pageList));
        this._appendRenderedPaging(containerElement, renderedPaging);
        return containerElement.firstElementChild;
    }

    renderCarouselItems(pageList) {
        const containerElement = document.createElement('div');
        if (pageList && pageList.length) {
            containerElement.innerHTML = pageList.map((listItem) => `
            <li class="carousel__item" id="${this._getItemId(listItem)}" tabindex="-1">
                <h1 class="carousel__title">${listItem.title}</h1>
                <p class="carousel__text"> ${listItem.text}</p>
            </li>
            `).join('');
            return containerElement.children;
        }
        containerElement.innerHTML = `
            <li class="carousel__item" id="" tabindex="-1">
                <h1 class="carousel__title"></h1>
                <p class="carousel__text"></p>
            </li>`;
        return containerElement.firstElementChild;
    }

    _appendListItems(containerElement, listItems) {
        if (listItems.children) {
            const listElement = containerElement.querySelector(CarouselView.jsPageListSelector);
            // maybe clear the list first?
            listElement.appendChild(listItems);
        }
    }

    _appendRenderedPaging(containerElement, renderedPaging) {
        if (typeof renderedPaging !== 'undefined') {
            const placeholder = containerElement.querySelector('#paging-placeholder');
            placeholder.appendChild(renderedPaging);
            placeholder.replaceWith(placeholder.firstElementChild);
        }
    }

    _getItemId(listItem) {
        return listItem.text.toLowerCase().trim() + "__" + new Date().getTime();
    }
}

CarouselView.jsPreviousBtnSelector = '.js-previous-btn';
CarouselView.jsNextBtnSelector = '.js-next-btn';
CarouselView.jsPageListSelector = '.js-page-list';
CarouselView.jsCarouselImg = '.js-carousel-img';

export default CarouselView;