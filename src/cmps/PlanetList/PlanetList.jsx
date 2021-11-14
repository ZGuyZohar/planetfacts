import React, { useEffect, useMemo,  useState } from 'react';
import './PlanetList.scss'
import { PlanetPreview } from '../PlanetPreview/PlanetPreview';

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import "swiper/swiper.scss";

import SwiperCore, {
    Keyboard,
} from 'swiper';
import { useHistory } from 'react-router';

SwiperCore.use([Keyboard]);

export function PlanetList({ planets, isOrigin }) {
    
    const [currActiveId, setCurrActiveId] = useState(null)
    const history = useHistory();

    const slidesPerView = useMemo(() => {
        return !isOrigin ? Math.min(planets.length-1, 5) : 5
    }, [planets?.length, isOrigin])

    useEffect(()=>{
        const setCenterOnPress = (ev) => {
            if (ev.keyCode === 13 && currActiveId) {
                setCenter(true, currActiveId)
            }
        }
        document.addEventListener('keyup', setCenterOnPress)
        
        return () => document.removeEventListener('keyup', setCenterOnPress)
    }, [currActiveId])

    const setCenter = (isActive, planetId) => {
        if (isActive) {
            history.push('/planet/' + planetId)
        }
    }

    // TODO: fix the list look if there are less than 5 planets 
    // TODO: fix planet details for non origin
    // TODO: improve ui in edit
    // TODO: make more efficient rendering via useCallback's and useMemo's
    // TODO: make responsive and create homepage
    // TODO: finally then you can make typeracer!!!!

    return ( planets && 
        <div className="carousel-list">
        <Swiper slidesPerView={slidesPerView}
            keyboard={{"enabled": true}} 
            spaceBetween={30} 
            pagination={{"clickable": true}} 
            centeredSlides={true} 
            loop={true}
            loopedSlides={planets.length}
            centeredSlidesBounds={true}
            >
                {planets.map((planet) => (
                    <SwiperSlide key={planet._id}>
                        {({isActive}) => {                    
                            return <PlanetPreview 
                            planet={planet} 
                            isActive={isActive} 
                            setCenter={setCenter} 
                            setActiveId={setCurrActiveId} 
                            isOrigin={isOrigin}/>
                        }}
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
}