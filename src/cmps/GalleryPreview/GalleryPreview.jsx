import React from 'react'
import './GalleryPreview.scss'

export function GalleryPreview({ idx, setImgIdx}) {
    return (
        <article onClick={()=>setImgIdx(idx+1)} className="gallery-preview">
            <img src={require(`../../assets/imgs/edit-imgs/${idx+1}.png`).default} alt="" />
        </article>
    )
}
