import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { midiSendPitchBend } from '../utils/midi';
import wheel from '../assets/wheel.png';

export function Wheel(props) {
    const control = useRef(null);
    const midiConfig = useSelector(state => state.midi).value;
    
    useEffect( () => {
        const current = control.current;
        const onEvent = (event) => {
            midiSendPitchBend(event.target.value, midiConfig.outputDevice, midiConfig.outputChannel);
            current.setValue(0, true);
        }
        current.addEventListener("change", event => onEvent(event))
        return () => current.removeEventListener("change", onEvent)
    }, [midiConfig])

    return  (
        <div>
            <webaudio-knob id="pitch-bend" ref={control} sprites="127" width={props.width} height={props.height} src={wheel} step={props.step} min={ props.min } max={ props.max } ></webaudio-knob>
            <webaudio-param link="pitch-bend" width={props.width} ></webaudio-param>
        </div>
    );
}

Wheel.defaultProps = {
    height: 165,
    width: 96,
    min: -1,
    max: 1,
    step: 0.01
};