import React from 'react';

import './keyboard.css';

export function Keyboard(props) {
    return  (
        <div className='keyboard-wrapper'>
            <webaudio-keyboard colors={colors.colors} keys={props.keys}>
            </webaudio-keyboard>
        </div>
    );
}

Keyboard.defaultProps = {
    keys: 49,
    colors: "#888;#000;#000;#888;#777;#eee;#ddd;#333;#222"
};