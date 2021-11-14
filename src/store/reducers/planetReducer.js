const INITIAL_STATE = {
    planets: []
}

export function planetReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_PLANETS':
            return {
                ...state,
                planets: action.planets
            }
        case 'ADD_PLANET':
            return {
                ...state,
                planets: [...state.planets, action.planet]
            }
        case 'UPDATE_PLANET':
            const { updatedPlanet } = action;
            return {
                ...state,
                planets: state.planets.map(planet => planet._id === updatedPlanet._id ? updatedPlanet : planet)
            }
        case 'DELETE_PLANET':
            return {
                ...state,
                planets: state.planets.filter(planet => planet._id !== action.planetId)
            }
        default:
            return state
    }
}