const geolocation = () => {

	let watchID;
	const el = document.querySelector('.js-geolocation');

	if ('geolocation' in navigator) {
		const options = {
			enableHighAccuracy: true,
			maximumAge: 0,
			timeout: 27000
		};
		watchID = navigator.geolocation.watchPosition(success, error, options);
	}

	function success(position) {
		el.innerHTML = `
			<li>Watch ID: ${watchID}</li>
			<li>Latitude: ${position.coords.latitude}</li>
			<li>Longitude: ${position.coords.longitude}</li>
			<li>Altitude: ${position.coords.altitude}</li>
		`;
	}

	function error(error) {
		console.error(error.message);
	}

};

export default geolocation;