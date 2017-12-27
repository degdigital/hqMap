import Graph from 'components/routing/graph.js';
import render from 'components/routing/rendering.js';

const routing = function(spaces, options = {}) {

	const defaults = {
		wrapperSelector: '.js-routing',
		startSelectClass: 'js-start-select',
		endSelectClass: 'js-end-select',
		outputClass: 'js-output'
	};
	const errors = {
		noSpacesDefined: 'No spaces defined.'
	};
	let settings;
	let graph;

	function init() {
		if (!spaces || spaces.length === 0) {
			console.log(errors.noSpacesDefined);
			return;
		}
		settings = Object.assign({}, defaults, options);
		const map = createMap(spaces);
		debugger;
		graph = createGraph(map);
		render(spaces, {...settings, 
			getRoute: getRoute
		});
	}

	function createMap(spaces) {
		return {...spaces.map(space => normalizeAdjacentSpaces(space.adjacentSpaces))};
	}

	function createGraph(map) {
		return new Graph(map);
	}

	function normalizeAdjacentSpaces(adjacentSpaces) {
		if (Array.isArray(adjacentSpaces)) {
			adjacentSpaces = adjacentSpaces.reduce((output, space) => {
				let key = convertBooleanToDistanceInteger(space);
				output[key] = 1;
				return output;
			}, {});
		}
		let output = {};
		for (let key in adjacentSpaces) {
			let val = adjacentSpaces[parseInt(key)];
			output[key] = convertBooleanToDistanceInteger(val);
		}
		return output;
	}

	function convertBooleanToDistanceInteger(val) {
		return typeof val === 'boolean' ? 1 : val;
	}

	function getRoute(start, finish, returnNames = true) {
		const shortestRoute = graph.findShortestPath(start, finish);
		if (shortestRoute !== null) {
			if (returnNames === true) {
				return getRouteSpaces(shortestRoute);
			} else {
				return shortestRoute.map(id => parseInt(id));
			}
		} else {
			return null;
		}
	}

	function getRouteSpaces(ids) {
		return ids.map(id => spaces[id]);
	}

	init();

};

export default routing;