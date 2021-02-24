'use strict'
import CarouselController from './carousel/CarouselController.js';

class App {
    constructor() {
        this.mainMockFrame = document.getElementById('main-mock-frame');
        this.carouselController = new CarouselController();
    }

    run() {
        const renderedCarousel = this.carouselController.renderView();
        if (renderedCarousel) {
            this.mainMockFrame.appendChild(renderedCarousel);
        } else {
            throw new Error('The view was not rendered correctly');
        }
    }
}

export default App;