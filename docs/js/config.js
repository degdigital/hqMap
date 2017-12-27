System.config({baseURL: "js",defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "main-bundle.js": [
      "main.js",
      "spaces.js",
      "github:DEGJS/moduleLoader@3.0.1.js",
      "github:DEGJS/moduleLoader@3.0.1/moduleLoader.js",
      "github:DEGJS/objectUtils@2.1.0.js",
      "github:DEGJS/objectUtils@2.1.0/objectUtils.js",
      "npm:babel-runtime@5.8.38/core-js/object/keys.js",
      "npm:core-js@1.2.7/library/fn/object/keys.js",
      "npm:core-js@1.2.7/library/modules/$.core.js",
      "npm:core-js@1.2.7/library/modules/es6.object.keys.js",
      "npm:core-js@1.2.7/library/modules/$.object-sap.js",
      "npm:core-js@1.2.7/library/modules/$.fails.js",
      "npm:core-js@1.2.7/library/modules/$.export.js",
      "npm:core-js@1.2.7/library/modules/$.ctx.js",
      "npm:core-js@1.2.7/library/modules/$.a-function.js",
      "npm:core-js@1.2.7/library/modules/$.global.js",
      "npm:core-js@1.2.7/library/modules/$.to-object.js",
      "npm:core-js@1.2.7/library/modules/$.defined.js",
      "npm:babel-runtime@5.8.38/core-js/object/assign.js",
      "npm:core-js@1.2.7/library/fn/object/assign.js",
      "npm:core-js@1.2.7/library/modules/es6.object.assign.js",
      "npm:core-js@1.2.7/library/modules/$.object-assign.js",
      "npm:core-js@1.2.7/library/modules/$.iobject.js",
      "npm:core-js@1.2.7/library/modules/$.cof.js",
      "npm:core-js@1.2.7/library/modules/$.js",
      "npm:babel-runtime@5.8.38/helpers/define-property.js",
      "npm:babel-runtime@5.8.38/core-js/object/define-property.js",
      "npm:core-js@1.2.7/library/fn/object/define-property.js",
      "npm:babel-runtime@5.8.38/core-js/array/from.js",
      "npm:core-js@1.2.7/library/fn/array/from.js",
      "npm:core-js@1.2.7/library/modules/es6.array.from.js",
      "npm:core-js@1.2.7/library/modules/$.iter-detect.js",
      "npm:core-js@1.2.7/library/modules/$.wks.js",
      "npm:core-js@1.2.7/library/modules/$.uid.js",
      "npm:core-js@1.2.7/library/modules/$.shared.js",
      "npm:core-js@1.2.7/library/modules/core.get-iterator-method.js",
      "npm:core-js@1.2.7/library/modules/$.iterators.js",
      "npm:core-js@1.2.7/library/modules/$.classof.js",
      "npm:core-js@1.2.7/library/modules/$.to-length.js",
      "npm:core-js@1.2.7/library/modules/$.to-integer.js",
      "npm:core-js@1.2.7/library/modules/$.is-array-iter.js",
      "npm:core-js@1.2.7/library/modules/$.iter-call.js",
      "npm:core-js@1.2.7/library/modules/$.an-object.js",
      "npm:core-js@1.2.7/library/modules/$.is-object.js",
      "npm:core-js@1.2.7/library/modules/es6.string.iterator.js",
      "npm:core-js@1.2.7/library/modules/$.iter-define.js",
      "npm:core-js@1.2.7/library/modules/$.set-to-string-tag.js",
      "npm:core-js@1.2.7/library/modules/$.has.js",
      "npm:core-js@1.2.7/library/modules/$.iter-create.js",
      "npm:core-js@1.2.7/library/modules/$.hide.js",
      "npm:core-js@1.2.7/library/modules/$.descriptors.js",
      "npm:core-js@1.2.7/library/modules/$.property-desc.js",
      "npm:core-js@1.2.7/library/modules/$.redefine.js",
      "npm:core-js@1.2.7/library/modules/$.library.js",
      "npm:core-js@1.2.7/library/modules/$.string-at.js",
      "github:DEGJS/fetchUtils@2.1.3.js",
      "github:DEGJS/fetchUtils@2.1.3/fetchUtils.js",
      "npm:babel-runtime@5.8.38/core-js/promise.js",
      "npm:core-js@1.2.7/library/fn/promise.js",
      "npm:core-js@1.2.7/library/modules/es6.promise.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "npm:process@0.11.10.js",
      "npm:process@0.11.10/browser.js",
      "npm:core-js@1.2.7/library/modules/$.set-species.js",
      "npm:core-js@1.2.7/library/modules/$.redefine-all.js",
      "npm:core-js@1.2.7/library/modules/$.microtask.js",
      "npm:core-js@1.2.7/library/modules/$.task.js",
      "npm:core-js@1.2.7/library/modules/$.dom-create.js",
      "npm:core-js@1.2.7/library/modules/$.html.js",
      "npm:core-js@1.2.7/library/modules/$.invoke.js",
      "npm:core-js@1.2.7/library/modules/$.species-constructor.js",
      "npm:core-js@1.2.7/library/modules/$.same-value.js",
      "npm:core-js@1.2.7/library/modules/$.set-proto.js",
      "npm:core-js@1.2.7/library/modules/$.for-of.js",
      "npm:core-js@1.2.7/library/modules/$.strict-new.js",
      "npm:core-js@1.2.7/library/modules/web.dom.iterable.js",
      "npm:core-js@1.2.7/library/modules/es6.array.iterator.js",
      "npm:core-js@1.2.7/library/modules/$.to-iobject.js",
      "npm:core-js@1.2.7/library/modules/$.iter-step.js",
      "npm:core-js@1.2.7/library/modules/$.add-to-unscopables.js",
      "npm:core-js@1.2.7/library/modules/es6.object.to-string.js",
      "components/routing/routing.js",
      "components/routing/rendering.js",
      "github:DEGJS/domUtils@2.1.1.js",
      "github:DEGJS/domUtils@2.1.1/domUtils.js",
      "components/routing/graph.js",
      "npm:babel-runtime@5.8.38/helpers/extends.js",
      "components/compass.js"
    ],
    "components/geolocation-bundle.js": [
      "components/geolocation.js"
    ]
  },

  map: {
    "DEGJS/domUtils": "github:DEGJS/domUtils@2.1.1",
    "DEGJS/fetchUtils": "github:DEGJS/fetchUtils@2.1.3",
    "DEGJS/moduleLoader": "github:DEGJS/moduleLoader@3.0.1",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "core-js": "npm:core-js@1.2.7",
    "github:DEGJS/domUtils@2.1.1": {
      "DEGJS/objectUtils": "github:DEGJS/objectUtils@2.1.0"
    },
    "github:DEGJS/moduleLoader@3.0.1": {
      "DEGJS/objectUtils": "github:DEGJS/objectUtils@2.1.0"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.1": {
      "buffer": "npm:buffer@5.0.8"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.10"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@5.0.8": {
      "base64-js": "npm:base64-js@1.2.1",
      "ieee754": "npm:ieee754@1.1.8"
    },
    "npm:core-js@1.2.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.10": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  }
});

var polyfillTests = {
};
var bundleHelper = function() {

	var bundles = [{filename: 'main-bundle.js',tests:[]},{filename: 'components/geolocation-bundle.js',tests:[]}],
		map = {},
		baseURL = "<%= jsUrl %>";

	function init() {
		if(typeof System != 'undefined' && System.config) {
			baseURL = System.baseURL;
			mapPolyfilledBundles();
		}
	}

	function mapPolyfilledBundles() {
		for(var i = 0; i < bundles.length; i++) {
			mapPolyfilledBundle(bundles[i]);	
		}
		System.config({ map: map });
	}

	function mapPolyfilledBundle(bundle) {
		var polyfilledBundleFilename = buildPolyfilledBundleFilename(bundle);
		map[bundle.filename] = polyfilledBundleFilename;
	}

	function getBundle(filename) {
		for(var i = 0; i < bundles.length; i++) {
			if(bundles[i].filename === filename) {
				return bundles[i];
			}
		} 
		return null;
	}

	function buildPolyfilledBundleFilename(bundle) {
		var filename = bundle.filename.replace(/\.js$/, '');			

		for(var i = 0; i < bundle.tests.length; i++) {
			var testName = bundle.tests[i];
			var testDef = polyfillTests[testName];
			if(testDef())
				continue;
			
			filename += '-' + testName;
		}

		return filename + '.js'
	}

	function injectScriptReference(src){
	    var js, 
	    	fjs = document.getElementsByTagName('script')[0],
	    	id = src.replace('/', '').replace(/[^\w\s]/gi, '');
	    if (document.getElementById(id)){ return; }
	    js = document.createElement('script'); js.id = id;
	    js.onload = function(){
	        // remote script has loaded
	    };
	    js.src = src;
	    fjs.parentNode.insertBefore(js, fjs);
	}

	function loadBundle(filename) {
		if(filename.lastIndexOf('.js', filename.length - 3) === -1) {
			filename += '.js';
		}
		var bundle = getBundle(filename);
		if(bundle) {
			var polyfilledFilename = buildPolyfilledBundleFilename(bundle);
			var src = baseURL + '/' + polyfilledFilename;
			injectScriptReference(src);
		}
	}

	function setBaseURL(newBaseURL) {
		baseURL = newBaseURL;
	}

	init();

	return {
		loadBundle: loadBundle,
		setBaseURL: setBaseURL
	}
}();
