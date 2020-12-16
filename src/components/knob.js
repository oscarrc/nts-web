import React, { useEffect, useCallback } from 'react';
import { midiControlChange } from '../utils/midi';
import { pathToStore } from '../utils/store';
import { useSelector, useDispatch } from 'react-redux';
import knob from '../assets/knob.png';

//TODO dispatch firing multiple times
export function Knob(props) {
    const midiConfig = useSelector(state => state.midi).value;
    const dispatch = useDispatch();
    
    const handleChange = useCallback((value) => {
        midiControlChange(props.cc, value, midiConfig.outputDevice, midiConfig.outputChannel);

        if(props.path) { 
          const payload = pathToStore({}, props.path, value);
          dispatch({type:'synthesizer/setControl', payload});
        };
    },[props.cc, props.path, midiConfig, dispatch]);
    
    useEffect( () => {      
      const element = document.getElementById(props.name + props.cc);

      element.addEventListener("input", (event)=>{
        handleChange(event.target.value);
      });

      return () => { if (element) element.removeEventListener("input", handleChange) };      
    }, [handleChange, props.name, props.cc])

    return  (
        <div className='knob-wrapper'>            
          { props.name ? <label className="control-label" htmlFor={ props.name }>{ props.name }</label> : null }       
          <webaudio-knob class="knob" diameter="60" id={props.name + props.cc} name={props.name} src={knob} step={props.step} min={ props.min } max={ props.max } defvalue={ props.value }></webaudio-knob>
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