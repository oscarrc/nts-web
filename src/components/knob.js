import React, { useEffect, useCallback } from 'react';
import { midiControlChange } from '../utils/midi';

import knob from '../assets/knob.png';

export function Knob(props) {
    const handleChange = useCallback((value) => {
        midiControlChange(props.cc, value, "", "");
    },[props.cc]);
    
    useEffect( () => {      
      const element = document.getElementById(props.name + props.cc);
      
      element.value = props.value;
      handleChange(element.value);

      element.addEventListener("input", (event)=>{
        handleChange(event.target.value)
      });

      return () => { if (element) element.removeEventListener("input", handleChange) };      
    }, [handleChange, props.name, props.value, props.cc])

    return  (
        <div className='knob-wrapper'>            
          { props.name ? <label className="control-label" htmlFor={ props.name }>{ props.name }</label> : null }       
          <webaudio-knob class="knob" diameter="60" id={props.name + props.cc} name={props.name} src={knob} step={props.step} min={ props.min } max={ props.max } value={ props.value }></webaudio-knob>
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