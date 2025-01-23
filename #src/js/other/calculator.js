document.addEventListener('DOMContentLoaded', () => {
	if (document.querySelector('.calculator')) {
		calculator()
	}

});

function calculator() {

	const calculator_container = document.querySelector('.calculator__container');
	const tableBody = document.querySelectorAll('.table__body');
	const ranges = document.querySelectorAll('.range');
	const checkbox_second_supply = document.querySelector('.checkbox');
	const buttonToOpenUnitCalculator = document.querySelector("#btn-unit");
	const buttonToOpenTowerCalculator = document.querySelector("#btn-tower");
	const closeIcon = document.querySelector(".close-icon");
	const currentCost = document.querySelector(".form__cost");
	const ip_count = document.querySelector('#ip');
	const calculatorForm = document.querySelector('.form__cost-calculate');
	const checkBox_RUB = document.querySelector("#rub");
	const checkBox_BYN = document.querySelector("#byn");
	const swipe_button = document.querySelector(".swipe-button");
	const addMoreServicesButton = document.querySelector('.calculator__button');
	const result_table = document.querySelector('.calculator__result-table');
	const result_table_rows = document.querySelector('.result-table__rows');
	const result_table_total = document.querySelector('.result-table__total');

	let measure = '';
	let currency_RUB;
	let countServer = 1;
	let POWER = 0, UNIT = 0, PORT = 0, IP = 0, SUPPLY = 0;
	let TOTAL_SUM = 0;
	let tableCostData = {}


	tableBody.forEach(table => {
		const items = table.querySelectorAll('.table__row');
		items.forEach(item => {
			const name = item.querySelector('[data-name]')
			if (name) {
				const productName = name.getAttribute('data-name');
				const productCost = parseFloat(name.textContent.replace(',', '.'));
				tableCostData[productName] = productCost;
			}
		})

	});

	async function getCurrency() {
		// let url = 'https://www.nbrb.by/api/exrates/rates/456/?periodicity=0';
		let url = "https://www.datahata.by/nbrb_api_proxy/?periodicity=0";
		let response = await fetch(url);
		let currentCurrency = await response.json();
		let RUB = currentCurrency.Cur_OfficialRate;
		currency_RUB = (100 / RUB).toFixed(2);
	};

	getCurrency()

// открытие калькулятора
	function openCalculator(data, action) {
		const innerWidth = window.innerWidth;
		const heightDevice = window.innerHeight;
		document.body.classList.add('active-body')
		document.querySelector('.calculator__overlay').classList.add('calculator__overlay_active')
		document.querySelector('.cost-calculate__unit').classList[action]('cost-calculate__unit_active');
		if (innerWidth <= 768) {
			calculator_container.classList.add('calculator__container_swipe')
			let minHeightBottomMenu = heightDevice * 0.8
			let topPoint = heightDevice * 0.2
			calculator_container.style.minHeight = `${minHeightBottomMenu}px`
			calculator_container.style.minWidth = `${innerWidth}px`;
			calculator_container.style.top = `${topPoint}px`
		}
		renderTotalCost(data.toFixed(2))
		checkBox_BYN.checked = true;
	};

	if (buttonToOpenUnitCalculator) {
		buttonToOpenUnitCalculator.addEventListener('click', () => openCalculator(tableCostData['server'], 'add'))
	}
	;

	if (buttonToOpenTowerCalculator) {
		buttonToOpenTowerCalculator.addEventListener('click', () => openCalculator(tableCostData['tower'], 'remove'))
	}
	;


	ranges.forEach(range => {
		range.addEventListener('input', () => {
			let valueElemOutput = range.parentNode.previousElementSibling.querySelector('.value');
			measure = valueElemOutput.getAttribute('data-value');
			valueElemOutput.innerHTML = `${range.value} ${measure}`;
			getValueFromRange(range)
		})

	});


//получение значений инпутов

	function getValueFromRange(range) {
		let x = 0;
		let fill_range = range.previousElementSibling.querySelector('.fill')

		switch (measure) {
			case 'Вт':
				x = (range.value / 12.5) - 20;
				fill_range.style.width = x + '%';
				POWER = parseFloat((((range.value - 250) / 50) * tableCostData['power']).toFixed(2));
				break;
			case 'U':
				x = (range.value * 14.286) - 14.286;
				fill_range.style.width = x + '%';
				UNIT = parseFloat(((range.value * tableCostData['unit']) - tableCostData['unit']).toFixed(2));
				break;
			case'Gb/s':
				x = (range.value * 14.286) - 14.286;
				fill_range.style.width = x + '%';
				PORT = parseFloat(((range.value * tableCostData['port']) - tableCostData['port']).toFixed(2));
			default:
				break;
		}

		getTotalCostOfService();
	};

	//Получение стоимости второго блока питания

	checkbox_second_supply.addEventListener('change', () => {
		SUPPLY = checkbox_second_supply.checked ? tableCostData['supply'] : 0
		getTotalCostOfService();
	});


//Расчет стоимости IP
	ip_count.addEventListener('input', () => {
		if (/^\d+$/.test(ip_count.value)) {
			if (ip_count.value <= 1) {
				IP = 0;
			} else {
				let count = ip_count.value - 1;
				IP = parseFloat((count * tableCostData['ip']).toFixed(2));
			}
			getTotalCostOfService();
		} else {
			ip_count.value = ip_count.value.slice(0, -1);
		}
	});


// Расчет общей стоимости услуги
	function getTotalCostOfService() {
		let default_cost_server = calculatorForm.querySelector('.cost-calculate__unit_active') ?
			tableCostData['server'] : tableCostData['tower'];
		TOTAL_SUM = parseFloat(default_cost_server + POWER + UNIT + IP + PORT + SUPPLY);

		let render_total_sum = 0;

		if (checkBox_RUB.checked) {
			render_total_sum = (TOTAL_SUM.toFixed(2) * currency_RUB).toFixed(2);
		} else {
			render_total_sum = (TOTAL_SUM.toFixed(2));
		}

		renderTotalCost(render_total_sum)
		return render_total_sum

	};

	//Отрисовка итогой суммы в калькуляторе

	function renderTotalCost(totalCount, elem = currentCost) {
		if (checkBox_RUB.checked) {
			elem.innerHTML = `&asymp; ${totalCount} RUB`;
		} else {
			elem.innerHTML = `${totalCount} BYN`;
		}

	};

	function changeDisabledStateForButton(disabled) {
		addMoreServicesButton.disabled = disabled;
		if (disabled) {
			addMoreServicesButton.classList.add('button_disabled');
		} else {
			addMoreServicesButton.classList.remove('button_disabled');
		}
	};


	const buttons_currency = document.querySelectorAll('.button-currency__radio input[type="radio"]');

	buttons_currency.forEach((button_currency) => {
		button_currency.addEventListener('change', () => {
			if (button_currency.checked) {
				result_table.classList.remove('calculator__result-table_open');
				let result_table_cells = result_table_rows.querySelectorAll('.result-table__cell')
				if (result_table_cells.length > 0) {
					result_table_cells.forEach(cell => cell.remove())
				}
				countServer = 1;
				changeDisabledStateForButton(false)
				getNullValueCalculator()
			}
		});
	});


	// рендер таблицы с серверами
	function renderResultTable(count) {
		let totalSumForAllServers = 0;
		let cost = getTotalCostOfService();
		let data = getDataForResultTable();
		calculator_container.classList.add('calculator__container_result-table');
		result_table.classList.add('calculator__result-table_open');
		result_table_total.classList.add('result-table__total_visible');
		result_table_rows.innerHTML += `<div class="result-table__cell">
            <div class="cell__name">${count}. Сервер ${data}</div>
            <div class="cell__cost">${cost}</div>
        </div>`
		document.querySelector('.point-to-scroll').scrollIntoView({behavior: 'smooth', block: 'end'});

		for (let elem of document.querySelectorAll('.cell__cost')) {
			totalSumForAllServers = totalSumForAllServers + Number(elem.innerHTML);
			renderTotalCost(totalSumForAllServers.toFixed(2), document.querySelector('.total__cost'))
		}

		if (result_table_rows.querySelectorAll('.result-table__cell').length >= 10) {
			changeDisabledStateForButton(true)
		}

		getNullValueCalculator();
	};

	addMoreServicesButton.addEventListener('click', () => {
		renderResultTable(countServer++)
	});


	// формирование данных для таблицы

	function getDataForResultTable() {
		let ip = '';
		let supply = '';
		let power = `${document.querySelector("#power-range").value}Вт`;
		let port = `${document.querySelector('#port-range').value}Gb/s`;

		let type = calculatorForm.querySelector('.cost-calculate__unit_active') ?
			`${document.querySelector('#unit-range').value}U` : 'Tower'

		if (ip_count.value <= 1) {
			ip = `${1}IP`;
		} else {
			ip = `${ip_count.value}IP`;
		}
		if (checkbox_second_supply.checked) {
			supply = `${2}БП`;
		} else supply = `${1}БП`;

		return `${type} ${power} ${ip} ${port} ${supply}`
	};


//Функция обнулить значения калькулятора

	function getNullValueCalculator() {

		POWER = 0;
		UNIT = 0;
		IP = 0;
		PORT = 0;
		SUPPLY = 0;
		ip_count.value = '';

		ranges.forEach(range => {
			range.value = 0;
			const fill_range = range.previousElementSibling.querySelector('.fill')
			fill_range.style.width = `0%`

			const element_value = range.parentElement.previousElementSibling.querySelector('.value')
			const attribute = element_value.dataset.value;

			switch (attribute) {
				case 'Вт' :
					element_value.innerHTML = '250 Вт'
					break;
				case 'U' :
					element_value.innerHTML = '1 U'
					break;
				default :
					element_value.innerHTML = '1 Gb/s'
			}
		})

		if (checkbox_second_supply.checked) {
			checkbox_second_supply.checked = false;
		}

		const unit_server = calculatorForm.querySelector('.cost-calculate__unit_active');


		if (checkBox_RUB.checked) {
			unit_server ? renderTotalCost((tableCostData['server'].toFixed(2) * currency_RUB).toFixed(2))
				: renderTotalCost((tableCostData['tower'].toFixed(2) * currency_RUB).toFixed(2))
		} else {
			unit_server ? renderTotalCost(tableCostData['server'].toFixed(2)) :
				renderTotalCost(tableCostData['tower'].toFixed(2))
		}

	};

// функция обнуления классов

	function removeActiveClasses() {
		let innerWidth = window.innerWidth;
		document.body.classList.remove('active-body');
		calculator_container.classList.remove('calculator__container_result-table');
		if (innerWidth <= 768) {
			calculator_container.classList.remove('calculator__container_swipe');
			calculator_container.style.minHeight = `0px`
			calculator_container.style.top = `100%`
		}
		document.querySelector('.calculator__overlay').classList.remove('calculator__overlay_active')
		result_table.classList.remove('calculator__result-table_open');

		if (checkBox_RUB.checked) {
			checkBox_RUB.checked = false;
			checkBox_BYN.checked = true;
		}

		let result_table_cells = result_table_rows.querySelectorAll('.result-table__cell')
		if (result_table_cells.length > 0) {
			result_table_cells.forEach(cell => cell.remove())
		}
		changeDisabledStateForButton(false)
		getNullValueCalculator();
	}

	closeIcon.addEventListener('click', () => {
		removeActiveClasses();
		countServer = 1;
	});
	swipe_button.addEventListener('swiped-down', () => {
		removeActiveClasses();
		countServer = 1;
	});
	swipe_button.addEventListener('click', () => {
		removeActiveClasses();
		countServer = 1;
	});
};

