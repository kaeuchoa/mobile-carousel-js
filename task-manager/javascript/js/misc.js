'use strict'

class Misc {
    static createRipple(event) {
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

    static constants = {
        MAX_RESULTS: 5,
        STATE_PAGE_INDEX: 'currentPageIndex',
        STATE_PAGE_LIST: 'pageList'
    }
}

export default Misc;