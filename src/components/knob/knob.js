import React, { useState, useEffect } from 'react';

import './knob.css';
import knob from '../../assets/knob.png';

export function Knob(props) {
    const [value, setValue] = useState(props.value);
    const handleChange = (value) => {
      console.log(value)
    }
    
    useEffect( () => {
      document.getElementById(props.name).addEventListener("input", (event)=>{
        handleChange(event.target.value)
      });

      setValue(props.value);

      return () =>document.getElementById(props.name).removeEventListener("input", handleChange);      
    }, [setValue, props.name, props.value])

    return  (
        <div className='knob-wrapper'>            
          { props.name ? <label className="control-label" htmlFor={ props.name }>{ props.name }</label> : null }       
          <webaudio-knob class="knob" diameter="60" id={props.name}  name={props.name} src={knob} min={ props.min } max={ props.max } value={ value }></webaudio-knob>
          { props.param ? <webaudio-param class="param" link={props.name}></webaudio-param> : null }
        </div>
    );
}

Knob.defaultProps = {
    name: null,
    max: 10,
    min: 0,
    value: 0,
    step: 1,
    param: false
};