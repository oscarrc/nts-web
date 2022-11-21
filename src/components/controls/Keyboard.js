import { Fragment, useEffect, useRef, useState } from "react"

import { octaveLayout } from "../../config/layout";
import { useLayout } from "../../hooks/useLayout"
import { useMidi } from "../../hooks/useMidi";
import { useSequencer } from "../../hooks/useSequencer";

const Keyboard = () => {
    const { breakpoint } = useLayout();
    const { playNote, octave, input, passthrough } = useMidi();
    const { isRecording, stepStart, stepEnd } = useSequencer();
    const [ octaves, setOctaves ] = useState( octaveLayout[breakpoint] );
    const [ activeNote, setActiveNote ] = useState(null);

    const keyboardRef = useRef(null);
    const notes = ["C", "D", "E", "F", "G", "A", "B"]

    const onPlayStart = (e) => {
        window.navigator.vibrate && window.navigator.vibrate(10);
        isRecording && stepStart(e.target.dataset.note, 0);
        playNote(e.target.dataset.note);
    }

    const onPlayEnd = (e) => {
        isRecording && stepEnd();
        playNote(e.target.dataset.note, false);
        e.target.blur();
    }

    const setNote = (e) => {
        const note = `${e.note._name}${!!e.note._accidental ? e.note._accidental : ""}${e.note._octave}`
        if(e.type === "noteon") setActiveNote(note)
        else setActiveNote(false)
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
        <div ref={keyboardRef} className="flex-1 grid relative overflow-hidden auto-cols-auto grid-rows-2 gap-x-1 grid-flow-col h-56 -mt-20"> 
            {
                [...Array(octaves).keys()].map((o) => {
                    return [...Array(7).keys()].map((n) => {
                        return (
                            <Fragment key={`${o}${n}`}>
                                { [1,2,4,5,6].includes(n + 1) && <button {...events } aria-label={ `${notes[n]}#${o + octave}`} data-note={ `${notes[n]}#${o + octave}`} className={`key relative btn btn-secondary row-start-1 top-3/4 w-3/4 left-2/3 h-3/4 rounded z-10 focus:shadow-inner shadow shadow-black ${ activeNote === `${notes[n]}#${o + octave}` && 'btn-pushed'}`}></button> }
                                <button aria-label={`${notes[n]}${o + octave}`} {...events } data-note={ `${notes[n]}${o + octave}` } className={`key btn btn-active btn-ghost row-start-2 w-full h-full rounded z-0 focus:shadow-inner shadow shadow-black ${ activeNote === `${notes[n]}${o + octave}` && 'btn-pushed'}`}></button>
                            </Fragment>
                        )
                    })
                })
            }
            { octaves && <button aria-label={ `C${octave + octaves}` } {...events } data-note={ `C${octave + octaves}` } className={`key btn btn-active btn-ghost row-start-2 w-full h-full rounded z-0 focus:shadow-inner shadow shadow-black ${ activeNote === `C${octave + octaves}` && 'btn-pushed'}`}></button> }
        </div>
    )
}

export default Keyboard