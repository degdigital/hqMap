import {replaceContent} from 'DEGJS/domUtils';

const render = function(spaces, settings) {

	let routingEl;
	let startSelectEl;
	let endSelectEl;
	let outputEl;

	function init() {
		render();
		renderRoute();
	}

	function bindEvents() {
	    routingEl.addEventListener('change', () => {
	    	renderRoute();
		    filterOptions();
	    });
	}

	function renderRoute() {
		const route = settings.getRoute(startSelectEl.value, endSelectEl.value);
		const routeNames = route.map(routeItem => `${routeItem.name}`);
        replaceContent(outputEl, `
        	<strong>Fastest route:</strong><br>
        	${routeNames.join('<br>')}
        `);
	}

	function render() {
		routingEl = document.querySelector(settings.wrapperSelector);
	    routingEl.insertAdjacentHTML('afterbegin', `
	        <label for="startSelect">Select a starting point: </label>
	        <select class="${settings.startSelectClass}" id="startSelect">
	            ${renderOptions()}
	        </select><br>
	        <label for="selectSpace">Select a destination: </label>
	        <select class="${settings.endSelectClass}" id="endSelect">
	            ${renderOptions(spaces.length - 1)}
	        </select><br><br>
	        <div class="${settings.outputClass}"></div>
	    `);
	    startSelectEl = routingEl.querySelector(`.${settings.startSelectClass}`);
	    endSelectEl = routingEl.querySelector(`.${settings.endSelectClass}`);
	    outputEl = routingEl.querySelector(`.${settings.outputClass}`);
	    bindEvents();
	    filterOptions();
	}

	function renderOptions(selectedIndex = 0) {
		const floors = getFloorNumbers();
		let floorsOutput = '';
		floors.forEach(floor => {
			const floorSpaces = spaces.filter(space => space.floor === floor);
			const floorOutput = floorSpaces.reduce((output, space, index) => `
		        ${output}
		        <option value="${space.id}"${selectedIndex === index ? ' selected' : ''}>${space.name}</option> 
		    `, '');
		    floorsOutput += `
		    	<optgroup label="Floor ${floor}">
		    		${floorOutput}
		    	</optgroup>
		    `;
		});
		return floorsOutput;
	}

	function filterOptions() {
		Array.from(startSelectEl.options).forEach((option, optionIndex) => {
			option.disabled = optionIndex === endSelectEl.selectedIndex;
		});
		Array.from(endSelectEl.options).forEach((option, optionIndex) => {
			option.disabled = optionIndex === startSelectEl.selectedIndex;
		});
	}

	function getFloorNumbers() {
		let floors = [];
		spaces.forEach(space => {
			if (!floors.includes(space.floor) && space.floor !== 0) {
				floors.push(space.floor);
			}
		});
		return floors.sort();
	}

	init();

};

export default render;