import React, { useEffect, useCallback } from 'react';
import { midiControlChange } from '../utils/midi';

import selector from '../assets/selector.png';

export function Selector(props) {
    const handleChange = useCallback((value) => {
      const val = props.values[value].value;
      if(props.active) midiControlChange(props.cc, val, "", "");
    }, [props.active, props.cc, props.values]);
    
    useEffect( () => {
      const element = document.getElementById(props.name + props.cc);
      
      element.addEventListener("input", (event)=>{
        handleChange(event.target.value)
      });

      element.value = props.value;

      return () => { if (element) element.removeEventListener("input", handleChange) };     
    }, [handleChange, props.name, props.value, props.cc])

    return  (
        <div className='selector-wrapper'>   
          { props.name ? <label className="control-label" htmlFor={ props.name }>{ props.name }</label> : null }      
          <webaudio-knob class="selector" diameter="60" id={props.name + props.cc} name={props.name} src={selector} step={props.step} min={ props.min } max={ props.max } value={ props.value }></webaudio-knob>
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
    active: true,
    values: [],
};