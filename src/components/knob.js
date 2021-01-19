import React, { useEffect, useRef } from 'react';
import { midiControlChange } from '../utils/midi';
import { pathToStore } from '../utils/store';
import { useSelector, useDispatch } from 'react-redux';
import knob from '../assets/knob.png';

export function Knob(props) {
    const midiConfig = useSelector(state => state.midi).value;
    const dispatch = useDispatch();
    const control = useRef(null);
    
    useEffect( () => {
      const current = control.current;      
      const update = (value) => dispatch({type:'synthesizer/setControl', payload: pathToStore({}, props.path, value)});

      current.addEventListener("input", (event) => update(event.target.value) );
      
      return () => current.removeEventListener("input", update);
    }, [props.path, dispatch])

    useEffect( () => {
      if( control.current.value !== props.value) control.current.value = props.value;  
      midiControlChange(props.cc, props.value, midiConfig.outputDevice, midiConfig.outputChannel);
    }, [props.value, props.cc, midiConfig]);
    
    return  (
        <div className='knob-wrapper'>            
          { props.name ? <label className="control-label" htmlFor={ props.name }>{ props.name }</label> : null }       
          <webaudio-knob 
            ref={control} 
            className="knob" 
            diameter="60" 
            id={props.name + props.cc} 
            name={props.name} 
            src={knob} 
            step={props.step} 
            min={ props.min } 
            max={ props.max }
            value={ props.value }>              
          </webaudio-knob>
          { props.param ? <webaudio-param className="param" link={props.name}></webaudio-param> : null }
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
    param: false,
    path: null
};