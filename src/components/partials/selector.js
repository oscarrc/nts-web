import React, { useEffect, useRef } from 'react';
import selector from '../../assets/selector.png';

//TODO fix double triggering
export function Selector(props) {
    const control = useRef(null);
    const onChange = (event) => {
      const value = event.target.value * props.step > (props.max * props.step) ? 127 : event.target.value * props.step;
      props.onChange(props.cc, { value: value }, props.active);
    }

    useEffect(() => {
      const current = control.current;
      current.addEventListener("change", onChange);  
      if( current.value * props.step !== props.value){
        current.value = Math.round(props.value / props.step);
        props.onChange(props.cc, { value: props.value }, props.active);
      }   
      return () => current.removeEventListener("change", onChange);   
      // eslint-disable-next-line
    }, [props.value, props.step, props.active]);

    useEffect(() => {
      const current = control.current;
      current.max = props.max;
    }, [props.max])
        
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
            value={ Math.round(props.value / props.step) > props.max - 1 ? props.max : Math.round(props.value / props.step) }>              
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