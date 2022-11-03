import { Fragment, useEffect, useRef, useState } from "react"

import { octaveLayout } from "../../config/layout";
import { useLayout } from "../../hooks/useLayout"
import { useMidi } from "../../hooks/useMidi";

const Keyboard = () => {
    const { breakpoint } = useLayout();
    const { playNote, octave, input, passthrough } = useMidi();
    const [ octaves, setOctaves ] = useState( octaveLayout[breakpoint] );
    const [ activeNote, setActiveNote ] = useState(null);

    const keyboardRef = useRef(null);
    const notes = ["C", "D", "E", "F", "G", "A", "B"]

    const onPlayStart = (e) => {
        if (window.navigator.vibrate) window.navigator.vibrate(200);
        playNote(e.target.dataset.note);
    }

    const onPlayEnd = (e) => {
        playNote(e.target.dataset.note, false);
        e.target.blur();
    }

    const setNote = (e) => {
        const note = `${e.note._name}${!!e.note._accidental ? e.note._accidental : ""}${e.note._octave}`
        if(e.type === "noteon") setActiveNote(note)
        else setActiveNote(false)
        console.log(note)
    }

    const events = {
        onTouchStart: onPlayStart,
        onTouchEnd: onPlayEnd,
        onMouseDown: onPlayStart,
        onMouseUp: onPlayEnd,
        onMouseLeave: onPlayEnd,
        onTouchCancel: onPlayEnd
    }

    useEffect(() => {
        setOctaves(octaveLayout[breakpoint])
    }, [breakpoint]);

    useEffect(() => {
        !input?.hasListener("noteon", setNote) && input?.addListener("noteon", setNote)
        !input?.hasListener("noteoff", setNote) && input?.addListener("noteoff", setNote)
        !passthrough?.hasListener("noteon", setNote) && passthrough?.addListener("noteon", setNote)
        !passthrough?.hasListener("noteoff", setNote) && passthrough?.addListener("noteoff", setNote)

        return () => {
            input?.hasListener("noteon", setNote) && input?.removeListener("noteon", setNote)
            input?.hasListener("noteoff", setNote) && input?.removeListener("noteoff", setNote)            
            passthrough?.hasListener("noteon", setNote) && passthrough?.removeListener("noteon", setNote)
            passthrough?.hasListener("noteoff", setNote) && passthrough?.removeListener("noteoff", setNote)
        }
    }, [input, passthrough])

    return (
        <div ref={keyboardRef} className="flex-1 grid relative overflow-hidden auto-cols-auto grid-rows-none gap-x-1 grid-flow-col h-56 -mt-20"> 
            {
                [...Array(octaves).keys()].map((o) => {
                    return [...Array(7).keys()].map((n) => {
                        return (
                            <Fragment key={`${o}${n}`}>
                                { [1,2,4,5,6].includes(n + 1) && <button {...events } data-note={ `${notes[n]}#${o + octave}`} className={`key absolute btn btn-secondary row-start-1 relative top-3/4 w-3/4 left-2/3 h-3/4 rounded z-10 focus:shadow-inner shadow shadow-black ${ activeNote === `${notes[n]}#${o + octave}` && 'btn-pushed'}`}></button> }
                                <button {...events } data-note={ `${notes[n]}${o + octave}` } className={`key btn btn-active btn-ghost h-36 row-start-2 w-full h-full rounded z-0 focus:shadow-inner shadow shadow-black ${ activeNote === `${notes[n]}${o + octave}` && 'btn-pushed'}`}></button>
                            </Fragment>
                        )
                    })
                })
            }
            { octaves && <button {...events } data-note={ `C${octave + octaves}` } className={`key btn btn-active btn-ghost h-36 row-start-2 w-full h-full rounded z-0 focus:shadow-inner shadow shadow-black ${ activeNote === `C${octave + octaves}` && 'btn-pushed'}`}></button> }
        </div>
    )
}

export default Keyboard