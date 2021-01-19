import React, { useEffect, useRef } from 'react';
import { midiControlChange } from '../utils/midi';
import { useSelector, useDispatch } from 'react-redux';
import { pathToStore } from '../utils/store';

import button from '../assets/button.png';

//TODO Fix randomize and patch not firing handle change
export function Button(props) {
    const midiConfig = useSelector(state => state.midi).value;
    const dispatch = useDispatch();
    const control = useRef(null);
    
    useEffect( () => {
        const current = control.current;
        current.addEventListener("change", (event) => {
            dispatch({type:'synthesizer/setControl', payload: pathToStore({}, props.path, event.target.value) });
        });      
      }, [props.path, dispatch])

    useEffect( () => {
        if( control.current.value !== props.active) control.current.value = props.active; 
        midiControlChange(props.cc, props.active === 1 ? props.onValue : props.offValue,  midiConfig.outputDevice, midiConfig.outputChannel);
    }, [props.active, props.cc, props.onValue, props.offValue, midiConfig]);

    return  (
        <span className="text-light switch-button">
            <webaudio-switch 
                ref={control}
                src={button}
                id={ props.name + '-btn' }
                value={ props.active }>
            </webaudio-switch> { props.tag ? props.name : ''}
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