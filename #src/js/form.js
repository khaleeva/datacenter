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
	const partners_container = document.querySelector('.new-partners__container');
	const swipeFormLine = document.querySelector('#partners-swipe-line');


	function openSendForm() {
		form.reset();
		resetClass();
		const innerWidth = window.innerWidth;
		const heightDevice = window.innerHeight;
		if (innerWidth <= 768) {
			partners_container.classList.add('new-partners__container_active')
			let minHeightBottomMenu = null;
			if (innerHeight < 800) {
				minHeightBottomMenu = heightDevice + 120
			} else {
				minHeightBottomMenu = heightDevice * 0.9
			}

			let topPoint = heightDevice * 0.2
			partners_container.style.minHeight = `${minHeightBottomMenu}px`
			partners_container.style.minWidth = `${innerWidth}px`;
			partners_container.style.top = `${topPoint}px`
		}
		document.body.classList.add('active-body');
		partners_overlay.classList.add('new-partners__overlay_active');
		form.classList.remove('form_hidden');
	};

	function closeSendForm() {
		form.reset();
		resetClass();
		const innerWidth = window.innerWidth;
		if (innerWidth <= 768) {
			partners_container.classList.remove('new-partners__container_active');
			partners_container.style.minHeight = `0px`
			partners_container.style.top = `100%`
		}
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


	if (swipeFormLine) {
		swipeFormLine.addEventListener('swiped-down', closeSendForm)
		swipeFormLine.addEventListener('click', closeSendForm)
	}
	;
};


let iti;

const phoneInput = document.getElementById('phoneInput');
document.addEventListener('DOMContentLoaded', function () {

	if (phoneInput) {
		iti = window.intlTelInput(phoneInput, {
			preferredCountries: ['by', 'ru'],
			customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
				return '+' + selectedCountryData.dialCode;
			},
			utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
		});
	}


})


if (document.querySelector('.iti')) {
	document.querySelector('.iti').tabIndex = '0';

	phoneInput.addEventListener('focus', function () {
		document.querySelector('.iti').style.border = `1px solid orange`
	});

	phoneInput.addEventListener('blur', function () {
		document.querySelector('.iti').style.border = `1px solid rgba(0, 0, 0, 0.1)`
	});

}


function validatePhoneNumber(phoneNumber) {
	return iti.isValidNumber(phoneNumber);
}

function formatPhoneNumber(phoneNumber) {
	const data = iti.getSelectedCountryData();
	const code = '+' + data.dialCode;

	if (validatePhoneNumber(phoneNumber)) {
		if (phoneNumber.startsWith(code)) {
			return phoneInput.value = phoneNumber;
		} else if (!phoneNumber.startsWith('+')) {
			if (phoneNumber.startsWith(data.dialCode)) {
				return phoneInput.value = code + phoneNumber.substring(data.dialCode.length);
			} else {
				return phoneInput.value = code + phoneNumber;
			}
		}
	}

	return phoneInput.value = code + phoneNumber;
}

function addErrorClass(name) {
	if (name === 'phone') {
		if (document.querySelector('.iti')) {
			document.querySelector('.iti').classList.add('error-form');
		}

	} else document.querySelector(`[name="${name}"]`).classList.add('error-form');
}

function resetClass() {
	if (document.querySelector('.iti')) {
		document.querySelector('.iti').classList.remove('error-form');
	}

	const form = document.getElementById('sampleFormPanel');
	const childs = form.getElementsByTagName('input');

	for (let i = 0; i < childs.length; i++) {
		if (childs[i].classList.contains('error-form')) {
			childs[i].classList.remove('error-form');
		}
	}
}



