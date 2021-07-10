import { httpService } from './http-service.js'

const PLANET_URL = '/planet/'

export const planetService = {
    query,
    getById,
    remove,
    save,
    getEmptyPlanet,
}

function query() {
    return httpService.get(PLANET_URL)
}

function getById(id) {
    return httpService.get(PLANET_URL + id)
}

function remove(id) {
    return httpService.delete(PLANET_URL + id)
}

function save(planet) {
    if (planet._id) {
        return httpService.put(PLANET_URL + planet._id, planet)
    } else {
        return httpService.post(PLANET_URL, planet)
    }
}


function getEmptyPlanet() {
    return {
        name: '',
        
    }
}

// function _createPlanets() {
//     var planets = JSON.parse(localStorage.getItem(KEY))
//     if (!planets || !planets.length) {
//         planets = gPlanets
//         localStorage.setItem(KEY, JSON.stringify(planets))
//     }
//     return planets;
// }

