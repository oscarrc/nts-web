import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { midiSendPitchBend } from '../utils/midi';

export function Pad() {
    const pad = useRef(null);
    const indicator = useRef(null);
    const midiConfig = useSelector(state => state.midi).value;

    useEffect( () => {
        const currentPad = pad.current;
        const currentIndicator = indicator.current;
        
        const sendPitchBend = (event) => {
            const position = (event.offsetY * 100) / currentPad.clientHeight;
            const pitch = -(-1 + ( 0.02 * (position + 1) ));
            
            currentIndicator.style.top = position + "%";
            midiSendPitchBend(pitch, midiConfig.outputDevice, midiConfig.outputChannel);
        }

        const restorePitch = () => {
            currentIndicator.style.top = "50%";
            midiSendPitchBend(0, midiConfig.outputDevice, midiConfig.outputChannel);
        }

        currentPad.addEventListener("mousedown", (event) => sendPitchBend(event));
        currentPad.addEventListener("mouseup", () => restorePitch());
        currentPad.addEventListener("mouseleave", () => restorePitch());

        return () => {
            currentPad.removeEventListener("mousedown", sendPitchBend);
            currentPad.removeEventListener("mouseup", restorePitch);
            currentPad.removeEventListener("mouseleave", restorePitch);
        }
    }, [midiConfig])

    return  (
        <div className="pad-wrapper">
            <div ref={pad} className="pad bg-grid">
                <div ref={indicator} className="indicator"></div>
            </div>
        </div>
    )
}