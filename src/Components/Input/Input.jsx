import React from 'react'
import "./Input.css"

const Input = (props) => {
  return (
    <div className='inputDiv'>
        <div className='InputIconDiv'>
            <img width={24} height={24} src={props.logo} alt={props.alt} />
        </div>
        <div className='inputLableDiv'>
            <label htmlFor={props.HtmlFor}>{props.inputName}</label>
            <input onChange={props.onChange} required id={props.inputId} ref={props.inputRef} type={props.type} placeholder={props.placeholder} />
        </div>
    </div>
  )
}

export default Input