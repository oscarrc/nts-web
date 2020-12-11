import React, { useEffect, useCallback } from 'react';
import { midiControlChange } from '../utils/midi';

import button from '../assets/button.png';

export function Button(props) {
    const handleChange = useCallback((value) => {
        value = value === 0 ? props.offValue : props.onValue;
        midiControlChange(props.cc, value, "", "");
    },[props.cc, props.offValue, props.onValue]);
    
    useEffect(() => {
        const element = document.getElementById(props.name + '-btn');
      
        element.value = props.active;

        element.addEventListener("input", (event)=>{
            handleChange(event.target.value)
        });
    
        return () => { if (element) element.removeEventListener("input", handleChange) };    
    },[handleChange, props.active, props.name])

    return  (
        <span className="text-light switch-button">
            <webaudio-switch src={button} id={ props.name + '-btn' } value={ props.active } ></webaudio-switch> { props.tag ? props.name : ''}
        </span>
    );
}

Button.defaultProps = {
    name: null,
    tag: false,
    cc: null,
    onValue: null,
    offValue: 0,
    active: 0
};