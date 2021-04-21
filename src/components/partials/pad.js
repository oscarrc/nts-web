import React, { useRef, useEffect } from 'react';

export function Pad(props) {
    const pad = useRef(null);
    const indicator = useRef(null);

    useEffect( () => {
        const currentPad = pad.current;
        const currentIndicator = indicator.current;
        
        const sendPitchBend = (event) => {
            const offsetY = event.type === 'touchstart' ? event.targetTouches[0].clientY -  event.target.getBoundingClientRect().top : event.offsetY;
            const position = (offsetY * 100) / currentPad.clientHeight;
            const pitch = -(-1 + ( 0.02 * (position + 1) ));
            
            currentIndicator.style.top = position + "%";
            props.onChange(pitch)
        }

        const restorePitch = () => {
            currentIndicator.style.top = "50%";
            props.onChange(0)
        }

        currentPad.addEventListener("mousedown", (event) => sendPitchBend(event));
        currentPad.addEventListener("touchstart", (event) => sendPitchBend(event));
        currentPad.addEventListener("mouseup", () => restorePitch());
        currentPad.addEventListener("touchend", () => restorePitch());
        currentPad.addEventListener("mouseleave", () => restorePitch());        
        currentPad.addEventListener("touchcancel", () => restorePitch());

        return () => {
            currentPad.removeEventListener("mousedown", sendPitchBend);
            currentPad.removeEventListener("mouseup", restorePitch);            
            currentPad.removeEventListener("touchend", restorePitch);
            currentPad.removeEventListener("mouseleave", restorePitch);            
            currentPad.removeEventListener("touchcancel", restorePitch);
        }
        //eslint-disable-next-line
    }, [])

    return  (
        <div className="pad-wrapper">
            <div ref={pad} className="pad bg-grid">
                <div ref={indicator} className="indicator"></div>
            </div>
        </div>
    )
}