import { BsCaretDownFill, BsCaretUpFill, BsDash, BsFillCircleFill, BsFillPauseFill, BsPlayFill, BsPlus } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";

import Message from "../screens/Message";
import Sequencer from "../screens/Sequencer";
import { messages } from "../../config/display";
import { useMidi } from "../../hooks/useMidi";
import { useNTS } from "../../hooks/useNTS";
import { useSequencer } from "../../hooks/useSequencer";

const Display = () => {   
    const { enabled, input, output, passthrough, octave, playNote, stopAll } = useMidi();
    const { bank, bankNames, setBank } = useNTS();
    const { step, steps, setStep, bars, setBars, isPlaying, setIsPlaying, isRecording, setIsRecording, tempo, sequence, setSequence, barLength } = useSequencer();
    const [ message, setMessage ] = useState(null);
    const [ bpmIndicator, setBpmIndicator ] = useState(1)

    const handleUp = () => {       
        window.navigator.vibrate && window.navigator.vibrate(step > 0 ? 10 : 50);
        if(step > 0) setStep(s => s-1);
        else setStep(steps - 1);
    }

    const handleDown = () => {        
        window.navigator.vibrate && window.navigator.vibrate(10);
        if(step < steps - 1) setStep(s => s+1);
        else setStep(0);
    }
    
    const addBar = () => {        
        window.navigator.vibrate && window.navigator.vibrate(10);
        setBars(b => b + 1);
    }
    
    const removeBar = () => {       
        window.navigator.vibrate && window.navigator.vibrate(step > 0 ? 10 : 50);
        bars > 1 && setBars(b => b - 1);
    }
    
    const playStep = useCallback((step) => {
        let duration = step.length * 60000/tempo;

        if(!step?.note) return;
        if(!isNaN(step?.bank)) setBank(step.bank);

        playNote(step.note, true, false, duration);
    }, [bank, playNote, tempo])    
    
    const togglePlay = () => {        
        window.navigator.vibrate && window.navigator.vibrate(10);
        
        if(isPlaying) setBank(step.bank);
        setIsPlaying(p => !p);
    }

    const toggleRecording = () => {      
        window.navigator.vibrate && window.navigator.vibrate(10);
        setIsRecording(r => !r)
    }

    const setScreenMessage = (message, timed) => {
        setMessage(message);
        if(timed) return setTimeout(() => setMessage(null), 5000)
    }

    useEffect(() => {
        if(!enabled) return setMessage(messages["midi"]);
        else if(!input || !output) return setMessage(messages["nodevice"]);
        else if(passthrough) setScreenMessage(messages["newdevice"], true);
        else setMessage(null);

    }, [enabled, input, output, passthrough])

    useEffect(() => {
        let interval;
        interval = setInterval(() => setBpmIndicator(b => !b), (60000/tempo)/2 );
        return () => clearInterval(interval);
    }, [tempo]);

    useEffect(() => {
        if(!isPlaying) return 
        if(!sequence?.[step]?.note) return;
        playStep(sequence?.[step]);
    }, [isPlaying, playStep, step, sequence, stopAll])

    return (
        <section className="sticky md:relative flex flex-col gap-4 flex-1 h-full min-h-[235px] mx-4 my-2">
            <div  className="flex flex-col flex-1 justify-between bg-neutral bg-grid font-sevenSegment text-xl rounded text-accent outline outline-base-100 outline-offset-2 outline-2 mt-2">                            
                <div className="grid grid-cols-3 w-full bg-transparent px-2">
                    <div className="text-left truncate">{bankNames?.[bank] ? bankNames?.[bank] : `Bank ${bank < 10 ? 0 :'' }${bank}`}</div>                       
                    <div className="text-center">Octave {octave} </div>
                    <div className={`text-right relative before:inline-block before:bg-accent before:rounded-full before:mb-0.5 before:mr-1 before:w-2 before:h-2 ${ bpmIndicator ? 'before:opacity-1': 'before:opacity-0'}`}>{tempo} BPM</div>
                </div>
                {
                    message ? 
                        <Message message={message} /> : 
                        <Sequencer 
                            step={step} 
                            setStep={setStep} 
                            steps={steps}
                            banks={bankNames} 
                            sequence={sequence} 
                            setSequence={setSequence}
                            barLength={barLength}
                        />
                }
            </div>
            <div className="grid grid-cols-8 gap-4 justify-between">
                <div className="flex col-span-2 gap-1">
                    <button onClick={handleUp} aria-label="Up" className="flex-1 btn btn-ghost btn-pushable border-secondary text-secondary btn-xs"> <BsCaretUpFill className="h-4 w-4" /> </button>
                    <button onClick={handleDown} aria-label="Down" className="flex-1 btn btn-ghost btn-pushable border-secondary text-secondary btn-xs"> <BsCaretDownFill className="h-4 w-4" /> </button>
                </div>
                <div className="flex col-span-2 gap-1">
                    <button onClick={removeBar} aria-label="Add bar" className="flex-1 btn btn-ghost btn-pushable border-secondary text-secondary btn-xs"> <BsDash className="h-4 w-4" /> </button>
                    <button onClick={addBar} aria-label="Remove bar" className="flex-1 btn btn-ghost btn-pushable border-secondary text-secondary btn-xs"> <BsPlus className="h-4 w-4" /> </button>
                </div>
                <button onClick={toggleRecording} aria-label="Toggle Record" className={`col-span-2 btn btn-outline btn-accent btn-xs ${isRecording ? "animate-blink" : ""}`}> <BsFillCircleFill className="h-2 w-2" /> </button>
                <button onClick={togglePlay} aria-label="Play/Pause" className={`col-span-2 btn btn-ghost btn-pushable border-secondary text-secondary btn-xs ${isPlaying ? "btn-pushed" : ""}`}> { isPlaying ? <BsFillPauseFill className="h-4 w-4"/> : <BsPlayFill className="h-4 w-4" />} </button>
            </div>
        </section>
    )
}

export default Display;