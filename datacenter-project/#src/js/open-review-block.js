document.addEventListener("DOMContentLoaded", function () {
    openReviewBlock()
})


function openReviewBlock () {
    const readMoreButtons = document.querySelectorAll('.read-more-button');
    const inner_blocks = document.querySelectorAll('.review__card-inner');
    const limiter_blocks = document.querySelectorAll('.limiter');

    readMoreButtons.forEach(readMoreButton =>
        readMoreButton.addEventListener('click', function (e) {
            const parent = e.target.closest('.review__card-inner');
            const limiter = parent.querySelector('.limiter');
            let isActive = e.target.classList.contains('read-more-button_active');
            isActive ? removeActiveClasses(e.target, parent, limiter) : addActiveClasses(e.target, parent, limiter)

        }))

    function addActiveClasses(button, parent, limiter) {
        if (!button.classList.contains('read-more-button_active')) {
            for (let i = 0; i < inner_blocks.length; i++) {
                if (inner_blocks[i].classList.contains('review__card-inner_active')) {
                    removeActiveClasses(readMoreButtons[i], inner_blocks[i], limiter_blocks[i]);
                }
            }
            button.classList.add('read-more-button_active');
            button.innerText = 'Свернуть';
            parent.classList.add("review__card-inner_active");
            limiter.classList.add("limiter_active");
        }

    }

    function removeActiveClasses(button, parent, limiter) {
        button.classList.remove("read-more-button_active");
        button.innerText = 'Развернуть';
        parent.classList.remove("review__card-inner_active");
        limiter.classList.remove("limiter_active");
    }
}







    

       


      
    



