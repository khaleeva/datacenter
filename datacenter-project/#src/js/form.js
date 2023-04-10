let closeIconPartners = document.getElementById('close-icon-partners');
let partnersBtn = document.querySelector('.partners-btn');
const form = document.getElementById('form');

const swipeFormLine = document.querySelector('#partners-swipe-line');

if (partnersBtn) {
    partnersBtn.addEventListener('click', function () {
        document.body.classList.add('active-body');
        document.querySelector('.wrapper-partners').classList.add('active');
        document.querySelector('.form-send').classList.remove('active');
        form.classList.remove('display-none');
        document.querySelector('#form-title').style.display = 'block';
        document.querySelector('.partners-container').classList.add('active');
    })
}


if (closeIconPartners) {
    closeIconPartners.addEventListener("click", function () {
        document.querySelector('.wrapper-partners').classList.remove('active');
        document.querySelector('.form-send').classList.remove('active');
        form.reset();
        document.body.classList.remove('active-body');
        document.querySelector('.partners-container').classList.remove('active');
    })
}


if (swipeFormLine) {
    swipeFormLine.addEventListener('swiped-down', function () {
        document.querySelector('.wrapper-partners').classList.remove('active');
        document.querySelector('.form-send').classList.remove('active');
        form.reset();
        document.body.classList.remove('active-body');
        document.querySelector('.partners-container').classList.remove('active');
    })


    swipeFormLine.addEventListener('click', function () {
        document.querySelector('.wrapper-partners').classList.remove('active');
        document.querySelector('.form-send').classList.remove('active');
        form.reset();
        document.body.classList.remove('active-body');
        document.querySelector('.partners-container').classList.remove('active');
    });
}




