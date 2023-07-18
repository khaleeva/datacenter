function setSlideWidth(deviceWidth, slides, flag) {
	let elemWidth = 0;
	slides.forEach((elem) => {
		if (deviceWidth < 768) {
			elem.style.width = `${deviceWidth - 40}px`;
			elemWidth = deviceWidth - 40;
		} else if (deviceWidth === 768) {
			if (flag) {
				elem.style.width = `${(deviceWidth - 40) / 2 - 12}px`;
				elemWidth = (deviceWidth - 40) / 2;
			} else {
				elemWidth = elem.offsetWidth;
			}
		} else {
			elemWidth = 410;
		}
	});

	return elemWidth;
}

function initializeCarousel(data) {
	const {
		deviceWidth,
		slider,
		carouselContainer,
		carouselSlides,
		indicatorsContainer,
		prevButton,
		nextButton,
		arrowPrevButton,
		arrowNextButton
	}
		= data


	const elemWidth = setSlideWidth(deviceWidth, carouselSlides, true);
	const sliderWidth = slider.offsetWidth;
	const carouselWidth = carouselContainer.offsetWidth;
	let curPos = 0;
	let activeIndex = 0;
	let prevActiveIndex = null;

	function changeActiveIndicatorToScroll() {
		const scrollLeft = carouselContainer.scrollLeft;
		const scrollIndex = Math.round(scrollLeft / carouselWidth);

		if (scrollIndex !== prevActiveIndex) {
			activeIndex = scrollIndex;
			if (activeIndex <= indicatorsContainer.length - 1) {
				changeActiveIndicator(activeIndex);
			}
			prevActiveIndex = scrollIndex;
		}
	}

	function changeActiveIndicator(currentIndex) {
		indicatorsContainer.forEach((indicator, index) => {
			if (index === currentIndex) {
				indicator.classList.add('item__indicator_active');
			} else {
				indicator.classList.remove('item__indicator_active');
			}
		});
	}

	function increment(width) {
		if (activeIndex < indicatorsContainer.length - 1) {
			activeIndex++;
			curPos = (activeIndex * width) + (activeIndex * 24);
			slide(curPos, width);
			changeActiveIndicator(activeIndex);
		} else {
			activeIndex = indicators.length - 1;
			changeActiveIndicator(activeIndex);
			slide(sliderWidth, width);
		}
	}

	function decrement(width) {
		if (activeIndex > 0) {
			activeIndex--;
			curPos = (activeIndex * width) + (activeIndex * 24);
			changeActiveIndicator(activeIndex);
			slide(curPos, width);
		} else {
			activeIndex = 0;
			changeActiveIndicator(activeIndex);
			slide(0, width);
		}
	}

	function slide(position, width) {
		carouselContainer.scrollTo({
			left: position,
			behavior: 'smooth'
		});
		if (position <= 0) {
			curPos = 0;
		}
		if (position >= sliderWidth) {
			curPos = sliderWidth - width;
		}
	}


	carouselContainer.addEventListener('scroll', changeActiveIndicatorToScroll);

	if (nextButton && prevButton) {
		if (deviceWidth >= 768) {
			nextButton.addEventListener('click', () => {
				if (deviceWidth > carouselWidth) {
					curPos += (sliderWidth / (sliderWidth / (deviceWidth / 2)))
				} else {
					curPos += (sliderWidth / (sliderWidth / (elemWidth * 2) + 24));
				}
				slide(curPos, elemWidth);
			});

			prevButton.addEventListener('click', () => {
				if (deviceWidth > carouselWidth) {
					curPos += (-sliderWidth / (sliderWidth / (deviceWidth / 2)))
				} else {
					curPos += (-sliderWidth / (sliderWidth / (elemWidth * 2) + 24));
				}
				slide(curPos, elemWidth);
			});
		}
	}


	arrowNextButton.addEventListener('click', () => {
		increment(elemWidth);
	});

	arrowPrevButton.addEventListener('click', () => {
		decrement(elemWidth);
	});


}
