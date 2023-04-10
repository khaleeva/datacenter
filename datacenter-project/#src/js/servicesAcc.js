
const accordionBtns = document.querySelectorAll('.accordion-header-services');
const accSection = document.querySelector('.colocation-services-accordion');
const panels = document.querySelectorAll('.accordion-panel-services');
let accordionFirst = document.getElementById('first-content');
let dedicContent = document.getElementById('dedic-content');
const innerLinks = document.querySelectorAll('.inner-link');
let formHeight = document.querySelector('.form-container');

  if (accordionFirst) {
    accordionFirst.style.maxHeight = accordionFirst.scrollHeight + 'px' ;
}

  if(dedicContent && formHeight){
    dedicContent.style.maxHeight = dedicContent.scrollHeight + formHeight.scrollHeight + 'px' ;
  }


for (let accordionBtn of accordionBtns) {
  accordionBtn.addEventListener('click', function () {

    let accordionContent = this.nextElementSibling;

    if (accordionContent.style.maxHeight) {
      accordionContent.style.maxHeight = null;
      if(accSection) {
        accSection.style.minHeight = 96 + 'px';
      }
    } else {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      if(accSection) {
        accSection.style.minHeight = accordionContent.scrollHeight + 'px';
      }

    }
  });

}














