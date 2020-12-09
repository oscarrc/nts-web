import React, {useEffect, useRef} from 'react';

export function Keyboard(props) {
    const keyboard = useRef(null);

    useEffect( () => {  
        const handleResize = () => {
            const actualWidth = document.getElementsByClassName('keyboard-wrapper')[0].offsetWidth;
            keyboard.current.width = actualWidth;
            keyboard.current.height = actualWidth / 4;
        }

        handleResize();

        window.addEventListener("resize", handleResize);     

        return () => {
            window.removeEventListener("resize", handleResize);   
        };   
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
    colors: "#212122;#b4b4b4;#b4b4b4;#000;#212122;#eee;#ddd;#333;#222"
};