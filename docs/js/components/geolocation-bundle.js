System.register('components/geolocation.js', [], function (_export) {
	'use strict';

	var geolocation;
	return {
		setters: [],
		execute: function () {
			geolocation = function geolocation() {

				var watchID = undefined;
				var el = document.querySelector('.js-geolocation');

				if ('geolocation' in navigator) {
					var options = {
						enableHighAccuracy: true,
						maximumAge: 0,
						timeout: 27000
					};
					watchID = navigator.geolocation.watchPosition(success, error, options);
				}

				function success(position) {
					el.innerHTML = '\n\t\t\t<li>Watch ID: ' + watchID + '</li>\n\t\t\t<li>Accuracy: ' + position.coords.accuracy + '</li>\n\t\t\t<li>Latitude: ' + position.coords.latitude + '</li>\n\t\t\t<li>Longitude: ' + position.coords.longitude + '</li>\n\t\t\t<li>Altitude: ' + position.coords.altitude + '</li>\n\t\t\t<li>Altitude Accuracy: ' + position.coords.altitudeAccuracy + '</li>\n\t\t\t<li>Heading: ' + position.coords.heading + '</li>\n\t\t\t<li>Speed: ' + position.coords.speed + '</li>\n\n\t\t';
				}

				function error(error) {
					console.error(error.message);
				}
			};

			_export('default', geolocation);
		}
	};
});
