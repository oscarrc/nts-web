import { Fragment, useEffect, useRef, useState } from "react"

import { octaveLimits } from "../../config/synth";
import { useLayout } from "../../hooks/useLayout"
import { useMidi } from "../../hooks/useMidi";

const Keyboard = () => {
    const { breakpoint } = useLayout();
    const { playNote, octave } = useMidi();
    const [ octaves, setOctaves ] = useState( octaveLimits[breakpoint] );
    const keyboardRef = useRef(null);
    const notes = ["C", "D", "E", "F", "G", "A", "B"]
    const sharps = ["C#", "D#", "F#", "G#", "A#"]

    const onPlayStart = (e) => {
        if (window.navigator.vibrate) window.navigator.vibrate(100);
        playNote(e.target.dataset.note);
    }

    const onPlayEnd = (e) => {
        playNote(e.target.dataset.note, false);
        e.target.blur();
    }

    const events = {
        onTouchStart: onPlayStart,
        onTouchEnd: onPlayEnd,
        onMouseDown: onPlayStart,
        onMouseUp: onPlayEnd,
        onMouseLeave: onPlayEnd
    }

    useEffect(() => {
        setOctaves(octaveLimits[breakpoint])
    }, [breakpoint]);

    return (
        <div ref={keyboardRef} className="flex-1 grid relative overflow-hidden auto-cols-auto grid-rows-none gap-x-1 grid-flow-col h-56 -mt-20"> 
            {
                [...Array(octaves).keys()].map((o) => {
                    return [...Array(7).keys()].map((n) => {
                        return (
                            <Fragment key={`${o}${n}`}>
                                { [1,2,4,5,6].includes(n + 1) && <button {...events } data-note={ `${sharps[[1,2,4,5,6].indexOf(n+1)]}${o + octave}`} className="key absolute btn btn-secondary row-start-1 relative top-3/4 w-3/4 left-2/3 h-3/4 rounded z-10 focus:shadow-inner shadow shadow-black"></button> }
                                <button {...events } data-note={ `${notes[n]}${o + octave}` } className="key btn btn-active btn-ghost h-36 row-start-2 w-full h-full rounded z-0 focus:shadow-inner shadow shadow-black"></button>
                            </Fragment>
                        )
                    })
                })
            }
            { octaves && <button {...events } data-note={ `C${octave + octaves}` } className="btn btn btn-active btn-ghost h-36 row-start-2 w-full h-full rounded z-0 focus:shadow-inner shadow shadow-black"></button> }
        </div>
    )
}

export default Keyboard