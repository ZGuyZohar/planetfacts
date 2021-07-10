import React, { useState, useEffect } from 'react'
import './AppHeader.scss'
import { NavLink, useLocation } from 'react-router-dom'

import { StyledNav } from '../../styled-cmps/StyledNav'
export function AppHeader(props) {
    const {planets} = props
    const [id, setId] = useState(null);
    // const idParam = useLocation().pathname.split('/', 3)[2]
    useEffect(()=> {
        const currId = window.location.hash.split('/', 3)[2];
        setId(currId)
    }, [useLocation().pathname])


    const isActive = (planetId) => {
        return planetId === id
    }

    return ( planets &&
        <header className="app-header-container">
            <nav>
                <h2 className="logo pointer">The Planets</h2>
                <ul>
                    {planets.map(planet => (
                        <StyledNav key={planet._id} color={planet.colors} isActive={isActive(planet._id)}  >
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
