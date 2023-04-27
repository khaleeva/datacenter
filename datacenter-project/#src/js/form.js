const closeIconForm = document.querySelector('#close-icon-partners');
const openForm = document.querySelector('.partners-btn');
const form = document.querySelector('.form');
const partners_overlay = document.querySelector('.new-partners__overlay');
const partners_container = document.querySelector('.new-partners__container');
const form_result = document.querySelector('.form__result');
const swipeFormLine = document.querySelector('#partners-swipe-line');


function openSendForm() {
    const innerWidth = window.innerWidth;
    const heightDevice = window.innerHeight;
    if (innerWidth <= 768) {
        partners_container.classList.add('new-partners__container_active')
        let minHeightBottomMenu = heightDevice * 0.8
        let topPoint = heightDevice * 0.3
        partners_container.style.minHeight = `${minHeightBottomMenu}px`
        partners_container.style.minWidth = `${innerWidth}px`;
        partners_container.style.top = `${topPoint}px`
    }
    document.body.classList.add('active-body');
    partners_overlay.classList.add('new-partners__overlay_active');
    form_result.classList.remove('form__result_active');
    form.classList.remove('form_hidden');
}

function closeSendForm() {
    form.reset();
    const innerWidth = window.innerWidth;
    if (innerWidth <= 768) {
        partners_container.classList.remove('new-partners__container_active');
        partners_container.style.minHeight = `0px`
        partners_container.style.top = `100%`
    }
    document.body.classList.remove('active-body');
    partners_overlay.classList.remove('new-partners__overlay_active');
    form_result.classList.remove('form__result_active');
}


if (openForm) {
    openForm.addEventListener('click', openSendForm)
}

if (closeIconForm) {
    closeIconForm.addEventListener("click", closeSendForm)
}


if (swipeFormLine) {
    swipeFormLine.addEventListener('swiped-down', closeSendForm)
    swipeFormLine.addEventListener('click', closeSendForm)
}





