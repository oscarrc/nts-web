import React, {useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';

import { midiPlayNote } from '../utils/midi';

export function Keyboard(props) {
    const keyboard = useRef(null);
    const midiConfig = useSelector(state => state.midi).value;

    useEffect( () => {  
        const current = keyboard.current;

        const handleResize = () => {
            const actualWidth = document.getElementsByClassName('keyboard-wrapper')[0].offsetWidth;
            keyboard.current.width = actualWidth;
            keyboard.current.height = actualWidth / 4;
        }

        const playNote = (note) => midiPlayNote(note[1], midiConfig.outputDevice, midiConfig.outputChannel, note[0]);

        handleResize();

        window.addEventListener("resize", handleResize);     
        current.addEventListener("change", event => playNote(event.note));

        return () => {
            window.removeEventListener("resize", handleResize);   
            current.removeEventListener("change", playNote);   
        }; 
        
    })

    return  (
        <div className='keyboard-wrapper'>
            <webaudio-keyboard  ref={keyboard} min={ props.octave * 12 } colors={props.colors} keys={props.keys} height={props.height} width={props.width}>
            </webaudio-keyboard>
        </div>
    );
}

Keyboard.defaultProps = {
    keys: 36,
    height: 150,
    width: 480,
    colors: "#212122;#b4b4b4;#b4b4b4;#000;#212122;#eee;#ddd;#333;#222",
    octave: 0
};