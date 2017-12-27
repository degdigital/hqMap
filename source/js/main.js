import compass from './components/compass.js';
import routing from './components/routing/routing.js';
import fetchUtils from 'DEGJS/fetchUtils';
import moduleLoader from 'DEGJS/moduleLoader';
import spaces from './spaces.js';

const el = document.querySelector('.js-app');
const compassEl = el.querySelector('.js-compass');
const spacesEndpoint = 'https://us-central1-hqmapdata.cloudfunctions.net/api';
let routingInst;

function init() {
    moduleLoader();
    // initCompass();
    initRouting();
}

function initCompass() {
    compass();
}

function initRouting() {
    fetchUtils.fetch(spacesEndpoint)
        .then(response => response.json())
        .then(responseSpaces => {
            // console.log(spaces);
            // console.log(responseSpaces);
            // routing(spaces);
            routing(responseSpaces);
        });
}

init();
