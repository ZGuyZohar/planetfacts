import React from 'react'
import { GalleryPreview } from '../GalleryPreview/GalleryPreview'
import './GalleryList.scss'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import "swiper/swiper.scss";

import SwiperCore, {
    Keyboard,
} from 'swiper';

SwiperCore.use([Keyboard]);
export function GalleryList({setImgIdx}) {
    const imgIdxs = Array(16).fill(null).map(() => Math.random())
    return (
        <Swiper slidesPerView={5}
            keyboard={{ "enabled": true }}
            spaceBetween={40}
            pagination={{ "clickable": true }}
            centeredSlides={true}
            loop={true}
            loopedSlides={imgIdxs.length}
            centeredSlidesBounds={true}
        >
            {imgIdxs.map((rand, idx) => (
                <SwiperSlide key={rand}>
                    <GalleryPreview setImgIdx={setImgIdx} idx={idx+1} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}