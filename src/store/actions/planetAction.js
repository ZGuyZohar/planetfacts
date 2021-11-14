import { planetService } from '../../services/planet-service'

export function loadPlanets(filterBy) {
    return async dispatch => {
        const planets = await planetService.query(filterBy)
        const action = {
            type: 'SET_PLANETS',
            planets
        }
        dispatch(action)
        return planets
    }
}

export function savePlanet(planet) {
    return async dispatch => {
        const isAdd = !planet._id
        const updatedPlanet = await planetService.save(planet);
        if (isAdd) dispatch({ type: 'ADD_PLANET', planet: updatedPlanet })
        else dispatch({ type: 'UPDATE_PLANET', updatedPlanet })
    }
}

export function removePlanet(contactId) {
    return async dispatch => {
        await planetService.removePlanet(contactId);
        dispatch({ type: 'REMOVE_PLANET', contactId })
    }
}
