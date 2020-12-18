import React, { useEffect, useCallback } from 'react';
import { midiControlChange } from '../utils/midi';
import { useSelector, useDispatch } from 'react-redux';
import { pathToStore } from '../utils/store';

import button from '../assets/button.png';

export function Button(props) {
    const midiConfig = useSelector(state => state.midi).value;
    const dispatch = useDispatch();

    const handleChange = useCallback((value) => {     
        midiControlChange(props.cc, value === 1 ? props.onValue : props.offValue,  midiConfig.outputDevice, midiConfig.outputChannel);
        if(props.path) dispatch({type:'synthesizer/setControl', payload: pathToStore({}, props.path, value) });
    },[props.path, props.onValue, props.offValue, props.cc, dispatch, midiConfig]);
    
    useEffect(() => {
        const element = document.getElementById(props.name + '-btn');
        element.addEventListener("change", (event)=>{
            handleChange(event.target.value);
        });
    
        return () => { if (element) element.removeEventListener("input", handleChange) };   
        // eslint-disable-next-line 
    },[])

    useEffect( () => {        
        const element = document.getElementById(props.name + '-btn');        
        element.value = props.active;
    }, [props.cc, props.name, props.active])

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
    active: 0,
    path: null
};