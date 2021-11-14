import React, { useEffect, useState } from 'react'
import { planetService } from '../../services/planet-service';
import './PlanetDetails.scss'

// FIX DETAILS FOR CREATED PLANETS

export function PlanetDetails(props) {

    const [planet, setPlanet] = useState(null);
    const [planetInfo, setPlanetInfo] = useState(null);
    const [planetStats, setPlanetStats] = useState(null);
    const [planetIdx, setPlanetIdx] = useState(0)

    const id = props.match.params.id
    let planetImgs = [];
    const infoTags = ['overview', 'internal structure', 'surface geology'];
    const extraTags = ['rotation time', 'revolution time', 'radius', 'average temp.']

    useEffect(() => {
        setPlanetIdx(0)
        planetService.getById(id)
            .then(planet => {
                initPlanet(planet) 
            })
    }, [id])
    
    const getImgs = (planet) => {
        return Object.values(planet.images)
    }
    
    const getPlanetInfo = (planet) => {
        const { overview, structure, geology, images } = planet;
        const info = {
            overview,
            structure,
            geology
        };
        const subjects = Object.keys(info);
        const tempPlanetInfo = []
        subjects.forEach(subject => {
            const { content, source } = planet[subject]
            tempPlanetInfo.push({
                content,
                source,
                img: (images[subject]) ? images[subject] : (subject === 'structure') ? images.internal : images.planet
            })
        })
        return tempPlanetInfo
    }
    
    const getPlanetStats = (planet) => {
        const { radius, revolution, rotation, temperature } = planet;
        return {
            rotation,
            revolution,
            radius,
            temperature
        }
    }

    const initPlanet = (planet) => {
        const planetInfo = getPlanetInfo(planet);
        const planetStats = getPlanetStats(planet);
        setPlanet(planet);
        setPlanetInfo(planetInfo)
        planetImgs = getImgs(planet) 
        setPlanetStats(planetStats)
    }

    const planetClass = (idx) => {
        return idx === planetIdx ? planet.name.toLowerCase() : ''
    }

    return  ( planet && planetInfo && planetStats &&
        <section className="details-container inner-container">       
            <div className="img-container">
                {(planetIdx === 0 || planetIdx === 2) &&
                <img src={require(`../../assets/imgs${planetInfo[0].img}`).default} alt="" />}
                {planetIdx === 1 &&
                <img src={require(`../../assets/imgs${planetInfo[1].img}`).default} alt="" />}
                {planetIdx === 2 &&
                <img className="marker" src={require(`../../assets/imgs${planetInfo[2].img}`).default} alt="" />}
            </div>
            <article className="planet-info">
                <div className="info-header">
                    <h2>{planet.name}</h2>
                    <p>{planetInfo[planetIdx].content}</p>
                    <small>Source: <a href={planet.overview.source}>Wikipedia</a></small>

                </div>
                <nav className="info-nav">
                    {infoTags.map((tag, idx) => (
                        <div key={idx}
                            className={planetClass(idx) + ' info pointer'}
                            onClick={() => setPlanetIdx(idx)}
                        >
                            <span>{'0' + (idx+1)}</span>
                            {tag}
                        </div>
                    ))}
                </nav>
            </article>
            <div className="planet-extras">
               {Object.keys(planetStats).map((stat, idx) => (
                   <article key={idx} className="extra-container">
                       <div className="extra">
                            <span>{extraTags[idx]}</span>
                            <h3>{planetStats[stat]}</h3>
                       </div>
                   </article>
               ))}
            </div>
        </section>
    ) 
}
