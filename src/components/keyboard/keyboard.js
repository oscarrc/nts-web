import React, {useEffect, useRef} from 'react';

import './keyboard.css';

export function Keyboard(props) {
    const keyboard = useRef(null);

    useEffect( () => {  
        const handleResize = () => {
            const actualWidth = document.getElementsByClassName('keyboard-wrapper')[0].offsetWidth;
            keyboard.current.width = actualWidth;
        }

        handleResize();

        window.addEventListener("resize", () => {
            handleResize();
        });     
    })

    return  (
        <div className='keyboard-wrapper'>
            <webaudio-keyboard  ref={keyboard} colors={props.colors} keys={props.keys} height={props.height} width={props.width}>
            </webaudio-keyboard>
        </div>
    );
}

Keyboard.defaultProps = {
    keys: 36,
    height: 150,
    width: 480,
    colors: "#888;#000;#000;#888;#777;#eee;#ddd;#333;#222"
};