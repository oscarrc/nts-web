import { BsCaretDownFill, BsCaretUpFill, BsFillCircleFill, BsFillPauseFill, BsPlayFill } from "react-icons/bs";
import { useEffect, useState } from "react";

import Message from "../screens/Message";
import Sequencer from "../screens/Sequencer";
import { messages } from "../../config/display";
import { useMidi } from "../../hooks/useMidi";
import { useNTS } from "../../hooks/useNTS";
import { useSequencer } from "../../hooks/useSequencer";

const Display = ({mode, setMode}) => {
    const isPlaying = false;    
    const { enabled, input, output, passthrough, octave } = useMidi();
    const { bank } = useNTS();
    const { tempo, step, setStep } = useSequencer();
    const [ message, setMessage ] = useState(null);
    const [ bpmIndicator, setBpmIndicator ] = useState(0)

    useEffect(() => {
        if(!enabled) return setMessage(messages["midi"]);
        else if(!input || !output) return setMessage(messages["nodevice"]);
        else if(passthrough){
            setMessage(messages["newdevice"]);
            return setTimeout(() => setMessage(null), 5000)
        }else setMessage(null)

    }, [enabled, input, output, passthrough])

    useEffect(() => {
        let interval;
        interval = setInterval(() => setBpmIndicator(b => !b), (60000/tempo)/2 );
        return () => clearInterval(interval);
    }, [tempo])

    const handleUp = () => {       
        window.navigator.vibrate && window.navigator.vibrate(step > 0 ? 10 : 50);
        step > 0 && setStep(s => s-1);
    }

    const handleDown = () => {        
        window.navigator.vibrate && window.navigator.vibrate(10);
        setStep(s => s+1);
    }

    const togglePlay = () => {        
        window.navigator.vibrate && window.navigator.vibrate(10);
    }

    const toggleRecording = () => {      
        window.navigator.vibrate && window.navigator.vibrate(10);
    }

    return (
        <section className="sticky md:relative flex flex-col gap-4 flex-1 h-full min-h-[235px] mx-4 my-2">
            <div  className="flex flex-col flex-1 justify-between bg-neutral bg-grid font-sevenSegment text-xl rounded text-accent outline outline-base-100 outline-offset-2 outline-2 mt-2">                            
                <div className="flex justify-between w-full bg-transparent px-2">
                    <div className="text-center">Bank {bank < 10 && 0 }{bank}</div>                       
                    <div className="text-center">Octave {octave} </div>
                    <div className={`text-center relative before:absolute before:bg-accent before:rounded-full before:top-3 before:-left-3 before:w-2 before:h-2 ${ bpmIndicator ? 'before:opacity-1': 'before:opacity-0'}`}>{tempo} BPM</div>
                </div>
                {
                    !message ? <Message message={message} /> : <Sequencer step={step} />
                }
            </div>
            <div className="grid grid-cols-4 gap-4 justify-between">
                <button onClick={handleUp} aria-label="Up" className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs"> <BsCaretUpFill className="h-4 w-4" /> </button>
                <button onClick={handleDown} aria-label="Down" className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs"> <BsCaretDownFill className="h-4 w-4" /> </button>
                <button onClick={togglePlay} aria-label="Toggle Record" className="btn btn-outline btn-accent btn-xs"> <BsFillCircleFill className="h-2 w-2" /> </button>
                <button onClick={toggleRecording} aria-label="Play/Pause" className={`btn btn-ghost btn-pushable border-secondary text-secondary btn-xs ${isPlaying && "btn-pushed"}`}> { isPlaying ? <BsFillPauseFill className="h-4 w-4"/> : <BsPlayFill className="h-4 w-4" />} </button>
            </div>
        </section>
    )
}

export default Display;