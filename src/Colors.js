
import React, {useState} from "react"

import {AiOutlineBgColors} from 'react-icons/ai'


// colors array to choose color global variables
const colors = [
    {
        id: 0,
        color: 'var(--cl-1-1)'
    },
    {
        id: 1,
        color: 'var(--cl-2-2)'
    },
    {
        id: 2,
        color: 'var(--cl-3-3)'
    },
    {
        id: 3,
        color: 'var(--cl-4-4)'
    },
]
// get color from local storage
const getColor = () => {
    const color = localStorage.getItem('color')
    return color
}

export default function Colors() {
    // radio input
    const [color, setColor] = useState(getColor())

    // change root color only once then app renders
    React.useEffect(() => {
        const root = document.querySelector(':root');
        root.style.setProperty('--cl-3', color)
    }, [])

    // submit colors form
    function handleSubmit(e) {
        e.preventDefault()
        const root = document.querySelector(':root');
        root.style.setProperty('--cl-3', color)
    }

    // change color on every radio button change
    function handleInput(e) {
        setColor(e.currentTarget.id)
    }

    // save key and relevant value (color)
    React.useEffect(() => {
        localStorage.setItem("color", color)
    })

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            {colors.map((item) => {
                return (
                    <div key={item.id} className="color-container">
                        <span className="span" > <AiOutlineBgColors className="color-icon" style={{color: item.color}}/> </span> 
                        <input onChange={handleInput} checked={color === item.color}  id={item.color} className="color-btn" name="color" type="radio"  style={{backgroundColor: `${item.color}`}} />
                    </div>
                )
            })}
            <button>change color</button>
        </form>
    )
}