import React from 'react';

import button from '../assets/button.png';

export function Button(props) {
    return  (
        <span className="text-light switch-button">
            <webaudio-switch src={button} id={ props.name }></webaudio-switch> { props.tag ? props.name : ''}
        </span>
    );
}

Button.defaultProps = {
    name: null,
    tag: false,
};