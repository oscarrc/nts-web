import React, { useRef, useEffect } from 'react';
import { midiSendPitchBend } from '../utils/midi';
import wheel from '../assets/wheel.png';

export function Wheel(props) {
    const control = useRef(null);

    useEffect( () => {
        const current = control.current;
        const onEvent = (event) => {
            midiSendPitchBend(event.target.value);
            current.value = 0;
        }
        current.addEventListener("change", event => onEvent(event))
        return () => current.removeEventListener("change", onEvent)
    })

    return  (
        <div>
            <webaudio-knob id="pitch-bend" ref={control} sprites="127" width={props.width} height={props.height} src={wheel} step={props.step} min={ props.min } max={ props.max } ></webaudio-knob>
            <webaudio-param link="pitch-bend"></webaudio-param>
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