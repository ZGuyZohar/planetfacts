import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { PlanetList } from '../../cmps/PlanetList/PlanetList';
import { loadPlanets } from '../../store/actions/planetAction';
import './PlanetPage.scss'

export function PlanetPage() {

    const planets = useSelector(state => state.planetReducer.planets)
    const dispatch = useDispatch()
    const [originPlanets, setOriginPlanets] = useState(null)
    const [unOriginPlanets, setUnOriginPlanets] = useState(null)
    

    useEffect(() => {
        dispatch(loadPlanets()).then(planets => {
            setOriginPlanets(planets.filter(({ isOriginal }) => isOriginal))
            setUnOriginPlanets(planets.filter(({ isOriginal }) => !isOriginal))
        })
    }, [])

    return (
        <section className="planet-page">
            <h2>all the planets in the milky way</h2>
            <PlanetList planets={originPlanets} isOrigin={true}/>
            {unOriginPlanets && <PlanetList planets={unOriginPlanets} isOrigin={false}/>}
        </section>
    )
}
