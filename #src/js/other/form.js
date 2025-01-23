document.addEventListener('DOMContentLoaded', () => {
	if (document.querySelector('.form')) {
		form()
	}
});


const form = () => {
	const closeIconForm = document.querySelector('#close-icon-partners');
	const openForm = document.querySelector('.partners-btn');
	const form = document.querySelector('.form');
	const partners_overlay = document.querySelector('.new-partners__overlay');


	function openSendForm() {
		document.body.classList.add('active-body');
		partners_overlay.classList.add('new-partners__overlay_active');
		form.classList.remove('form_hidden');
	};

	function closeSendForm() {
		document.body.classList.remove('active-body');
		partners_overlay.classList.remove('new-partners__overlay_active');
	};


	if (openForm) {
		openForm.addEventListener('click', openSendForm)
	}
	;

	if (closeIconForm) {
		closeIconForm.addEventListener("click", closeSendForm)
	}
	;

};




