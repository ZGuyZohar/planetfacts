import React from 'react'
import './AppHeader.scss'
import { NavLink, useHistory, useLocation } from 'react-router-dom'

import { StyledNav } from '../../styled-cmps/StyledNav'
export function AppHeader(props) {
    const history = useHistory()
    const {planets} = props
    const idParam = useLocation().pathname.split('/', 3)[2]

    const isActive = (planetId, id) => {
        return planetId === id
    }

    return ( planets &&
        <header className="app-header-container">
            <nav>
                <div className="logos">
                    <h2 onClick={()=>history.push('/')} className="logo pointer">PlanetFacts</h2>
                    <NavLink className="pointer" to="/planet">the planets</NavLink>
                    <NavLink className="pointer" to="/planet/edit">add a new planet</NavLink>
                </div>
                <ul>
                    {planets.map(planet => (
                        <StyledNav key={planet._id} color={planet.colors} isActive={isActive(planet._id, idParam)}  >
                            <NavLink 
                            to={'/planet/' + planet._id} 
                            activeClassName="active"
                            className="pointer">{planet.name}
                            </NavLink>
                        </StyledNav>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
