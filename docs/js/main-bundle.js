System.register('components/compass.js', [], function (_export) {
	'use strict';

	var compass;
	return {
		setters: [],
		execute: function () {
			compass = function compass(el) {

				function compassHeading(alpha, beta, gamma) {
					var alphaRad = alpha * (Math.PI / 180);
					var betaRad = beta * (Math.PI / 180);
					var gammaRad = gamma * (Math.PI / 180);
					var cA = Math.cos(alphaRad);
					var sA = Math.sin(alphaRad);
					var sB = Math.sin(betaRad);
					var cG = Math.cos(gammaRad);
					var sG = Math.sin(gammaRad);
					var rA = -cA * sG - sA * sB * cG;
					var rB = -sA * sG + cA * sB * cG;
					var compassHeading = Math.atan(rA / rB);

					if (rB < 0) {
						compassHeading += Math.PI;
					} else if (rA < 0) {
						compassHeading += 2 * Math.PI;
					}
					compassHeading *= 180 / Math.PI;

					return compassHeading;
				}

				function getCardinal(angle) {
					var directions = 8;
					var degree = 360 / directions;
					angle = angle + degree / 2;

					if (angle >= 0 * degree && angle < 1 * degree) {
						return 'North';
					}
					if (angle >= 1 * degree && angle < 2 * degree) {
						return 'Northeast';
					}
					if (angle >= 2 * degree && angle < 3 * degree) {
						return 'East';
					}
					if (angle >= 3 * degree && angle < 4 * degree) {
						return 'Southeast';
					}
					if (angle >= 4 * degree && angle < 5 * degree) {
						return 'South';
					}
					if (angle >= 5 * degree && angle < 6 * degree) {
						return 'Southwest';
					}
					if (angle >= 6 * degree && angle < 7 * degree) {
						return 'West';
					}
					if (angle >= 7 * degree && angle < 8 * degree) {
						return 'Northwest';
					}
					return 'Unknown';
				}

				window.addEventListener('deviceorientation', function (e) {
					var heading = null;
					if (e.webkitCompassHeading) {
						heading = e.webkitCompassHeading;
					} else {
						heading = compassHeading(e.alpha, e.beta, e.gamma);
					}
					el.innerHTML = getCardinal(heading);
				}, false);
			};

			_export('default', compass);
		}
	};
});

System.registerDynamic("npm:babel-runtime@5.8.38/helpers/extends.js", ["npm:babel-runtime@5.8.38/core-js/object/assign.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var _Object$assign = $__require("npm:babel-runtime@5.8.38/core-js/object/assign.js")["default"];
  exports["default"] = _Object$assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  exports.__esModule = true;
});
System.register('components/routing/graph.js', [], function (_export) {
	'use strict';

	var Graph;
	return {
		setters: [],
		execute: function () {
			Graph = (function (undefined) {

				var extractKeys = function extractKeys(obj) {
					var keys = [],
					    key = undefined;
					for (key in obj) {
						Object.prototype.hasOwnProperty.call(obj, key) && keys.push(key);
					}
					return keys;
				};

				var sorter = function sorter(a, b) {
					return parseFloat(a) - parseFloat(b);
				};

				var findPaths = function findPaths(map, start, end, infinity) {
					infinity = infinity || Infinity;

					var costs = {},
					    open = { '0': [start] },
					    predecessors = {},
					    keys = undefined;

					var addToOpen = function addToOpen(cost, vertex) {
						var key = "" + cost;
						if (!open[key]) open[key] = [];
						open[key].push(vertex);
					};

					costs[start] = 0;

					while (open) {
						if (!(keys = extractKeys(open)).length) break;

						keys.sort(sorter);

						var key = keys[0],
						    bucket = open[key],
						    node = bucket.shift(),
						    currentCost = parseFloat(key),
						    adjacentNodes = map[node] || {};

						if (!bucket.length) delete open[key];

						for (var vertex in adjacentNodes) {
							if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
								var cost = adjacentNodes[vertex],
								    totalCost = cost + currentCost,
								    vertexCost = costs[vertex];

								if (vertexCost === undefined || vertexCost > totalCost) {
									costs[vertex] = totalCost;
									addToOpen(totalCost, vertex);
									predecessors[vertex] = node;
								}
							}
						}
					}

					if (costs[end] === undefined) {
						return null;
					} else {
						return predecessors;
					}
				};

				var extractShortest = function extractShortest(predecessors, end) {
					var nodes = [],
					    u = end;

					while (u !== undefined) {
						nodes.push(u);
						u = predecessors[u];
					}

					nodes.reverse();
					return nodes;
				};

				var findShortestPath = function findShortestPath(map, nodes) {
					var start = nodes.shift(),
					    end = undefined,
					    predecessors = undefined,
					    path = [],
					    shortest = undefined;

					while (nodes.length) {
						end = nodes.shift();
						predecessors = findPaths(map, start, end);

						if (predecessors) {
							shortest = extractShortest(predecessors, end);
							if (nodes.length) {
								path.push.apply(path, shortest.slice(0, -1));
							} else {
								return path.concat(shortest);
							}
						} else {
							return null;
						}

						start = end;
					}
				};

				var toArray = function toArray(list, offset) {
					try {
						return Array.prototype.slice.call(list, offset);
					} catch (e) {
						var a = [];
						for (var i = offset || 0, l = list.length; i < l; ++i) {
							a.push(list[i]);
						}
						return a;
					}
				};

				var Graph = function Graph(map) {
					this.map = map;
				};

				Graph.prototype.findShortestPath = function (start, end) {
					if (Object.prototype.toString.call(start) === '[object Array]') {
						return findShortestPath(this.map, start);
					} else if (arguments.length === 2) {
						return findShortestPath(this.map, [start, end]);
					} else {
						return findShortestPath(this.map, toArray(arguments));
					}
				};

				Graph.findShortestPath = function (map, start, end) {
					if (Object.prototype.toString.call(start) === '[object Array]') {
						return findShortestPath(map, start);
					} else if (arguments.length === 3) {
						return findShortestPath(map, [start, end]);
					} else {
						return findShortestPath(map, toArray(arguments, 1));
					}
				};

				return Graph;
			})();

			_export('default', Graph);
		}
	};
});

System.register('github:DEGJS/domUtils@2.1.1/domUtils.js', ['github:DEGJS/objectUtils@2.1.0.js'], function (_export) {
    /* */
    'use strict';

    var ensureArray;

    function isElement(o) {
        return typeof HTMLElement === 'object' ? o instanceof HTMLElement : o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string';
    }

    function createElement(nodeName, classNames) {
        classNames = ensureArray(classNames);
        var el = document.createElement(nodeName);
        classNames.forEach(function (className) {
            return el.classList.add(className);
        });
        return el;
    }

    function emptyElement(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

    function emptyElements(els) {
        els = ensureArray(els);
        els.forEach(function (el) {
            return emptyElement(el);
        });
    }

    function replaceContent(el, newContent) {
        emptyElement(el);
        el.insertAdjacentHTML('afterbegin', newContent);
    }

    function removeElements(els) {
        els = ensureArray(els);
        els.forEach(function (el) {
            return el.parentNode.removeChild(el);
        });
    }

    function wrapElements(elsToWrap, wrapperEl) {
        elsToWrap = ensureArray(elsToWrap);
        var firstElToWrap = elsToWrap[0];
        firstElToWrap.parentNode.insertBefore(wrapperEl, firstElToWrap);
        elsToWrap.forEach(function (elToWrap) {
            return wrapperEl.appendChild(elToWrap);
        });
    }

    function unwrapElements(wrapperEls) {
        wrapperEls = ensureArray(wrapperEls);
        wrapperEls.forEach(function (wrapperEl) {
            var fragment = document.createDocumentFragment();
            while (wrapperEl.firstChild) {
                fragment.appendChild(wrapperEl.firstChild);
            }
            wrapperEl.parentNode.replaceChild(fragment, wrapperEl);
        });
    }

    return {
        setters: [function (_githubDEGJSObjectUtils210Js) {
            ensureArray = _githubDEGJSObjectUtils210Js.ensureArray;
        }],
        execute: function () {
            _export('isElement', isElement);

            _export('createElement', createElement);

            _export('emptyElements', emptyElements);

            _export('replaceContent', replaceContent);

            _export('removeElements', removeElements);

            _export('wrapElements', wrapElements);

            _export('unwrapElements', unwrapElements);
        }
    };
});

System.register("github:DEGJS/domUtils@2.1.1.js", ["github:DEGJS/domUtils@2.1.1/domUtils.js"], function (_export) {
  "use strict";

  return {
    setters: [function (_githubDEGJSDomUtils211DomUtilsJs) {
      var _exportObj = {};

      for (var _key in _githubDEGJSDomUtils211DomUtilsJs) {
        if (_key !== "default") _exportObj[_key] = _githubDEGJSDomUtils211DomUtilsJs[_key];
      }

      _exportObj["default"] = _githubDEGJSDomUtils211DomUtilsJs["default"];

      _export(_exportObj);
    }],
    execute: function () {}
  };
});

System.register('components/routing/rendering.js', ['npm:babel-runtime@5.8.38/core-js/array/from.js', 'github:DEGJS/domUtils@2.1.1.js'], function (_export) {
	var _Array$from, replaceContent, render;

	return {
		setters: [function (_npmBabelRuntime5838CoreJsArrayFromJs) {
			_Array$from = _npmBabelRuntime5838CoreJsArrayFromJs['default'];
		}, function (_githubDEGJSDomUtils211Js) {
			replaceContent = _githubDEGJSDomUtils211Js.replaceContent;
		}],
		execute: function () {
			'use strict';

			render = function render(spaces, settings) {

				var routingEl = undefined;
				var startSelectEl = undefined;
				var endSelectEl = undefined;
				var outputEl = undefined;

				function init() {
					render();
					renderRoute();
				}

				function bindEvents() {
					routingEl.addEventListener('change', function () {
						renderRoute();
						filterOptions();
					});
				}

				function renderRoute() {
					var route = settings.getRoute(startSelectEl.value, endSelectEl.value);
					var routeNames = route.map(function (routeItem) {
						return '' + routeItem.name;
					});
					replaceContent(outputEl, '\n        \t<strong>Fastest route:</strong><br>\n        \t' + routeNames.join('<br>') + '\n        ');
				}

				function render() {
					routingEl = document.querySelector(settings.wrapperSelector);
					routingEl.insertAdjacentHTML('afterbegin', '\n\t        <label for="startSelect">Select a starting point: </label>\n\t        <select class="' + settings.startSelectClass + '" id="startSelect">\n\t            ' + renderOptions() + '\n\t        </select><br>\n\t        <label for="selectSpace">Select a destination: </label>\n\t        <select class="' + settings.endSelectClass + '" id="endSelect">\n\t            ' + renderOptions(spaces.length - 1) + '\n\t        </select><br><br>\n\t        <div class="' + settings.outputClass + '"></div>\n\t    ');
					startSelectEl = routingEl.querySelector('.' + settings.startSelectClass);
					endSelectEl = routingEl.querySelector('.' + settings.endSelectClass);
					outputEl = routingEl.querySelector('.' + settings.outputClass);
					bindEvents();
					filterOptions();
				}

				function renderOptions() {
					var selectedIndex = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

					var floors = getFloorNumbers();
					var floorsOutput = '';
					floors.forEach(function (floor) {
						var floorSpaces = spaces.filter(function (space) {
							return space.floor === floor;
						});
						var floorOutput = floorSpaces.reduce(function (output, space, index) {
							return '\n\t\t        ' + output + '\n\t\t        <option value="' + space.id + '"' + (selectedIndex === index ? ' selected' : '') + '>' + space.name + '</option> \n\t\t    ';
						}, '');
						floorsOutput += '\n\t\t    \t<optgroup label="Floor ' + floor + '">\n\t\t    \t\t' + floorOutput + '\n\t\t    \t</optgroup>\n\t\t    ';
					});
					return floorsOutput;
				}

				function filterOptions() {
					_Array$from(startSelectEl.options).forEach(function (option, optionIndex) {
						option.disabled = optionIndex === endSelectEl.selectedIndex;
					});
					_Array$from(endSelectEl.options).forEach(function (option, optionIndex) {
						option.disabled = optionIndex === startSelectEl.selectedIndex;
					});
				}

				function getFloorNumbers() {
					var floors = [];
					spaces.forEach(function (space) {
						if (!floors.includes(space.floor) && space.floor !== 0) {
							floors.push(space.floor);
						}
					});
					return floors.sort();
				}

				init();
			};

			_export('default', render);
		}
	};
});

System.register('components/routing/routing.js', ['npm:babel-runtime@5.8.38/helpers/extends.js', 'npm:babel-runtime@5.8.38/core-js/object/assign.js', 'components/routing/graph.js', 'components/routing/rendering.js'], function (_export) {
	var _extends, _Object$assign, Graph, render, routing;

	return {
		setters: [function (_npmBabelRuntime5838HelpersExtendsJs) {
			_extends = _npmBabelRuntime5838HelpersExtendsJs['default'];
		}, function (_npmBabelRuntime5838CoreJsObjectAssignJs) {
			_Object$assign = _npmBabelRuntime5838CoreJsObjectAssignJs['default'];
		}, function (_componentsRoutingGraphJs) {
			Graph = _componentsRoutingGraphJs['default'];
		}, function (_componentsRoutingRenderingJs) {
			render = _componentsRoutingRenderingJs['default'];
		}],
		execute: function () {
			'use strict';

			routing = function routing(spaces) {
				var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

				var defaults = {
					wrapperSelector: '.js-routing',
					startSelectClass: 'js-start-select',
					endSelectClass: 'js-end-select',
					outputClass: 'js-output'
				};
				var errors = {
					noSpacesDefined: 'No spaces defined.'
				};
				var settings = undefined;
				var graph = undefined;

				function init() {
					if (!spaces || spaces.length === 0) {
						console.log(errors.noSpacesDefined);
						return;
					}
					settings = _Object$assign({}, defaults, options);
					var map = createMap(spaces);
					graph = createGraph(map);
					render(spaces, _extends({}, settings, {
						getRoute: getRoute
					}));
				}

				function createMap(spaces) {
					return _extends({}, spaces.map(function (space) {
						return normalizeAdjacentSpaces(space.adjacentSpaces);
					}));
				}

				function createGraph(map) {
					return new Graph(map);
				}

				function normalizeAdjacentSpaces(adjacentSpaces) {
					if (Array.isArray(adjacentSpaces)) {
						adjacentSpaces = adjacentSpaces.reduce(function (output, space) {
							var key = convertBooleanToDistanceInteger(space);
							output[key] = 1;
							return output;
						}, {});
					}
					var output = {};
					for (var key in adjacentSpaces) {
						var val = adjacentSpaces[parseInt(key)];
						output[key] = convertBooleanToDistanceInteger(val);
					}
					return output;
				}

				function convertBooleanToDistanceInteger(val) {
					return typeof val === 'boolean' ? 1 : val;
				}

				function getRoute(start, finish) {
					var returnNames = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

					var shortestRoute = graph.findShortestPath(start, finish);
					if (shortestRoute !== null) {
						if (returnNames === true) {
							return getRouteSpaces(shortestRoute);
						} else {
							return shortestRoute.map(function (id) {
								return parseInt(id);
							});
						}
					} else {
						return null;
					}
				}

				function getRouteSpaces(ids) {
					return ids.map(function (id) {
						return spaces[id];
					});
				}

				init();
			};

			_export('default', routing);
		}
	};
});

System.registerDynamic("npm:core-js@1.2.7/library/modules/es6.object.to-string.js", [], true, function ($__require, exports, module) {
  /* */
  "format cjs";

  var global = this || self,
      GLOBAL = global;
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.add-to-unscopables.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function () {/* empty */};
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.iter-step.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (done, value) {
    return { value: value, done: !!done };
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.to-iobject.js', ['npm:core-js@1.2.7/library/modules/$.iobject.js', 'npm:core-js@1.2.7/library/modules/$.defined.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var IObject = $__require('npm:core-js@1.2.7/library/modules/$.iobject.js'),
      defined = $__require('npm:core-js@1.2.7/library/modules/$.defined.js');
  module.exports = function (it) {
    return IObject(defined(it));
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/es6.array.iterator.js', ['npm:core-js@1.2.7/library/modules/$.add-to-unscopables.js', 'npm:core-js@1.2.7/library/modules/$.iter-step.js', 'npm:core-js@1.2.7/library/modules/$.iterators.js', 'npm:core-js@1.2.7/library/modules/$.to-iobject.js', 'npm:core-js@1.2.7/library/modules/$.iter-define.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var addToUnscopables = $__require('npm:core-js@1.2.7/library/modules/$.add-to-unscopables.js'),
      step = $__require('npm:core-js@1.2.7/library/modules/$.iter-step.js'),
      Iterators = $__require('npm:core-js@1.2.7/library/modules/$.iterators.js'),
      toIObject = $__require('npm:core-js@1.2.7/library/modules/$.to-iobject.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.iter-define.js')(Array, 'Array', function (iterated, kind) {
    this._t = toIObject(iterated);
    this._i = 0;
    this._k = kind;
  }, function () {
    var O = this._t,
        kind = this._k,
        index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return step(1);
    }
    if (kind == 'keys') return step(0, index);
    if (kind == 'values') return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  Iterators.Arguments = Iterators.Array;
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/web.dom.iterable.js', ['npm:core-js@1.2.7/library/modules/es6.array.iterator.js', 'npm:core-js@1.2.7/library/modules/$.iterators.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  $__require('npm:core-js@1.2.7/library/modules/es6.array.iterator.js');
  var Iterators = $__require('npm:core-js@1.2.7/library/modules/$.iterators.js');
  Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.strict-new.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.for-of.js', ['npm:core-js@1.2.7/library/modules/$.ctx.js', 'npm:core-js@1.2.7/library/modules/$.iter-call.js', 'npm:core-js@1.2.7/library/modules/$.is-array-iter.js', 'npm:core-js@1.2.7/library/modules/$.an-object.js', 'npm:core-js@1.2.7/library/modules/$.to-length.js', 'npm:core-js@1.2.7/library/modules/core.get-iterator-method.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var ctx = $__require('npm:core-js@1.2.7/library/modules/$.ctx.js'),
      call = $__require('npm:core-js@1.2.7/library/modules/$.iter-call.js'),
      isArrayIter = $__require('npm:core-js@1.2.7/library/modules/$.is-array-iter.js'),
      anObject = $__require('npm:core-js@1.2.7/library/modules/$.an-object.js'),
      toLength = $__require('npm:core-js@1.2.7/library/modules/$.to-length.js'),
      getIterFn = $__require('npm:core-js@1.2.7/library/modules/core.get-iterator-method.js');
  module.exports = function (iterable, entries, fn, that) {
    var iterFn = getIterFn(iterable),
        f = ctx(fn, that, entries ? 2 : 1),
        index = 0,
        length,
        step,
        iterator;
    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
    if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
      entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
      call(iterator, f, step.value, entries);
    }
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.set-proto.js', ['npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.is-object.js', 'npm:core-js@1.2.7/library/modules/$.an-object.js', 'npm:core-js@1.2.7/library/modules/$.ctx.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var getDesc = $__require('npm:core-js@1.2.7/library/modules/$.js').getDesc,
      isObject = $__require('npm:core-js@1.2.7/library/modules/$.is-object.js'),
      anObject = $__require('npm:core-js@1.2.7/library/modules/$.an-object.js');
  var check = function (O, proto) {
    anObject(O);
    if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function (test, buggy, set) {
      try {
        set = $__require('npm:core-js@1.2.7/library/modules/$.ctx.js')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
    check: check
  };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.same-value.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  // 7.2.9 SameValue(x, y)
  module.exports = Object.is || function is(x, y) {
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.species-constructor.js', ['npm:core-js@1.2.7/library/modules/$.an-object.js', 'npm:core-js@1.2.7/library/modules/$.a-function.js', 'npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var anObject = $__require('npm:core-js@1.2.7/library/modules/$.an-object.js'),
        aFunction = $__require('npm:core-js@1.2.7/library/modules/$.a-function.js'),
        SPECIES = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('species');
    module.exports = function (O, D) {
        var C = anObject(O).constructor,
            S;
        return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
    };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.invoke.js", [], true, function ($__require, exports, module) {
                  var global = this || self,
                      GLOBAL = global;
                  // fast apply, http://jsperf.lnkit.com/fast-apply/5
                  module.exports = function (fn, args, that) {
                                    var un = that === undefined;
                                    switch (args.length) {
                                                      case 0:
                                                                        return un ? fn() : fn.call(that);
                                                      case 1:
                                                                        return un ? fn(args[0]) : fn.call(that, args[0]);
                                                      case 2:
                                                                        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
                                                      case 3:
                                                                        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
                                                      case 4:
                                                                        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
                                    }return fn.apply(that, args);
                  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.html.js', ['npm:core-js@1.2.7/library/modules/$.global.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.global.js').document && document.documentElement;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.dom-create.js', ['npm:core-js@1.2.7/library/modules/$.is-object.js', 'npm:core-js@1.2.7/library/modules/$.global.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var isObject = $__require('npm:core-js@1.2.7/library/modules/$.is-object.js'),
        document = $__require('npm:core-js@1.2.7/library/modules/$.global.js').document,
        is = isObject(document) && isObject(document.createElement);
    module.exports = function (it) {
        return is ? document.createElement(it) : {};
    };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.task.js', ['npm:core-js@1.2.7/library/modules/$.ctx.js', 'npm:core-js@1.2.7/library/modules/$.invoke.js', 'npm:core-js@1.2.7/library/modules/$.html.js', 'npm:core-js@1.2.7/library/modules/$.dom-create.js', 'npm:core-js@1.2.7/library/modules/$.global.js', 'npm:core-js@1.2.7/library/modules/$.cof.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    var ctx = $__require('npm:core-js@1.2.7/library/modules/$.ctx.js'),
        invoke = $__require('npm:core-js@1.2.7/library/modules/$.invoke.js'),
        html = $__require('npm:core-js@1.2.7/library/modules/$.html.js'),
        cel = $__require('npm:core-js@1.2.7/library/modules/$.dom-create.js'),
        global = $__require('npm:core-js@1.2.7/library/modules/$.global.js'),
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
    var run = function () {
      var id = +this;
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };
    var listner = function (event) {
      run.call(event.data);
    };
    if (!setTask || !clearTask) {
      setTask = function setImmediate(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i) args.push(arguments[i++]);
        queue[++counter] = function () {
          invoke(typeof fn == 'function' ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function clearImmediate(id) {
        delete queue[id];
      };
      if ($__require('npm:core-js@1.2.7/library/modules/$.cof.js')(process) == 'process') {
        defer = function (id) {
          process.nextTick(ctx(run, id, 1));
        };
      } else if (MessageChannel) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = listner;
        defer = ctx(port.postMessage, port, 1);
      } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
        defer = function (id) {
          global.postMessage(id + '', '*');
        };
        global.addEventListener('message', listner, false);
      } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function (id) {
          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
            html.removeChild(this);
            run.call(id);
          };
        };
      } else {
        defer = function (id) {
          setTimeout(ctx(run, id, 1), 0);
        };
      }
    }
    module.exports = {
      set: setTask,
      clear: clearTask
    };
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.microtask.js', ['npm:core-js@1.2.7/library/modules/$.global.js', 'npm:core-js@1.2.7/library/modules/$.task.js', 'npm:core-js@1.2.7/library/modules/$.cof.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    var global = $__require('npm:core-js@1.2.7/library/modules/$.global.js'),
        macrotask = $__require('npm:core-js@1.2.7/library/modules/$.task.js').set,
        Observer = global.MutationObserver || global.WebKitMutationObserver,
        process = global.process,
        Promise = global.Promise,
        isNode = $__require('npm:core-js@1.2.7/library/modules/$.cof.js')(process) == 'process',
        head,
        last,
        notify;
    var flush = function () {
      var parent, domain, fn;
      if (isNode && (parent = process.domain)) {
        process.domain = null;
        parent.exit();
      }
      while (head) {
        domain = head.domain;
        fn = head.fn;
        if (domain) domain.enter();
        fn();
        if (domain) domain.exit();
        head = head.next;
      }
      last = undefined;
      if (parent) parent.enter();
    };
    if (isNode) {
      notify = function () {
        process.nextTick(flush);
      };
    } else if (Observer) {
      var toggle = 1,
          node = document.createTextNode('');
      new Observer(flush).observe(node, { characterData: true });
      notify = function () {
        node.data = toggle = -toggle;
      };
    } else if (Promise && Promise.resolve) {
      notify = function () {
        Promise.resolve().then(flush);
      };
    } else {
      notify = function () {
        macrotask.call(global, flush);
      };
    }
    module.exports = function asap(fn) {
      var task = {
        fn: fn,
        next: undefined,
        domain: isNode && process.domain
      };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify();
      }
      last = task;
    };
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.redefine-all.js', ['npm:core-js@1.2.7/library/modules/$.redefine.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var redefine = $__require('npm:core-js@1.2.7/library/modules/$.redefine.js');
  module.exports = function (target, src) {
    for (var key in src) redefine(target, key, src[key]);
    return target;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.set-species.js', ['npm:core-js@1.2.7/library/modules/$.core.js', 'npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.descriptors.js', 'npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var core = $__require('npm:core-js@1.2.7/library/modules/$.core.js'),
      $ = $__require('npm:core-js@1.2.7/library/modules/$.js'),
      DESCRIPTORS = $__require('npm:core-js@1.2.7/library/modules/$.descriptors.js'),
      SPECIES = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('species');
  module.exports = function (KEY) {
    var C = core[KEY];
    if (DESCRIPTORS && C && !C[SPECIES]) $.setDesc(C, SPECIES, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  };
});
System.registerDynamic('npm:process@0.11.10/browser.js', [], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    // shim for using process in browser
    var process = module.exports = {};

    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.

    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
    }
    (function () {
        try {
            if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            } else {
                cachedSetTimeout = defaultSetTimout;
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            } else {
                cachedClearTimeout = defaultClearTimeout;
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    })();
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    }
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
            }
        }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }

    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }

    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };

    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;

    process.listeners = function (name) {
        return [];
    };

    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };

    process.cwd = function () {
        return '/';
    };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
        return 0;
    };
});
System.registerDynamic("npm:process@0.11.10.js", ["npm:process@0.11.10/browser.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:process@0.11.10/browser.js");
});
System.registerDynamic('github:jspm/nodelibs-process@0.1.2/index.js', ['npm:process@0.11.10.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.11.10.js');
});
System.registerDynamic("github:jspm/nodelibs-process@0.1.2.js", ["github:jspm/nodelibs-process@0.1.2/index.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("github:jspm/nodelibs-process@0.1.2/index.js");
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/es6.promise.js', ['npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.library.js', 'npm:core-js@1.2.7/library/modules/$.global.js', 'npm:core-js@1.2.7/library/modules/$.ctx.js', 'npm:core-js@1.2.7/library/modules/$.classof.js', 'npm:core-js@1.2.7/library/modules/$.export.js', 'npm:core-js@1.2.7/library/modules/$.is-object.js', 'npm:core-js@1.2.7/library/modules/$.an-object.js', 'npm:core-js@1.2.7/library/modules/$.a-function.js', 'npm:core-js@1.2.7/library/modules/$.strict-new.js', 'npm:core-js@1.2.7/library/modules/$.for-of.js', 'npm:core-js@1.2.7/library/modules/$.set-proto.js', 'npm:core-js@1.2.7/library/modules/$.same-value.js', 'npm:core-js@1.2.7/library/modules/$.wks.js', 'npm:core-js@1.2.7/library/modules/$.species-constructor.js', 'npm:core-js@1.2.7/library/modules/$.microtask.js', 'npm:core-js@1.2.7/library/modules/$.descriptors.js', 'npm:core-js@1.2.7/library/modules/$.redefine-all.js', 'npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js', 'npm:core-js@1.2.7/library/modules/$.set-species.js', 'npm:core-js@1.2.7/library/modules/$.core.js', 'npm:core-js@1.2.7/library/modules/$.iter-detect.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    var $ = $__require('npm:core-js@1.2.7/library/modules/$.js'),
        LIBRARY = $__require('npm:core-js@1.2.7/library/modules/$.library.js'),
        global = $__require('npm:core-js@1.2.7/library/modules/$.global.js'),
        ctx = $__require('npm:core-js@1.2.7/library/modules/$.ctx.js'),
        classof = $__require('npm:core-js@1.2.7/library/modules/$.classof.js'),
        $export = $__require('npm:core-js@1.2.7/library/modules/$.export.js'),
        isObject = $__require('npm:core-js@1.2.7/library/modules/$.is-object.js'),
        anObject = $__require('npm:core-js@1.2.7/library/modules/$.an-object.js'),
        aFunction = $__require('npm:core-js@1.2.7/library/modules/$.a-function.js'),
        strictNew = $__require('npm:core-js@1.2.7/library/modules/$.strict-new.js'),
        forOf = $__require('npm:core-js@1.2.7/library/modules/$.for-of.js'),
        setProto = $__require('npm:core-js@1.2.7/library/modules/$.set-proto.js').set,
        same = $__require('npm:core-js@1.2.7/library/modules/$.same-value.js'),
        SPECIES = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('species'),
        speciesConstructor = $__require('npm:core-js@1.2.7/library/modules/$.species-constructor.js'),
        asap = $__require('npm:core-js@1.2.7/library/modules/$.microtask.js'),
        PROMISE = 'Promise',
        process = global.process,
        isNode = classof(process) == 'process',
        P = global[PROMISE],
        empty = function () {},
        Wrapper;
    var testResolve = function (sub) {
      var test = new P(empty),
          promise;
      if (sub) test.constructor = function (exec) {
        exec(empty, empty);
      };
      (promise = P.resolve(test))['catch'](empty);
      return promise === test;
    };
    var USE_NATIVE = function () {
      var works = false;
      function P2(x) {
        var self = new P(x);
        setProto(self, P2.prototype);
        return self;
      }
      try {
        works = P && P.resolve && testResolve();
        setProto(P2, P);
        P2.prototype = $.create(P.prototype, { constructor: { value: P2 } });
        if (!(P2.resolve(5).then(function () {}) instanceof P2)) {
          works = false;
        }
        if (works && $__require('npm:core-js@1.2.7/library/modules/$.descriptors.js')) {
          var thenableThenGotten = false;
          P.resolve($.setDesc({}, 'then', { get: function () {
              thenableThenGotten = true;
            } }));
          works = thenableThenGotten;
        }
      } catch (e) {
        works = false;
      }
      return works;
    }();
    var sameConstructor = function (a, b) {
      if (LIBRARY && a === P && b === Wrapper) return true;
      return same(a, b);
    };
    var getConstructor = function (C) {
      var S = anObject(C)[SPECIES];
      return S != undefined ? S : C;
    };
    var isThenable = function (it) {
      var then;
      return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
    };
    var PromiseCapability = function (C) {
      var resolve, reject;
      this.promise = new C(function ($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aFunction(resolve), this.reject = aFunction(reject);
    };
    var perform = function (exec) {
      try {
        exec();
      } catch (e) {
        return { error: e };
      }
    };
    var notify = function (record, isReject) {
      if (record.n) return;
      record.n = true;
      var chain = record.c;
      asap(function () {
        var value = record.v,
            ok = record.s == 1,
            i = 0;
        var run = function (reaction) {
          var handler = ok ? reaction.ok : reaction.fail,
              resolve = reaction.resolve,
              reject = reaction.reject,
              result,
              then;
          try {
            if (handler) {
              if (!ok) record.h = true;
              result = handler === true ? value : handler(value);
              if (result === reaction.promise) {
                reject(TypeError('Promise-chain cycle'));
              } else if (then = isThenable(result)) {
                then.call(result, resolve, reject);
              } else resolve(result);
            } else reject(value);
          } catch (e) {
            reject(e);
          }
        };
        while (chain.length > i) run(chain[i++]);
        chain.length = 0;
        record.n = false;
        if (isReject) setTimeout(function () {
          var promise = record.p,
              handler,
              console;
          if (isUnhandled(promise)) {
            if (isNode) {
              process.emit('unhandledRejection', value, promise);
            } else if (handler = global.onunhandledrejection) {
              handler({
                promise: promise,
                reason: value
              });
            } else if ((console = global.console) && console.error) {
              console.error('Unhandled promise rejection', value);
            }
          }
          record.a = undefined;
        }, 1);
      });
    };
    var isUnhandled = function (promise) {
      var record = promise._d,
          chain = record.a || record.c,
          i = 0,
          reaction;
      if (record.h) return false;
      while (chain.length > i) {
        reaction = chain[i++];
        if (reaction.fail || !isUnhandled(reaction.promise)) return false;
      }
      return true;
    };
    var $reject = function (value) {
      var record = this;
      if (record.d) return;
      record.d = true;
      record = record.r || record;
      record.v = value;
      record.s = 2;
      record.a = record.c.slice();
      notify(record, true);
    };
    var $resolve = function (value) {
      var record = this,
          then;
      if (record.d) return;
      record.d = true;
      record = record.r || record;
      try {
        if (record.p === value) throw TypeError("Promise can't be resolved itself");
        if (then = isThenable(value)) {
          asap(function () {
            var wrapper = {
              r: record,
              d: false
            };
            try {
              then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
            } catch (e) {
              $reject.call(wrapper, e);
            }
          });
        } else {
          record.v = value;
          record.s = 1;
          notify(record, false);
        }
      } catch (e) {
        $reject.call({
          r: record,
          d: false
        }, e);
      }
    };
    if (!USE_NATIVE) {
      P = function Promise(executor) {
        aFunction(executor);
        var record = this._d = {
          p: strictNew(this, P, PROMISE),
          c: [],
          a: undefined,
          s: 0,
          d: false,
          v: undefined,
          h: false,
          n: false
        };
        try {
          executor(ctx($resolve, record, 1), ctx($reject, record, 1));
        } catch (err) {
          $reject.call(record, err);
        }
      };
      $__require('npm:core-js@1.2.7/library/modules/$.redefine-all.js')(P.prototype, {
        then: function then(onFulfilled, onRejected) {
          var reaction = new PromiseCapability(speciesConstructor(this, P)),
              promise = reaction.promise,
              record = this._d;
          reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
          reaction.fail = typeof onRejected == 'function' && onRejected;
          record.c.push(reaction);
          if (record.a) record.a.push(reaction);
          if (record.s) notify(record, false);
          return promise;
        },
        'catch': function (onRejected) {
          return this.then(undefined, onRejected);
        }
      });
    }
    $export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: P });
    $__require('npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js')(P, PROMISE);
    $__require('npm:core-js@1.2.7/library/modules/$.set-species.js')(PROMISE);
    Wrapper = $__require('npm:core-js@1.2.7/library/modules/$.core.js')[PROMISE];
    $export($export.S + $export.F * !USE_NATIVE, PROMISE, { reject: function reject(r) {
        var capability = new PromiseCapability(this),
            $$reject = capability.reject;
        $$reject(r);
        return capability.promise;
      } });
    $export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, { resolve: function resolve(x) {
        if (x instanceof P && sameConstructor(x.constructor, this)) return x;
        var capability = new PromiseCapability(this),
            $$resolve = capability.resolve;
        $$resolve(x);
        return capability.promise;
      } });
    $export($export.S + $export.F * !(USE_NATIVE && $__require('npm:core-js@1.2.7/library/modules/$.iter-detect.js')(function (iter) {
      P.all(iter)['catch'](function () {});
    })), PROMISE, {
      all: function all(iterable) {
        var C = getConstructor(this),
            capability = new PromiseCapability(C),
            resolve = capability.resolve,
            reject = capability.reject,
            values = [];
        var abrupt = perform(function () {
          forOf(iterable, false, values.push, values);
          var remaining = values.length,
              results = Array(remaining);
          if (remaining) $.each.call(values, function (promise, index) {
            var alreadyCalled = false;
            C.resolve(promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              results[index] = value;
              --remaining || resolve(results);
            }, reject);
          });else resolve(results);
        });
        if (abrupt) reject(abrupt.error);
        return capability.promise;
      },
      race: function race(iterable) {
        var C = getConstructor(this),
            capability = new PromiseCapability(C),
            reject = capability.reject;
        var abrupt = perform(function () {
          forOf(iterable, false, function (promise) {
            C.resolve(promise).then(capability.resolve, reject);
          });
        });
        if (abrupt) reject(abrupt.error);
        return capability.promise;
      }
    });
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:core-js@1.2.7/library/fn/promise.js', ['npm:core-js@1.2.7/library/modules/es6.object.to-string.js', 'npm:core-js@1.2.7/library/modules/es6.string.iterator.js', 'npm:core-js@1.2.7/library/modules/web.dom.iterable.js', 'npm:core-js@1.2.7/library/modules/es6.promise.js', 'npm:core-js@1.2.7/library/modules/$.core.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  $__require('npm:core-js@1.2.7/library/modules/es6.object.to-string.js');
  $__require('npm:core-js@1.2.7/library/modules/es6.string.iterator.js');
  $__require('npm:core-js@1.2.7/library/modules/web.dom.iterable.js');
  $__require('npm:core-js@1.2.7/library/modules/es6.promise.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.core.js').Promise;
});
System.registerDynamic("npm:babel-runtime@5.8.38/core-js/promise.js", ["npm:core-js@1.2.7/library/fn/promise.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("npm:core-js@1.2.7/library/fn/promise.js"), __esModule: true };
});
System.register("github:DEGJS/fetchUtils@2.1.3/fetchUtils.js", ["npm:babel-runtime@5.8.38/core-js/promise.js", "npm:babel-runtime@5.8.38/core-js/object/assign.js"], function (_export) {
    var _Promise, _Object$assign, fetchUtils, instance;

    return {
        setters: [function (_npmBabelRuntime5838CoreJsPromiseJs) {
            _Promise = _npmBabelRuntime5838CoreJsPromiseJs["default"];
        }, function (_npmBabelRuntime5838CoreJsObjectAssignJs) {
            _Object$assign = _npmBabelRuntime5838CoreJsObjectAssignJs["default"];
        }],
        execute: function () {
            /* */
            "use strict";

            fetchUtils = function fetchUtils() {

                var defaults = {
                    timeout: 10000,
                    cachebusting: false
                };
                var settings = {};
                var callback = null;

                setOptions(settings);

                function processStatus(response) {
                    fireCallbackFn(response);
                    if (response.status === 200 || response.status === 201 || response.status === 0) {
                        return _Promise.resolve(response);
                    } else {
                        return _Promise.reject(new Error(response.statusText));
                    }
                };

                function parseJson(response) {
                    return response.json();
                };

                function parseHtml(response) {
                    return response.text();
                };

                function getWrappedPromise() {
                    var wrappedPromise = {},
                        promise = new _Promise(function (resolve, reject) {
                        wrappedPromise.resolve = resolve;
                        wrappedPromise.reject = reject;
                    });
                    wrappedPromise.then = promise.then.bind(promise);
                    wrappedPromise["catch"] = promise["catch"].bind(promise);
                    wrappedPromise.promise = promise;
                    return wrappedPromise;
                };

                function invokeFetch() {
                    var wrappedPromise = getWrappedPromise(),
                        args = Array.prototype.slice.call(arguments);
                    fetch.apply(null, args).then(function (response) {
                        wrappedPromise.resolve(response);
                    }, function (error) {
                        wrappedPromise.reject(error);
                    })["catch"](function (error) {
                        wrappedPromise["catch"](error);
                    });
                    return wrappedPromise;
                };

                function genericFetch(url) {
                    var fetchParams = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

                    var defaultHeaders = {
                        "Accept": 'application/json'
                    };

                    fetchParams.headers = _Object$assign({}, defaultHeaders, fetchParams.headers);

                    return getData(url, fetchParams, options, true);
                };

                function getJSON(url) {
                    var fetchParams = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

                    var defaultHeaders = {
                        "Accept": 'application/json'
                    };

                    fetchParams.headers = _Object$assign({}, defaultHeaders, fetchParams.headers);

                    return getData(url, fetchParams, options).then(processStatus).then(parseJson);
                };

                function getHTML(url) {
                    var fetchParams = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

                    var defaultHeaders = {
                        "Accept": 'text/html'
                    };

                    fetchParams.headers = _Object$assign({}, defaultHeaders, fetchParams.headers);

                    return getData(url, fetchParams, options).then(processStatus).then(parseHtml);
                };

                function getData(url, fetchParams) {
                    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                    var fireCallback = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

                    settings = _Object$assign({}, settings, options);
                    url = settings.cacheBusting === true ? url + '?' + new Date().getTime() : url;

                    fetchParams.method = fetchParams.method ? fetchParams.method : 'get';

                    var wrappedFetch = invokeFetch(url, fetchParams);

                    var timeoutId = setTimeout(function () {
                        wrappedFetch.reject(new Error('Load timeout for resource: ' + url));
                    }, settings.timeout);

                    return wrappedFetch.promise.then(function (response) {
                        clearTimeout(timeoutId);
                        if (fireCallback === true) {
                            fireCallbackFn(response);
                        }
                        return response;
                    });
                }

                function fireCallbackFn(response) {
                    if (callback !== null) {
                        callback(response);
                    }
                }

                function setCallback() {
                    var callbackFn = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                    if (callbackFn) {
                        callback = callbackFn;
                    }
                }

                function setOptions() {
                    var options = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                    if (options !== null && typeof options === 'object') {
                        settings = _Object$assign({}, defaults, options);
                    }
                }

                return {
                    getJSON: getJSON,
                    getHTML: getHTML,
                    fetch: genericFetch,
                    setCallback: setCallback,
                    setOptions: setOptions
                };
            };

            instance = fetchUtils();

            _export("default", instance);
        }
    };
});

System.register("github:DEGJS/fetchUtils@2.1.3.js", ["github:DEGJS/fetchUtils@2.1.3/fetchUtils.js"], function (_export) {
  "use strict";

  return {
    setters: [function (_githubDEGJSFetchUtils213FetchUtilsJs) {
      var _exportObj = {};

      for (var _key in _githubDEGJSFetchUtils213FetchUtilsJs) {
        if (_key !== "default") _exportObj[_key] = _githubDEGJSFetchUtils213FetchUtilsJs[_key];
      }

      _exportObj["default"] = _githubDEGJSFetchUtils213FetchUtilsJs["default"];

      _export(_exportObj);
    }],
    execute: function () {}
  };
});

System.registerDynamic('npm:core-js@1.2.7/library/modules/$.string-at.js', ['npm:core-js@1.2.7/library/modules/$.to-integer.js', 'npm:core-js@1.2.7/library/modules/$.defined.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var toInteger = $__require('npm:core-js@1.2.7/library/modules/$.to-integer.js'),
      defined = $__require('npm:core-js@1.2.7/library/modules/$.defined.js');
  module.exports = function (TO_STRING) {
    return function (that, pos) {
      var s = String(defined(that)),
          i = toInteger(pos),
          l = s.length,
          a,
          b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.library.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = true;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.redefine.js', ['npm:core-js@1.2.7/library/modules/$.hide.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.hide.js');
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.property-desc.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.descriptors.js', ['npm:core-js@1.2.7/library/modules/$.fails.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = !$__require('npm:core-js@1.2.7/library/modules/$.fails.js')(function () {
    return Object.defineProperty({}, 'a', { get: function () {
        return 7;
      } }).a != 7;
  });
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.hide.js', ['npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.property-desc.js', 'npm:core-js@1.2.7/library/modules/$.descriptors.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('npm:core-js@1.2.7/library/modules/$.js'),
      createDesc = $__require('npm:core-js@1.2.7/library/modules/$.property-desc.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.descriptors.js') ? function (object, key, value) {
    return $.setDesc(object, key, createDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.iter-create.js', ['npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.property-desc.js', 'npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js', 'npm:core-js@1.2.7/library/modules/$.hide.js', 'npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var $ = $__require('npm:core-js@1.2.7/library/modules/$.js'),
      descriptor = $__require('npm:core-js@1.2.7/library/modules/$.property-desc.js'),
      setToStringTag = $__require('npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js'),
      IteratorPrototype = {};
  $__require('npm:core-js@1.2.7/library/modules/$.hide.js')(IteratorPrototype, $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('iterator'), function () {
    return this;
  });
  module.exports = function (Constructor, NAME, next) {
    Constructor.prototype = $.create(IteratorPrototype, { next: descriptor(1, next) });
    setToStringTag(Constructor, NAME + ' Iterator');
  };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.has.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var hasOwnProperty = {}.hasOwnProperty;
  module.exports = function (it, key) {
    return hasOwnProperty.call(it, key);
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js', ['npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.has.js', 'npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var def = $__require('npm:core-js@1.2.7/library/modules/$.js').setDesc,
      has = $__require('npm:core-js@1.2.7/library/modules/$.has.js'),
      TAG = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('toStringTag');
  module.exports = function (it, tag, stat) {
    if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
      configurable: true,
      value: tag
    });
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.iter-define.js', ['npm:core-js@1.2.7/library/modules/$.library.js', 'npm:core-js@1.2.7/library/modules/$.export.js', 'npm:core-js@1.2.7/library/modules/$.redefine.js', 'npm:core-js@1.2.7/library/modules/$.hide.js', 'npm:core-js@1.2.7/library/modules/$.has.js', 'npm:core-js@1.2.7/library/modules/$.iterators.js', 'npm:core-js@1.2.7/library/modules/$.iter-create.js', 'npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js', 'npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var LIBRARY = $__require('npm:core-js@1.2.7/library/modules/$.library.js'),
      $export = $__require('npm:core-js@1.2.7/library/modules/$.export.js'),
      redefine = $__require('npm:core-js@1.2.7/library/modules/$.redefine.js'),
      hide = $__require('npm:core-js@1.2.7/library/modules/$.hide.js'),
      has = $__require('npm:core-js@1.2.7/library/modules/$.has.js'),
      Iterators = $__require('npm:core-js@1.2.7/library/modules/$.iterators.js'),
      $iterCreate = $__require('npm:core-js@1.2.7/library/modules/$.iter-create.js'),
      setToStringTag = $__require('npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js'),
      getProto = $__require('npm:core-js@1.2.7/library/modules/$.js').getProto,
      ITERATOR = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('iterator'),
      BUGGY = !([].keys && 'next' in [].keys()),
      FF_ITERATOR = '@@iterator',
      KEYS = 'keys',
      VALUES = 'values';
  var returnThis = function () {
    return this;
  };
  module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    $iterCreate(Constructor, NAME, next);
    var getMethod = function (kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    var TAG = NAME + ' Iterator',
        DEF_VALUES = DEFAULT == VALUES,
        VALUES_BUG = false,
        proto = Base.prototype,
        $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
        $default = $native || getMethod(DEFAULT),
        methods,
        key;
    if ($native) {
      var IteratorPrototype = getProto($default.call(new Base()));
      setToStringTag(IteratorPrototype, TAG, true);
      if (!LIBRARY && has(proto, FF_ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
      if (DEF_VALUES && $native.name !== VALUES) {
        VALUES_BUG = true;
        $default = function values() {
          return $native.call(this);
        };
      }
    }
    if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      hide(proto, ITERATOR, $default);
    }
    Iterators[NAME] = $default;
    Iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: !DEF_VALUES ? $default : getMethod('entries')
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) redefine(proto, key, methods[key]);
      } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/es6.string.iterator.js', ['npm:core-js@1.2.7/library/modules/$.string-at.js', 'npm:core-js@1.2.7/library/modules/$.iter-define.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var $at = $__require('npm:core-js@1.2.7/library/modules/$.string-at.js')(true);
  $__require('npm:core-js@1.2.7/library/modules/$.iter-define.js')(String, 'String', function (iterated) {
    this._t = String(iterated);
    this._i = 0;
  }, function () {
    var O = this._t,
        index = this._i,
        point;
    if (index >= O.length) return {
      value: undefined,
      done: true
    };
    point = $at(O, index);
    this._i += point.length;
    return {
      value: point,
      done: false
    };
  });
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.is-object.js', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.an-object.js', ['npm:core-js@1.2.7/library/modules/$.is-object.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var isObject = $__require('npm:core-js@1.2.7/library/modules/$.is-object.js');
  module.exports = function (it) {
    if (!isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.iter-call.js', ['npm:core-js@1.2.7/library/modules/$.an-object.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var anObject = $__require('npm:core-js@1.2.7/library/modules/$.an-object.js');
  module.exports = function (iterator, fn, value, entries) {
    try {
      return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) anObject(ret.call(iterator));
      throw e;
    }
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.is-array-iter.js', ['npm:core-js@1.2.7/library/modules/$.iterators.js', 'npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var Iterators = $__require('npm:core-js@1.2.7/library/modules/$.iterators.js'),
        ITERATOR = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('iterator'),
        ArrayProto = Array.prototype;
    module.exports = function (it) {
        return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
    };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.to-integer.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  // 7.1.4 ToInteger
  var ceil = Math.ceil,
      floor = Math.floor;
  module.exports = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.to-length.js', ['npm:core-js@1.2.7/library/modules/$.to-integer.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var toInteger = $__require('npm:core-js@1.2.7/library/modules/$.to-integer.js'),
      min = Math.min;
  module.exports = function (it) {
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.classof.js', ['npm:core-js@1.2.7/library/modules/$.cof.js', 'npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var cof = $__require('npm:core-js@1.2.7/library/modules/$.cof.js'),
        TAG = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('toStringTag'),
        ARG = cof(function () {
        return arguments;
    }()) == 'Arguments';
    module.exports = function (it) {
        var O, T, B;
        return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : ARG ? cof(O) : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
    };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.iterators.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = {};
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/core.get-iterator-method.js', ['npm:core-js@1.2.7/library/modules/$.classof.js', 'npm:core-js@1.2.7/library/modules/$.wks.js', 'npm:core-js@1.2.7/library/modules/$.iterators.js', 'npm:core-js@1.2.7/library/modules/$.core.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var classof = $__require('npm:core-js@1.2.7/library/modules/$.classof.js'),
        ITERATOR = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('iterator'),
        Iterators = $__require('npm:core-js@1.2.7/library/modules/$.iterators.js');
    module.exports = $__require('npm:core-js@1.2.7/library/modules/$.core.js').getIteratorMethod = function (it) {
        if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
    };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.shared.js', ['npm:core-js@1.2.7/library/modules/$.global.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var global = $__require('npm:core-js@1.2.7/library/modules/$.global.js'),
        SHARED = '__core-js_shared__',
        store = global[SHARED] || (global[SHARED] = {});
    module.exports = function (key) {
        return store[key] || (store[key] = {});
    };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.uid.js', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var id = 0,
      px = Math.random();
  module.exports = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.wks.js', ['npm:core-js@1.2.7/library/modules/$.shared.js', 'npm:core-js@1.2.7/library/modules/$.uid.js', 'npm:core-js@1.2.7/library/modules/$.global.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var store = $__require('npm:core-js@1.2.7/library/modules/$.shared.js')('wks'),
        uid = $__require('npm:core-js@1.2.7/library/modules/$.uid.js'),
        Symbol = $__require('npm:core-js@1.2.7/library/modules/$.global.js').Symbol;
    module.exports = function (name) {
        return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
    };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.iter-detect.js', ['npm:core-js@1.2.7/library/modules/$.wks.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var ITERATOR = $__require('npm:core-js@1.2.7/library/modules/$.wks.js')('iterator'),
      SAFE_CLOSING = false;
  try {
    var riter = [7][ITERATOR]();
    riter['return'] = function () {
      SAFE_CLOSING = true;
    };
    Array.from(riter, function () {
      throw 2;
    });
  } catch (e) {}
  module.exports = function (exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    var safe = false;
    try {
      var arr = [7],
          iter = arr[ITERATOR]();
      iter.next = function () {
        return { done: safe = true };
      };
      arr[ITERATOR] = function () {
        return iter;
      };
      exec(arr);
    } catch (e) {}
    return safe;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/es6.array.from.js', ['npm:core-js@1.2.7/library/modules/$.ctx.js', 'npm:core-js@1.2.7/library/modules/$.export.js', 'npm:core-js@1.2.7/library/modules/$.to-object.js', 'npm:core-js@1.2.7/library/modules/$.iter-call.js', 'npm:core-js@1.2.7/library/modules/$.is-array-iter.js', 'npm:core-js@1.2.7/library/modules/$.to-length.js', 'npm:core-js@1.2.7/library/modules/core.get-iterator-method.js', 'npm:core-js@1.2.7/library/modules/$.iter-detect.js'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var ctx = $__require('npm:core-js@1.2.7/library/modules/$.ctx.js'),
      $export = $__require('npm:core-js@1.2.7/library/modules/$.export.js'),
      toObject = $__require('npm:core-js@1.2.7/library/modules/$.to-object.js'),
      call = $__require('npm:core-js@1.2.7/library/modules/$.iter-call.js'),
      isArrayIter = $__require('npm:core-js@1.2.7/library/modules/$.is-array-iter.js'),
      toLength = $__require('npm:core-js@1.2.7/library/modules/$.to-length.js'),
      getIterFn = $__require('npm:core-js@1.2.7/library/modules/core.get-iterator-method.js');
  $export($export.S + $export.F * !$__require('npm:core-js@1.2.7/library/modules/$.iter-detect.js')(function (iter) {
    Array.from(iter);
  }), 'Array', { from: function from(arrayLike) {
      var O = toObject(arrayLike),
          C = typeof this == 'function' ? this : Array,
          $$ = arguments,
          $$len = $$.length,
          mapfn = $$len > 1 ? $$[1] : undefined,
          mapping = mapfn !== undefined,
          index = 0,
          iterFn = getIterFn(O),
          length,
          result,
          step,
          iterator;
      if (mapping) mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
      if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
          result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
        }
      } else {
        length = toLength(O.length);
        for (result = new C(length); length > index; index++) {
          result[index] = mapping ? mapfn(O[index], index) : O[index];
        }
      }
      result.length = index;
      return result;
    } });
});
System.registerDynamic('npm:core-js@1.2.7/library/fn/array/from.js', ['npm:core-js@1.2.7/library/modules/es6.string.iterator.js', 'npm:core-js@1.2.7/library/modules/es6.array.from.js', 'npm:core-js@1.2.7/library/modules/$.core.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  $__require('npm:core-js@1.2.7/library/modules/es6.string.iterator.js');
  $__require('npm:core-js@1.2.7/library/modules/es6.array.from.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.core.js').Array.from;
});
System.registerDynamic("npm:babel-runtime@5.8.38/core-js/array/from.js", ["npm:core-js@1.2.7/library/fn/array/from.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("npm:core-js@1.2.7/library/fn/array/from.js"), __esModule: true };
});
System.registerDynamic('npm:core-js@1.2.7/library/fn/object/define-property.js', ['npm:core-js@1.2.7/library/modules/$.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('npm:core-js@1.2.7/library/modules/$.js');
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
});
System.registerDynamic("npm:babel-runtime@5.8.38/core-js/object/define-property.js", ["npm:core-js@1.2.7/library/fn/object/define-property.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("npm:core-js@1.2.7/library/fn/object/define-property.js"), __esModule: true };
});
System.registerDynamic("npm:babel-runtime@5.8.38/helpers/define-property.js", ["npm:babel-runtime@5.8.38/core-js/object/define-property.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var _Object$defineProperty = $__require("npm:babel-runtime@5.8.38/core-js/object/define-property.js")["default"];
  exports["default"] = function (obj, key, value) {
    if (key in obj) {
      _Object$defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  };
  exports.__esModule = true;
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.cof.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var toString = {}.toString;

  module.exports = function (it) {
    return toString.call(it).slice(8, -1);
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.iobject.js', ['npm:core-js@1.2.7/library/modules/$.cof.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var cof = $__require('npm:core-js@1.2.7/library/modules/$.cof.js');
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.object-assign.js', ['npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.to-object.js', 'npm:core-js@1.2.7/library/modules/$.iobject.js', 'npm:core-js@1.2.7/library/modules/$.fails.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('npm:core-js@1.2.7/library/modules/$.js'),
      toObject = $__require('npm:core-js@1.2.7/library/modules/$.to-object.js'),
      IObject = $__require('npm:core-js@1.2.7/library/modules/$.iobject.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.fails.js')(function () {
    var a = Object.assign,
        A = {},
        B = {},
        S = Symbol(),
        K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) {
      B[k] = k;
    });
    return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
  }) ? function assign(target, source) {
    var T = toObject(target),
        $$ = arguments,
        $$len = $$.length,
        index = 1,
        getKeys = $.getKeys,
        getSymbols = $.getSymbols,
        isEnum = $.isEnum;
    while ($$len > index) {
      var S = IObject($$[index++]),
          keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
          length = keys.length,
          j = 0,
          key;
      while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
    return T;
  } : Object.assign;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/es6.object.assign.js', ['npm:core-js@1.2.7/library/modules/$.export.js', 'npm:core-js@1.2.7/library/modules/$.object-assign.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var $export = $__require('npm:core-js@1.2.7/library/modules/$.export.js');
  $export($export.S + $export.F, 'Object', { assign: $__require('npm:core-js@1.2.7/library/modules/$.object-assign.js') });
});
System.registerDynamic('npm:core-js@1.2.7/library/fn/object/assign.js', ['npm:core-js@1.2.7/library/modules/es6.object.assign.js', 'npm:core-js@1.2.7/library/modules/$.core.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  $__require('npm:core-js@1.2.7/library/modules/es6.object.assign.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.core.js').Object.assign;
});
System.registerDynamic("npm:babel-runtime@5.8.38/core-js/object/assign.js", ["npm:core-js@1.2.7/library/fn/object/assign.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("npm:core-js@1.2.7/library/fn/object/assign.js"), __esModule: true };
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.defined.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  // 7.2.1 RequireObjectCoercible(argument)
  module.exports = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.to-object.js', ['npm:core-js@1.2.7/library/modules/$.defined.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var defined = $__require('npm:core-js@1.2.7/library/modules/$.defined.js');
  module.exports = function (it) {
    return Object(defined(it));
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.global.js', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.a-function.js', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.ctx.js', ['npm:core-js@1.2.7/library/modules/$.a-function.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var aFunction = $__require('npm:core-js@1.2.7/library/modules/$.a-function.js');
  module.exports = function (fn, that, length) {
    aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:
        return function (a) {
          return fn.call(that, a);
        };
      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function () {
      return fn.apply(that, arguments);
    };
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.export.js', ['npm:core-js@1.2.7/library/modules/$.global.js', 'npm:core-js@1.2.7/library/modules/$.core.js', 'npm:core-js@1.2.7/library/modules/$.ctx.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var global = $__require('npm:core-js@1.2.7/library/modules/$.global.js'),
      core = $__require('npm:core-js@1.2.7/library/modules/$.core.js'),
      ctx = $__require('npm:core-js@1.2.7/library/modules/$.ctx.js'),
      PROTOTYPE = 'prototype';
  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F,
        IS_GLOBAL = type & $export.G,
        IS_STATIC = type & $export.S,
        IS_PROTO = type & $export.P,
        IS_BIND = type & $export.B,
        IS_WRAP = type & $export.W,
        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
        target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
        key,
        own,
        out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      own = !IS_FORCED && target && key in target;
      if (own && key in exports) continue;
      out = own ? target[key] : source[key];
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function (C) {
        var F = function (param) {
          return this instanceof C ? new C(param) : C(param);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
      if (IS_PROTO) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
    }
  };
  $export.F = 1;
  $export.G = 2;
  $export.S = 4;
  $export.P = 8;
  $export.B = 16;
  $export.W = 32;
  module.exports = $export;
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.fails.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.object-sap.js', ['npm:core-js@1.2.7/library/modules/$.export.js', 'npm:core-js@1.2.7/library/modules/$.core.js', 'npm:core-js@1.2.7/library/modules/$.fails.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    /* */
    var $export = $__require('npm:core-js@1.2.7/library/modules/$.export.js'),
        core = $__require('npm:core-js@1.2.7/library/modules/$.core.js'),
        fails = $__require('npm:core-js@1.2.7/library/modules/$.fails.js');
    module.exports = function (KEY, exec) {
        var fn = (core.Object || {})[KEY] || Object[KEY],
            exp = {};
        exp[KEY] = exec(fn);
        $export($export.S + $export.F * fails(function () {
            fn(1);
        }), 'Object', exp);
    };
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/es6.object.keys.js', ['npm:core-js@1.2.7/library/modules/$.to-object.js', 'npm:core-js@1.2.7/library/modules/$.object-sap.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var toObject = $__require('npm:core-js@1.2.7/library/modules/$.to-object.js');
  $__require('npm:core-js@1.2.7/library/modules/$.object-sap.js')('keys', function ($keys) {
    return function keys(it) {
      return $keys(toObject(it));
    };
  });
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.core.js', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var core = module.exports = { version: '1.2.6' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
System.registerDynamic('npm:core-js@1.2.7/library/fn/object/keys.js', ['npm:core-js@1.2.7/library/modules/es6.object.keys.js', 'npm:core-js@1.2.7/library/modules/$.core.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  $__require('npm:core-js@1.2.7/library/modules/es6.object.keys.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.core.js').Object.keys;
});
System.registerDynamic("npm:babel-runtime@5.8.38/core-js/object/keys.js", ["npm:core-js@1.2.7/library/fn/object/keys.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("npm:core-js@1.2.7/library/fn/object/keys.js"), __esModule: true };
});
System.register("github:DEGJS/objectUtils@2.1.0/objectUtils.js", ["npm:babel-runtime@5.8.38/helpers/define-property.js", "npm:babel-runtime@5.8.38/core-js/object/assign.js", "npm:babel-runtime@5.8.38/core-js/object/keys.js"], function (_export) {
  var _defineProperty, _Object$assign3, _Object$keys;

  function ensureArray(obj) {
    if (Array.isArray(obj) === false) {
      return [obj];
    }
    return obj;
  }

  function assignDeep(target, source) {
    var output = _Object$assign3({}, target);
    if (isObject(target) && isObject(source)) {
      _Object$keys(source).forEach(function (key) {
        if (isObject(source[key])) {
          if (!(key in target)) _Object$assign3(output, _defineProperty({}, key, source[key]));else output[key] = mergeDeep(target[key], source[key]);
        } else {
          _Object$assign3(output, _defineProperty({}, key, source[key]));
        }
      });
    }
    return output;
  }

  return {
    setters: [function (_npmBabelRuntime5838HelpersDefinePropertyJs) {
      _defineProperty = _npmBabelRuntime5838HelpersDefinePropertyJs["default"];
    }, function (_npmBabelRuntime5838CoreJsObjectAssignJs) {
      _Object$assign3 = _npmBabelRuntime5838CoreJsObjectAssignJs["default"];
    }, function (_npmBabelRuntime5838CoreJsObjectKeysJs) {
      _Object$keys = _npmBabelRuntime5838CoreJsObjectKeysJs["default"];
    }],
    execute: function () {
      /* */"use strict";

      _export("ensureArray", ensureArray);

      _export("assignDeep", assignDeep);
    }
  };
});

System.register("github:DEGJS/objectUtils@2.1.0.js", ["github:DEGJS/objectUtils@2.1.0/objectUtils.js"], function (_export) {
  "use strict";

  return {
    setters: [function (_githubDEGJSObjectUtils210ObjectUtilsJs) {
      var _exportObj = {};

      for (var _key in _githubDEGJSObjectUtils210ObjectUtilsJs) {
        if (_key !== "default") _exportObj[_key] = _githubDEGJSObjectUtils210ObjectUtilsJs[_key];
      }

      _exportObj["default"] = _githubDEGJSObjectUtils210ObjectUtilsJs["default"];

      _export(_exportObj);
    }],
    execute: function () {}
  };
});

System.register('github:DEGJS/moduleLoader@3.0.1/moduleLoader.js', ['npm:babel-runtime@5.8.38/core-js/object/assign.js', 'npm:babel-runtime@5.8.38/core-js/array/from.js', 'github:DEGJS/objectUtils@2.1.0.js'], function (_export) {
    var _Object$assign, _Array$from, ensureArray, moduleLoader;

    return {
        setters: [function (_npmBabelRuntime5838CoreJsObjectAssignJs) {
            _Object$assign = _npmBabelRuntime5838CoreJsObjectAssignJs['default'];
        }, function (_npmBabelRuntime5838CoreJsArrayFromJs) {
            _Array$from = _npmBabelRuntime5838CoreJsArrayFromJs['default'];
        }, function (_githubDEGJSObjectUtils210Js) {
            ensureArray = _githubDEGJSObjectUtils210Js.ensureArray;
        }],
        execute: function () {
            /* */
            'use strict';

            moduleLoader = function moduleLoader(options) {

                var defaults = {
                    loadImmediately: true,
                    moduleDataAttr: 'data-module'
                };
                var settings = undefined;

                function init() {
                    settings = _Object$assign({}, defaults, options);

                    if (settings.loadImmediately) {
                        var elsWithModules = _Array$from(document.querySelectorAll('[' + settings.moduleDataAttr + ']'));
                        loadModules(elsWithModules);
                    }
                }

                function loadModules(els) {
                    els = ensureArray(els);

                    els.forEach(function (el) {
                        var module = el.getAttribute(settings.moduleDataAttr);
                        var props = {
                            'containerElement': el
                        };
                        System['import'](module).then(function (mod) {
                            return mod['default'](props);
                        });
                    });
                }

                init();

                return {
                    load: loadModules
                };
            };

            _export('default', moduleLoader);
        }
    };
});

System.register("github:DEGJS/moduleLoader@3.0.1.js", ["github:DEGJS/moduleLoader@3.0.1/moduleLoader.js"], function (_export) {
  "use strict";

  return {
    setters: [function (_githubDEGJSModuleLoader301ModuleLoaderJs) {
      var _exportObj = {};

      for (var _key in _githubDEGJSModuleLoader301ModuleLoaderJs) {
        if (_key !== "default") _exportObj[_key] = _githubDEGJSModuleLoader301ModuleLoaderJs[_key];
      }

      _exportObj["default"] = _githubDEGJSModuleLoader301ModuleLoaderJs["default"];

      _export(_exportObj);
    }],
    execute: function () {}
  };
});

System.register('spaces.js', [], function (_export) {
    'use strict';

    var spaces;
    return {
        setters: [],
        execute: function () {
            spaces = [{
                id: 0,
                name: 'Kitchen (Floor 2)',
                adjacentSpaces: {
                    1: true
                },
                floor: 2
            }, {
                id: 1,
                name: 'Dining Room (Floor 2)',
                adjacentSpaces: [0, 2, 3, 5],
                floor: 2
            }, {
                id: 2,
                name: 'Living Room (Floor 2)',
                adjacentSpaces: [1, 3, 4, 5],
                floor: 2
            }, {
                id: 3,
                name: 'Front Door (Floor 2)',
                adjacentSpaces: [1, 2, 11],
                floor: 2
            }, {
                id: 4,
                name: 'Patio (Floor 2)',
                adjacentSpaces: [2, 8],
                floor: 2
            }, {
                id: 5,
                name: 'Hallway (Floor 2)',
                adjacentSpaces: [1, 2, 6, 7, 8],
                floor: 2
            }, {
                id: 6,
                name: 'Bedroom 1 (Floor 2)',
                adjacentSpaces: [5],
                floor: 2
            }, {
                id: 7,
                name: 'Bathroom 1 (Floor 2)',
                adjacentSpaces: [5],
                floor: 2
            }, {
                id: 8,
                name: 'Bedroom 2 (Floor 2)',
                adjacentSpaces: [5, 9, 4],
                floor: 2
            }, {
                id: 9,
                name: 'Bedroom 2 Hallway (Floor 2)',
                adjacentSpaces: [8, 10],
                floor: 2
            }, {
                id: 10,
                name: 'Bathroom 2 (Floor 2)',
                adjacentSpaces: [9],
                floor: 2
            }, {
                id: 11,
                name: 'Apartment Hallway (Floor 2)',
                adjacentSpaces: [3, 12, 13],
                floor: 2
            }, {
                id: 12,
                name: 'Stairs',
                adjacentSpaces: [11, 25],
                floor: 0
            }, {
                id: 13,
                name: 'Elevator',
                adjacentSpaces: [11, 25],
                floor: 0
            }, {
                id: 14,
                name: 'Kitchen (Floor 1)',
                adjacentSpaces: [15],
                floor: 1
            }, {
                id: 15,
                name: 'Dining Room (Floor 1)',
                adjacentSpaces: [14, 16, 17, 19],
                floor: 1
            }, {
                id: 16,
                name: 'Living Room (Floor 1)',
                adjacentSpaces: [15, 17, 18, 19],
                floor: 1
            }, {
                id: 17,
                name: 'Front Door (Floor 1)',
                adjacentSpaces: [15, 16, 25],
                floor: 1
            }, {
                id: 18,
                name: 'Patio (Floor 1)',
                adjacentSpaces: [16, 22],
                floor: 1
            }, {
                id: 19,
                name: 'Hallway (Floor 1)',
                adjacentSpaces: [15, 16, 20, 21, 22],
                floor: 1
            }, {
                id: 20,
                name: 'Bedroom 1 (Floor 1)',
                adjacentSpaces: [19],
                floor: 1
            }, {
                id: 21,
                name: 'Bathroom 1 (Floor 1)',
                adjacentSpaces: [19],
                floor: 1
            }, {
                id: 22,
                name: 'Bedroom 2 (Floor 1)',
                adjacentSpaces: [19, 23, 18],
                floor: 1
            }, {
                id: 23,
                name: 'Bedroom 2 Hallway (Floor 1)',
                adjacentSpaces: [22, 24],
                floor: 1
            }, {
                id: 24,
                name: 'Bathroom 2 (Floor 1)',
                adjacentSpaces: [23],
                floor: 1
            }, {
                id: 25,
                name: 'Apartment Hallway (Floor 1)',
                adjacentSpaces: [17, 12, 13],
                floor: 1
            }];

            _export('default', spaces);
        }
    };
});

System.register('main.js', ['components/compass.js', 'components/routing/routing.js', 'github:DEGJS/fetchUtils@2.1.3.js', 'github:DEGJS/moduleLoader@3.0.1.js', 'spaces.js'], function (_export) {
    'use strict';

    var compass, routing, fetchUtils, moduleLoader, spaces, el, compassEl, spacesEndpoint, routingInst;

    function init() {
        moduleLoader();
        // initCompass();
        initRouting();
    }

    function initCompass() {
        compass();
    }

    function initRouting() {
        fetchUtils.fetch(spacesEndpoint).then(function (response) {
            return response.json();
        }).then(function (responseSpaces) {
            // console.log(spaces);
            // console.log(responseSpaces);
            // routing(spaces);
            routing(responseSpaces);
        });
    }

    return {
        setters: [function (_componentsCompassJs) {
            compass = _componentsCompassJs['default'];
        }, function (_componentsRoutingRoutingJs) {
            routing = _componentsRoutingRoutingJs['default'];
        }, function (_githubDEGJSFetchUtils213Js) {
            fetchUtils = _githubDEGJSFetchUtils213Js['default'];
        }, function (_githubDEGJSModuleLoader301Js) {
            moduleLoader = _githubDEGJSModuleLoader301Js['default'];
        }, function (_spacesJs) {
            spaces = _spacesJs['default'];
        }],
        execute: function () {
            el = document.querySelector('.js-app');
            compassEl = el.querySelector('.js-compass');
            spacesEndpoint = 'https://us-central1-hqmapdata.cloudfunctions.net/api';
            routingInst = undefined;
            init();
        }
    };
});
