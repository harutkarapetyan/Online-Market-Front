import React from 'react'
import "./Button.css"
const Button = (props) => {
  return (
    <button className='button' style={{backgroundColor:props.backgroundColor,color:props.color}} onClick={props.onClick}>{props.buttonText}</button>
  )
}

export default Button