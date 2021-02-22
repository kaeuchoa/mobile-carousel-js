'use strict'

document.addEventListener('DOMContentLoaded', loadContent);

function loadContent() {
    const carouselTemplate = document.getElementById('carousel-template');
    const mainMockFrame = document.getElementById('main-mock-frame');
    const newCarousel = carouselTemplate.content.cloneNode(true);
    mainMockFrame.appendChild(newCarousel);
}