import React, { useRef, useEffect } from 'react';
import wheel from '../assets/wheel.png';

export function Wheel(props) {
    const knob = useRef(null);

    useEffect( () => {
        const current = knob.current;
        const onEvent = (event) => {
            console.log(event.target.value)
            current.value = 0;
        }
        current.addEventListener("change", event => onEvent(event))
        return () => current.removeEventListener("change", onEvent)
    })

    return  (
        <webaudio-knob ref={knob} sprites="127" width={props.width} height={props.height} src={wheel} step={props.step} min={ props.min } max={ props.max } ></webaudio-knob>
    );
}

Wheel.defaultProps = {
    height: 110,
    width: 64,
    min: 0,
    max: 127,
    step: 1
};