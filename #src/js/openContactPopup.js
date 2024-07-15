document.addEventListener('DOMContentLoaded', () => {
	const contactBtn = document.querySelector('#contact_btn');
	if (contactBtn) {
		openContactPopup(contactBtn)
	}

});


const openContactPopup = (btn) => {
	const modal_overlay = document.querySelector('.modal-overlay');
	btn.addEventListener('click', () => {
		btn.classList.add('active')
		if(btn.classList.contains('active')){
			document.body.classList.add('active-body');
			modal_overlay.classList.add('modal-overlay_open');
		}
	})


	modal_overlay.addEventListener('click', (e) => {
		if(e.target && e.target.classList.contains('modal-overlay')){
			document.body.classList.remove('active-body');
			modal_overlay.classList.remove('modal-overlay_open');
		}
	})
}
