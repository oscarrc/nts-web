import React, { useState, useEffect } from 'react';

import selector from '../assets/selector.png';

export function Selector(props) {
    const [value, setValue] = useState(props.value);
    const handleChange = (value) => {
      console.log(value)
    }
    
    useEffect( () => {
      document.getElementById(props.name).addEventListener("input", (event)=>{
        handleChange(event.target.value)
      });

      setValue(props.value);

      return () => document.getElementById(props.name).removeEventListener("input", handleChange);      
    }, [setValue, props.name, props.value])

    return  (
        <div className='selector-wrapper'>   
          { props.name ? <label className="control-label" htmlFor={ props.name }>{ props.name }</label> : null }      
          <webaudio-knob class="selector" diameter="60" id={props.name} name={props.name} src={selector} step={props.step} min={ 0 } max={ props.values.length - 1  } value={ value }></webaudio-knob>
        </div>
    );
}

Selector.defaultProps = {
    name: null,
    bg: null,
    max: 5,
    min: 0,
    value: 0,
    values: ["a","b","c"],
};