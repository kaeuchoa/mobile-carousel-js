'use strict'

export const createRipple = function (event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `0`;
    circle.style.top = `0`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

export const Constants = {
    MAX_RESULTS: 5,
    STATE_PAGE_INDEX: 'currentPageIndex',
    STATE_PAGE_LIST: 'pageList'
}
