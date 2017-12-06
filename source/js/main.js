const el = document.querySelector('.js-app');

function compassHeading(alpha, beta, gamma) {
    const alphaRad = alpha * (Math.PI / 180);
    const betaRad = beta * (Math.PI / 180);
    const gammaRad = gamma * (Math.PI / 180);
    const cA = Math.cos(alphaRad);
    const sA = Math.sin(alphaRad);
    const sB = Math.sin(betaRad);
    const cG = Math.cos(gammaRad);
    const sG = Math.sin(gammaRad);
    const rA = -cA * sG - sA * sB * cG;
    const rB = -sA * sG + cA * sB * cG;
    let compassHeading = Math.atan(rA / rB);

    if (rB < 0) {
        compassHeading += Math.PI;
    } else if (rA < 0) {
        compassHeading += 2 * Math.PI;
    }
    compassHeading *= 180 / Math.PI;

    return compassHeading;
}

function getCardinal(angle) {
    const directions = 8;
    const degree = 360 / directions;
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
    return 'North';
}

window.addEventListener('deviceorientation', function(e) {

    let heading = null;
    if (e.absolute === true && e.alpha !== null) {
        heading = compassHeading(e.alpha, e.beta, e.gamma);
    }
    el.innerHTML = getCardinal(heading);

}, false);