document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.all-services__accordion')){
        openAccordionService()
    }
});

function openAccordionService() {

        let firstOpenAccordionBody = document.getElementById('first-open-body');
        const accordion_container = document.querySelector('.all-services__accordion');
        const accordion_headers = accordion_container.querySelectorAll('.accordion__header');
        const accordion_bodies = accordion_container.querySelectorAll('.accordion__body');
        if( firstOpenAccordionBody){
            firstOpenAccordionBody.style.maxHeight = firstOpenAccordionBody.scrollHeight + 'px';
        }



        accordion_headers.forEach(header => header.addEventListener('click', (e) => {

            if (e.target.classList.contains('button__arrow')) {
                accordion_headers.forEach(h => {
                    if (h !== header) {
                        h.querySelector('.button__arrow').classList.remove('button__arrow_rotate');
                    }
                });

                e.target.classList.toggle('button__arrow_rotate');
                let current_body =  header.nextElementSibling;

                if (current_body.style.maxHeight) {
                    current_body.style.maxHeight = null;
                } else {
                    accordion_bodies.forEach(body => {
                        if(body.style.maxHeight){
                            body.style.maxHeight = null;
                        }
                    })
                    current_body.style.maxHeight = current_body.scrollHeight + 'px';
                }

            }
        }))



}


// for (let header of headers) {
//   header.addEventListener('click', function (e) {
//
//     if(e.target.classList.contains('button__arrow')){
//       e.target.classList.toggle('button__arrow_rotate')
//
//       let accordionContent = this.nextElementSibling;
//
//       console.log(accordionContent)
//
//       if (accordionContent.style.maxHeight) {
//         accordionContent.style.maxHeight = null;
//         if(accSection) {
//           accSection.style.minHeight = 60 + 'px';
//         }
//       } else {
//         accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
//         if(accSection) {
//           accSection.style.minHeight = accordionContent.scrollHeight + 'px';
//         }
//
//       }
//     }
//
//
//
//   });

// }














