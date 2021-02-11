import React, { useEffect, useRef } from 'react';
import knob from '../../assets/knob.png';

export function Knob(props) {
    const control = useRef(null);

    return  (
        <div className='knob-wrapper'>            
          { props.label ? <label className="control-label" htmlFor={ props.label }>{ props.label }</label> : null }       
          <webaudio-knob 
            ref={ control } 
            className="knob" 
            diameter="60" 
            id={ props.label + props.cc } 
            name={ props.label } 
            src={ knob } 
            step={ props.step } 
            min={ props.min } 
            max={ props.max }
            value={ props.value }>              
          </webaudio-knob>
          { props.param ? <webaudio-param className="param" link={props.label}></webaudio-param> : null }
        </div>
    );
}

Knob.defaultProps = {
    label: null,
    max: 127,
    min: 0,
    value: 0,
    step: 1,
    cc: null
};