'use strict';

console.log('detail');

const pageOnLoadScripts = () => {
    const selectQuantity = document.getElementById("custom-quantity-select");
    const buttonNext = document.getElementById('value-next');
    const buttonBack = document.getElementById('value-back');
    console.log('hi');
    // Count Buttons

    if (selectQuantity) {
        selectQuantity.addEventListener("mousedown", (e) => {
            e.preventDefault();
        }, false)
    }

    if (buttonNext) {
        increaseCount(buttonNext, selectQuantity);
    }

    if (buttonBack) {
        increaseCount(buttonBack, selectQuantity);
    }

    // Carousel

    $('.carousel .carousel-item').each(function () {
        let minPerSlide = 3;
        let next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (let i = 0; i < minPerSlide; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
        }
    });

}

const increaseCount = (clickedButton, selectQuantity) => {
    clickedButton.addEventListener("click", () => {
        const selectedIndex = selectQuantity.selectedIndex;
        const currElement = selectQuantity.options[selectedIndex];
        let nextElement;
        console.log('hi');
        if (clickedButton.id === 'value-next' && currElement.value !== '10') {
            nextElement = selectQuantity.options[selectedIndex].nextElementSibling;
            setSelect(currElement, nextElement)
        } else if (clickedButton.id === 'value-back' && currElement.value !== '1') {
            nextElement = selectQuantity.options[selectedIndex].previousElementSibling;
            setSelect(currElement, nextElement)
        }
    });
}

const setSelect = (currElement, nextElement) => {
    currElement.removeAttribute('selected');
    nextElement.setAttribute('selected', '');
}


module.exports = {
    pageOnLoadScripts
}