import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { midiControlChange } from '../utils/midi';
import { pathToStore } from '../utils/store';

import selector from '../assets/selector.png';
//TODO Fix randomize and patch not firing handle change
export function Selector(props) {
    const midiConfig = useSelector(state => state.midi).value;
    const dispatch = useDispatch();
    const control = useRef(null);

    const handleChange = useCallback((value) => {
      const val = props.values[value]?.value;
      if(props.active) midiControlChange(props.cc, val, midiConfig.outputDevice, midiConfig.outputChannel);
      if(props.path) dispatch({type:'synthesizer/setControl', payload: pathToStore({}, props.path, value) });
    }, [props.active, props.cc, props.values, props.path, dispatch, midiConfig]);
    
    useEffect( () => {
      const current = control.current;
      current.addEventListener("input", (event) => handleChange(event.target.value)); 
      return () => current.removeEventListener("input", handleChange);
    }, [control, handleChange, props.value])

    useEffect( () => control.current.value = props.value, [props.value]);
    
    return  (
        <div className='selector-wrapper'>   
          { props.name ? <label className="control-label" htmlFor={ props.name }>{ props.name }</label> : null }      
          <webaudio-knob  ref={control} class="selector" diameter="60" id={props.name + props.cc} name={props.name} src={selector} step={props.step} min={ props.min } max={ props.max } value={props.value}></webaudio-knob>
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
    path: null
};