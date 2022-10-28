import { useEffect, useRef, useState } from "react";

const Pitch = ({ onChange }) => {
    const padRef = useRef(null);
    const indicatorRef = useRef(null);
    const [ value, setValue ] = useState(0);

    const restore = () => {
        const currentIndicator = indicatorRef.current;  
        if(!currentIndicator) return;
        currentIndicator.style.top = "calc(33% + 2.5px)";
    };
    
    const bend = (event) => {
        const currentPad = padRef.current;
        const currentIndicator = indicatorRef.current;

        const offsetY = event.type === 'touchstart' ? event.targetTouches[0].clientY -  event.target.getBoundingClientRect().top : event.offsetY;
        const position = (offsetY * 100) / currentPad.clientHeight;
        const pitch = -(-1 + ( 0.02 * (position + 1) ));
        
        currentIndicator.style.top = position + "%";

        console.log(pitch)
    }

    const events = {
        onMouseDown: bend,
        onMouseUp: restore,
        onTouchStart: bend,
        onTouchEnd: restore,
        onMouseLeave: bend,
        onTouchCancel: restore
    }

    useEffect(() => {      
        restore();
    }, [])

    return (          
        <div {...events} ref={ padRef } className="relative cursor-pointer h-28 w-10 rounded bg-neutral bg-grid outline outline-base-100 outline-offset-1 outline-1 overflow-hidden">
             <div ref={indicatorRef} className="indicator relative bg-accent w-full h-px shadow-glow shadow-accent"></div>
        </div>
    )
}

export default Pitch;