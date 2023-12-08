document.addEventListener('DOMContentLoaded', () => {
	if (document.querySelector('.all-services__accordion')) {
		openAccordionService()
	}

});

function openAccordionService() {

	let firstOpenAccordionBody = document.querySelectorAll('.first-open-body');
	const accordion_container = document.querySelector('.all-services__accordion');
	const accordion_headers = accordion_container.querySelectorAll('.accordion__header');
	const accordion_bodies = accordion_container.querySelectorAll('.accordion__body');

	firstOpenAccordionBody.forEach(first => {
		first.style.maxHeight = first.scrollHeight + 'px';
	})


	accordion_headers.forEach(header => header.addEventListener('click', (e) => {

		firstOpenAccordionBody.forEach(first => {
			first.classList.remove('first-open-body')
		})
		let current_body = header.nextElementSibling;

		if (current_body.style.maxHeight) {
			current_body.style.maxHeight = null;
			current_body.previousElementSibling.querySelector('.button__arrow').classList.remove('button__arrow_rotate')
		} else {
			accordion_bodies.forEach(body => {
				if (body.style.maxHeight) {
					body.style.maxHeight = null;
					body.previousElementSibling.querySelector('.button__arrow').classList.remove('button__arrow_rotate')
				}
			})
			current_body.style.maxHeight = current_body.scrollHeight + 'px';
			current_body.previousElementSibling.querySelector('.button__arrow').classList.add('button__arrow_rotate')
		}


	}))
};
















