import React, { useEffect, useState } from 'react'
import { planetService } from '../../services/planet-service';
import './PlanetDetails.scss'


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
        planetService.getById(id)
            .then(planet => {
                console.log(planet, 'from useffect');
                initPlanet(planet)
            })
    }, [id])

    
    const setImgs = (planet) => {
        planetImgs = (Object.values(planet.images))
    }
    
    const initPlanetInfo = (planet) => {
        console.log(planet, 'init');
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
        console.log(tempPlanetInfo);
        setPlanetInfo(tempPlanetInfo)
    }
    
    const initPlanetStats = (planet) => {
        const { radius, revolution, rotation, temperature } = planet;
        setPlanetStats({
            rotation,
            revolution,
            radius,
            temperature
        })
    }

    const initPlanet = (planet) => {
        setPlanet(planet);
        initPlanetInfo(planet)
        setImgs(planet) 
        initPlanetStats(planet)
    }

    const planetClass = (idx) => {
        return idx === planetIdx ? planet.name.toLowerCase() : ''
    }

    return  ( planet && planetInfo && planetStats &&
        <section className="inner-container">       
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
                    <small>Source: <a href={planet.geology.source}>Wikipedia</a></small>

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
                   <article className="extra-container">
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
