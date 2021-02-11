import React, { useEffect, useRef } from 'react';
import selector from '../../assets/selector.png';

export function Selector(props) {
    const control = useRef(null);
        
    return  (
        <div className='selector-wrapper'>   
          { props.label ? <label className="control-label" htmlFor={ props.label }>{ props.label }</label> : null }      
          <webaudio-knob
            ref={control} 
            className="selector" 
            diameter="60" 
            id={props.label + props.cc} 
            name={props.label} 
            src={selector} 
            step={ 1 } 
            min={ props.min } 
            max={ props.max } 
            value={props.value}>              
          </webaudio-knob>
        </div>
    );
}

Selector.defaultProps = {
    label: null,
    cc: null,
    value: 1,
    step: 1,
    min: 0,
    max: 5,
    active: 1
};