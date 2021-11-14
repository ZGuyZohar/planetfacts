import { httpService } from './http-service.js'

const PLANET_URL = '/planet/'

export const planetService = {
    query,
    getById,
    remove,
    save,
    getEmptyPlanet,
    getOriginPlanets
}

function query(filterBy) {
    return httpService.get(PLANET_URL)
}

function getById(id) {
    console.log('getbyid');
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

async function getOriginPlanets(){
    let planets = JSON.parse(localStorage.getItem('originPlanets'))
    if(!planets || !planets.length) {
        planets = await httpService.get(PLANET_URL+'origin')
        localStorage.setItem('originPlanets', JSON.stringify(planets))
    }
    return planets 
}

function getEmptyPlanet() {
    return {
        name: '',
        overview: {
            content: '',
            source: ''
        },
        structure: {
            content: ''
        },
        geology: {
            source: ''
        },
        rotation: 0,
        revolution: 0,
        radius: 0,
        temperature: 0,
        imgIdx: 0,
        isOriginal: false,
        colors: {
            main: '',
            hover: ''
        }
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

