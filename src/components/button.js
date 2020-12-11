import React, { useEffect } from 'react';

import button from '../assets/button.png';

export function Button(props) {
    useEffect(() => {
        const element = document.getElementById(props.name + '-btn');
      
        element.value = props.active;
    })

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
    value: null,
    active: 0
};