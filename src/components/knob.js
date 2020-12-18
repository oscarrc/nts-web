import React, { useEffect, useCallback } from 'react';
import { midiControlChange } from '../utils/midi';
import { pathToStore } from '../utils/store';
import { useSelector, useDispatch } from 'react-redux';
import knob from '../assets/knob.png';

export function Knob(props) {
    const midiConfig = useSelector(state => state.midi).value;
    const dispatch = useDispatch();
    
    const handleChange = useCallback((value) => {        
        midiControlChange(props.cc, value, midiConfig.outputDevice, midiConfig.outputChannel);
        if(props.path) dispatch({type:'synthesizer/setControl', payload: pathToStore({}, props.path, value) });
    },[props.cc, props.path, midiConfig, dispatch]);
    
    useEffect( () => {
      const element = document.getElementById(props.name + props.cc);
      element.addEventListener("change", (event)=>{
        handleChange(event.target.value);
      });
      
      return () => { if (element) element.removeEventListener("change", handleChange) };       
      // eslint-disable-next-line     
    }, [])

    useEffect( () => {
      const element = document.getElementById(props.name + props.cc);
      element.value = props.value;
    }, [props.name, props.cc, props.value])

    return  (
        <div className='knob-wrapper'>            
          { props.name ? <label className="control-label" htmlFor={ props.name }>{ props.name }</label> : null }       
          <webaudio-knob class="knob" diameter="60" id={props.name + props.cc} name={props.name} src={knob} step={props.step} min={ props.min } max={ props.max } value={props.value}></webaudio-knob>
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