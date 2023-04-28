function toggleAccordion() {
    const accordion_headers = document.querySelectorAll(".accordion__header");
    const burger = document.querySelector('.burger');
    const accordion_bodies = document.querySelectorAll('.accordion__body');

    accordion_headers.forEach(header => header.addEventListener('click', function (e) {
            const current_header = e.target;
            const current_panel = current_header.nextElementSibling;
            if(burger.classList.contains('burger_open')){
                if(current_panel.classList.contains("accordion__body_open")){
                    current_panel.classList.remove("accordion__body_open")
                } else {
                    accordion_bodies.forEach(body => {
                        if(body.classList.contains("accordion__body_open")){
                            body.classList.remove("accordion__body_open")
                        }
                    })
                    current_panel.classList.add("accordion__body_open")
                }
            }

    }))

}
