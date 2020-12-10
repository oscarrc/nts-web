import React, { useState, useEffect } from 'react';

import knob from '../assets/knob.png';

export function Knob(props) {
    const [value, setValue] = useState(props.value);
    const handleChange = (value) => {
      console.log(value)
    }
    
    useEffect( () => {      
      const id = props.name + props.cc;

      document.getElementById(id).addEventListener("input", (event)=>{
        handleChange(event.target.value)
      });

      setValue(props.value);

      return () => document.getElementById(id).removeEventListener("input", handleChange);      
    }, [props.name, props.value, props.cc])

    return  (
        <div className='knob-wrapper'>            
          { props.name ? <label className="control-label" htmlFor={ props.name }>{ props.name }</label> : null }       
          <webaudio-knob class="knob" diameter="60" id={props.name + props.cc} name={props.name} src={knob} step={props.step} min={ props.min } max={ props.max } value={ value }></webaudio-knob>
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
    cc: null,
    param: false
};