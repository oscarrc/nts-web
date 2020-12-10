import React, { useState, useEffect, useCallback } from 'react';

import selector from '../assets/selector.png';

export function Selector(props) {
    const [value, setValue] = useState(props.value);

    const handleChange = useCallback((value) => {
      console.log(props.values[value])
    }, [props.values])
    
    useEffect( () => {
      const id = props.name + props.cc;

      document.getElementById(id).addEventListener("input", (event)=>{
        handleChange(event.target.value)
      });

      setValue(props.value);

      return () => document.getElementById(id).removeEventListener("input", handleChange);      
    }, [handleChange, props.name, props.value, props.cc])

    return  (
        <div className='selector-wrapper'>   
          { props.name ? <label className="control-label" htmlFor={ props.name }>{ props.name }</label> : null }      
          <webaudio-knob class="selector" diameter="60" id={props.name + props.cc} name={props.name} src={selector} step={props.step} min={ props.min } max={ props.max } value={ value }></webaudio-knob>
        </div>
    );
}

Selector.defaultProps = {
    name: null,
    cc: null,
    value: 0,
    step: 1,
    min: 0,
    max: 5,
    values: [],
};