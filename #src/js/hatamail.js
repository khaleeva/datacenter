document.addEventListener('DOMContentLoaded', () => {

	if (document.querySelector('.hm-main')) {


		if (document.querySelector('.carousel')) {
			const deviceWidth = window.innerWidth
			const carouselContainer = document.querySelector('.carousel');
			const slider = carouselContainer.querySelector('.slides');
			const carouselSlides = slider.querySelectorAll('li');
			const hm_carousel = document.querySelector('.hm__carousel');
			const arrow_container = hm_carousel.querySelector('.arrow-container');
			const nextButton = document.querySelector('.next');
			const prevButton = document.querySelector('.prev');
			const prev_arrow = document.querySelector('#carousel__arrow-prev');
			const next_arrow = document.querySelector('#carousel__arrow-next');
			const indicatorsContainer = arrow_container.querySelectorAll('.item__indicator');

			const setWidth = (deviceWidth) => {
				let elemWidth = 0;
				if (deviceWidth < 768 && deviceWidth >= 421) {
					elemWidth = deviceWidth - 40;
				} else if (deviceWidth < 421) {
					elemWidth = deviceWidth - 20;
				} else if (deviceWidth === 768) {
					elemWidth = (((deviceWidth - 40) / 2) + 12);
				} else {
					elemWidth = 410;
				}

				return elemWidth;
			}

			const width = setWidth(deviceWidth);
			carouselSlides.forEach(item => item.style.width = `${width}px`)

			window.addEventListener('resize', () => {
				const deviceWidth = window.innerWidth
				const elemWidth = setWidth(deviceWidth)
				carouselContainer.scrollTo({
					left: 0,
					behavior: 'smooth'
				});
				carouselSlides.forEach(item => item.style.width = `${elemWidth}px`)
				initializeCarousel({
					deviceWidth,
					slider,
					carouselContainer,
					indicatorsContainer,
					prevButton,
					nextButton,
					arrowPrevButton: prev_arrow,
					arrowNextButton: next_arrow,
					elemWidth
				});
			})

			initializeCarousel({
				deviceWidth,
				slider,
				carouselContainer,
				indicatorsContainer,
				prevButton,
				nextButton,
				arrowPrevButton: prev_arrow,
				arrowNextButton: next_arrow,
				elemWidth: width
			});
		}


		if (document.querySelector('.hm-possibilities')) {
			const deviceWidth = window.innerWidth
			const possibilities_info = document.querySelector('.hm__info');
			const possibilities_infoContainer = document.querySelector('.hm__info-container')
			const possibilities_items = possibilities_info.querySelectorAll('.hm__info__items');
			const possibilities_container = document.querySelector('.hm-possibilities__container');
			const arrows = possibilities_container.querySelector('.arrow-container');
			const possibilities_indicators = arrows.querySelectorAll('.item__indicator');
			const prev_arrow = document.querySelector('#possibilities__arrow-prev');
			const next_arrow = document.querySelector('#possibilities__arrow-next');
			const setWidth = (deviceWidth) => {
				let elemWidth = 0;
				if (deviceWidth > 420) {
					elemWidth = deviceWidth - 40;
				} else {
					elemWidth = deviceWidth - 20;
				}
				return elemWidth;
			}
			const width = setWidth(deviceWidth);
			possibilities_items.forEach(item => {
				item.style.width = `${width}px`
				item.style.maxWidth = '1200px'
			})

			window.addEventListener('resize', () => {
				const deviceWidth = window.innerWidth
				const elemWidth = setWidth(deviceWidth)

				possibilities_infoContainer.scrollTo({
					left: 0,
					behavior: 'smooth'
				});

				possibilities_items.forEach(item => {
					item.style.width = `${elemWidth}px`
					item.style.maxWidth = '1200px'
				})
			initializeCarousel({
				deviceWidth,
				slider: possibilities_info,
				carouselContainer: possibilities_infoContainer,
				indicatorsContainer: possibilities_indicators,
				prevButton: null,
				nextButton: null,
				arrowPrevButton: prev_arrow,
				arrowNextButton: next_arrow,
				elemWidth
			});
		})
			initializeCarousel({
				deviceWidth,
				slider: possibilities_info,
				carouselContainer: possibilities_infoContainer,
				indicatorsContainer: possibilities_indicators,
				prevButton: null,
				nextButton: null,
				arrowPrevButton: prev_arrow,
				arrowNextButton: next_arrow,
				elemWidth: width
			})
	}

	if (document.querySelectorAll('.tab-label')) {
		const tabLabels = document.querySelectorAll('.tab-label');

		tabLabels.forEach((label) => {
			const input = label.querySelector('input[type="radio"]');
			if (input.checked) {
				label.classList.add('tab-label_active');
			}
			input.addEventListener('change', () => {
				tabLabels.forEach((elem) => {
					elem.classList.remove('tab-label_active');
				});
				if (input.checked) {
					label.classList.add('tab-label_active');
					if (label.dataset.info === 'mail') {
						document.querySelector('.info__storage').style.display = 'none'
						document.querySelector('.info__mail').style.display = 'flex'
					}

					if (label.dataset.info === 'storage') {
						document.querySelector('.info__mail').style.display = 'none'
						document.querySelector('.info__storage').style.display = 'flex'
					}
				}

			});


		});


	}

	if (document.querySelector('.hm-calculator__buttons')) {
		const price = document.querySelector('.price');
		const time_text = document.querySelector('.time');
		const labelBtns = document.querySelectorAll('.hm-calculator__label');
		labelBtns.forEach((label) => {
			const input = label.querySelector('input[type="radio"]');

			input.addEventListener('change', () => {
				labelBtns.forEach((label) => {
					label.classList.remove('hm-calculator__label_active');
				});
				if (input.checked) {
					label.classList.add('hm-calculator__label_active');
					if (input.value === 'null') {
						document.querySelector('.hm-calculator__price').style.display = 'none';
						document.querySelector('.hm-calculator__price-text').style.display = 'flex';
						document.querySelector('.hm-calculator__time-text').style.visibility = 'hidden';
					} else {
						document.querySelector('.hm-calculator__price').style.display = 'flex';
						document.querySelector('.hm-calculator__price-text').style.display = 'none';
						document.querySelector('.hm-calculator__time-text').style.visibility = 'visible';
						price.innerText = input.value;
						time_text.innerText = input.dataset.time;
					}
				}
			});

		})
	}

	if (document.querySelector('.hm-faq')) {
		const arrow_btns = document.querySelectorAll('.card__arrow');

		arrow_btns.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				const head = e.target.closest('.hm-faq__card').querySelector('.card__header-text');
				const body = e.target.closest('.hm-faq__card').querySelector('.card__body');
				body.classList.toggle('card__body_height');
				head.classList.toggle('card__header-text_active');
				e.target.classList.toggle('card__arrow_rotate')
			})

		})
	}

	const watch_btn = document.querySelectorAll('.btn-watch');
	watch_btn.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			const btn = e.currentTarget;
			const isHiddenContainerActive = btn.previousElementSibling.classList.contains('hm__hidden-container_active');
			btn.previousElementSibling.classList.toggle('hm__hidden-container_active');

			if (btn.id === 'admin') {
				btn.innerText = !isHiddenContainerActive ? 'Свернуть' : 'Посмотреть';
			} else {
				btn.innerText = !isHiddenContainerActive ? 'Скрыть' : 'Узнать больше';
			}
		})
	})
}


})
;




