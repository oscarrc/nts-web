import React, { useEffect, useCallback, useRef } from 'react';
import { midiControlChange } from '../utils/midi';
import { pathToStore } from '../utils/store';
import { useSelector, useDispatch } from 'react-redux';
import knob from '../assets/knob.png';
//TODO Fix randomize and patch not firing handle change

export function Knob(props) {
    const midiConfig = useSelector(state => state.midi).value;
    const dispatch = useDispatch();
    const control = useRef(null);

    const handleChange = useCallback((value) => {
        midiControlChange(props.cc, value, midiConfig.outputDevice, midiConfig.outputChannel);
        if(props.path) dispatch({type:'synthesizer/setControl', payload: pathToStore({}, props.path, value) });
    },[props.cc, props.path, midiConfig, dispatch]);
    
    useEffect( () => {
      const current = control.current;
      current.addEventListener("input", (event) => handleChange(event.target.value));      
      return () => current.removeEventListener("input", handleChange);
    }, [control, handleChange])

    useEffect( () => control.current.value = props.value, [props.value]);
    
    return  (
        <div className='knob-wrapper'>            
          { props.name ? <label className="control-label" htmlFor={ props.name }>{ props.name }</label> : null }       
          <webaudio-knob ref={control} class="knob" diameter="60" id={props.name + props.cc} name={props.name} src={knob} step={props.step} min={ props.min } max={ props.max } value={props.value}></webaudio-knob>
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
    param: false,
    path: null
};