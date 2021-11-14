import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { GalleryList } from '../../cmps/GalleryList/GalleryList';
import { useForm } from '../../hooks/useForm';
import { planetService } from '../../services/planet-service'
import { savePlanet } from '../../store/actions/planetAction';
import { TwitterPicker } from 'react-color';
import './PlanetEdit.scss'

export function PlanetEdit(props) {

    const dispatch = useDispatch()
    const [planetToEdit, handleChange, setPlanetToEdit] = useForm(null);
    const [imgIdx, setImgIdx] = useState(1)
    const id = props.match.params.id;
    const [currColor, setCurrColor] = useState({
        main: 'hsl(24,100%,50%)',
        hover: 'hsl(24,100%,60%)'
    })

    useEffect(() => {
        async function setPlanet() {
            let planet;
            if (!id) planet = planetService.getEmptyPlanet()
            else planet = await planetService.getById(id)
            setPlanetToEdit(planet)
        }
        setPlanet()
    }, [id])

    useEffect(() => {
        setPlanetToEdit({...planetToEdit, imgIdx})
    }, [imgIdx])

    useEffect(() => {
        setPlanetToEdit({...planetToEdit, colors: currColor})
    }, [currColor])

    const titleToDisplay = () => {
        return !id ? 'Add your own planet to the milky way!'
            : 'Edit your planet';
    }

    const handleColor = (color) => {
        const {h,s,l} = color.hsl
        const hsl = {
            main: `hsl(${h},${s*100}%,${l*100}%)`,
            hover: `hsl(${h},${s * 100}%,${(l * 100) + 10}%)`
        }
        setCurrColor(hsl)
    }

    const onPlanetSubmit = (ev) => {
        ev.preventDefault()
        dispatch(savePlanet(planetToEdit))
    }


    const planetNames = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

    return (
        <section className="inner-container edit-container">
            <div className="edit-img">
                <div className="img-select">
                    <img src={require(`../../assets/imgs/edit-imgs/${imgIdx}.png`).default} alt="" />
                </div>
            </div>
            <form onSubmit={onPlanetSubmit}>
                <h2>{titleToDisplay()}</h2>
                <div className="edit-info">
                    <div className="info">
                        <label htmlFor="name" >Planet Name:  </label>
                        <input type="text" id="name" placeholder="Set a name" name="name" onChange={handleChange} />
                        <label htmlFor="rotation">Rotation time: <span>in days</span><span className="help">?</span> </label>
                        <input type="text" id="rotation" placeholder="How long is a day in your planet?" name="rotation" onChange={handleChange} />
                        <label htmlFor="revolution">Revolution time: <span>in days</span><span className="help">?</span> </label>
                        <input type="text" id="revolution" placeholder="How much days is a year in your planet?" name="revolution" onChange={handleChange} />
                        <label htmlFor="radius">Radius <span>in k"m's</span></label>
                        <input type="text" id="radius" placeholder="What's the size of your planet?" name="radius" onChange={handleChange} />
                        <label htmlFor="temp">Avg temp: <span>in celsius</span><span className="help">?</span> </label>
                        <input type="text" id="temp" placeholder="What's your planets temperature?" name="temperature" onChange={handleChange} />
                    </div>
                    <div className="edit-desc">
                        <label htmlFor="overview">Planet Overview:</label>
                        <textarea id="overview" placeholder="Tell me about your planet." name="overview" onChange={handleChange} />
                    </div>
                    <TwitterPicker color={currColor} 
                    onChangeComplete={handleColor}
                    className="color-picker" 
                    triangle="hide" width="350px" />
                    <button>Save planet</button>
                </div>
            </form>
            <section className="img-gallery">
                <GalleryList setImgIdx={setImgIdx} />
            </section>
        </section>
    )
}
