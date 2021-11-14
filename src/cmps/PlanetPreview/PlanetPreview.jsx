import React, { useEffect } from 'react'
import { StyledPlanetPreview } from '../../styled-cmps/StyledPlanetPreview';

export function PlanetPreview({isActive, planet, setCenter, setActiveId, isOrigin}) {
    
    useEffect(() => {
        if(isActive) setActiveId(planet._id)
    }, [isActive])
  
    

    return (
        <StyledPlanetPreview isActive={isActive}>
            <article onClick={() => setCenter(isActive, planet._id)} className="planet-preview">
                <div className="planet-img-container">
                    {isOrigin && <img src={require(`../../assets/imgs${planet.images.planet}`).default} alt="" /> }
                    {!isOrigin && <img src={require(`../../assets/imgs/edit-imgs/${planet.imgIdx}.png`).default} alt="" /> }
                </div>
            </article>
        </StyledPlanetPreview>
    )
}
