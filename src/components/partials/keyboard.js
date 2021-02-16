import React, {useEffect, useRef} from 'react';

export function Keyboard(props) {
    const keyboard = useRef(null);

    useEffect( () => {  
        const current = keyboard.current;

        const handleResize = () => {
            if(keyboard.current){
                keyboard.current.width = document.getElementsByClassName('keyboard-wrapper')[0].offsetWidth;
                keyboard.current.height = document.getElementsByClassName('keyboard-wrapper')[0].offsetHeight;
            }
        }

        const playNote = (note) => props.onChange(note);

        handleResize();

        window.addEventListener("resize", handleResize);     
        current.addEventListener("change", event => playNote(event.note));

        return () => {
            window.removeEventListener("resize", handleResize);   
            current.removeEventListener("change", playNote);   
        };

        // eslint-disable-next-line
    }, []);
    
    useEffect( () => {
        const current = keyboard.current;
        current.min = props.octave * 12;
        current.keys = props.keys;
    }, [props.octave, props.keys])

    return  (
        <div className='keyboard-wrapper'>
            <webaudio-keyboard  ref={keyboard} colors={props.colors} height={props.height} width={props.width}>
            </webaudio-keyboard>
        </div>
    );
}

Keyboard.defaultProps = {
    keys: 37,
    height: 150,
    width: 480,
    colors: "#212122;#b4b4b4;#b4b4b4;#000;#212122;#eee;#ddd;#333;#222",
    octave: 5
};