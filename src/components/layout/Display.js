import { BsCaretDownFill, BsCaretUpFill, BsFillCircleFill, BsFillPauseFill, BsPlayFill } from "react-icons/bs";
import { useEffect, useState } from "react";

import Message from "../screens/Message";
import { messages } from "../../config/display";
import { useSequencer } from "../../hooks/useSequencer";

const Display = ({ children, bank, octave, devices, midi }) => {
    const isPlaying = false;
    const { input, output, passthrough } = devices;
    const { tempo } = useSequencer();
    const [ message, setMessage ] = useState(null);
    const [ bpmIndicator, setBpmIndicator ] = useState(0)

    useEffect(() => {
        if(!midi) return setMessage(messages["midi"]);
        else if(!input || !output) return setMessage(messages["nodevice"]);
        else if(passthrough){
            setMessage(messages["newdevice"]);
            return setTimeout(() => setMessage(null), 5000)
        }else setMessage(null)

    }, [midi, input, output, passthrough])

    useEffect(() => {
        let interval;
        console.log((60/tempo)/2 )
        interval = setInterval(() => setBpmIndicator(b => !b), (60000/tempo)/2 );
        return () => clearInterval(interval);
    })

    return (
        <section className="sticky md:relative flex flex-col gap-4 flex-1 h-full min-h-[235px] mx-4 my-2">
            <div  className="relative flex-1 bg-neutral bg-grid font-sevenSegment text-xl rounded text-accent outline outline-base-100 outline-offset-2 outline-2">
                {
                    message ? <Message message={ message }/> :
                        <>                
                            <div className="flex flex-1 justify-between absolute top-0 left-0 w-full bg-transparent px-2">
                                <div className="text-center">Bank {bank < 10 && 0 }{bank}</div>                       
                                <div className="text-center">Octave {octave} </div>
                                <div className={`text-center relative before:absolute before:bg-accent before:rounded-full before:top-3 before:-left-3 before:w-2 before:h-2 ${ bpmIndicator ? 'before:opacity-1': 'before:opacity-0'}`}>{tempo} BPM</div>
                            </div>
                            { children }                            
                            <nav className="grid grid-cols-4 gap-4 absolute bottom-0 left-0 w-full bg-transparent font-sevenSegment text-sm px-2">
                                <span className="text-center">Test</span>
                                <span className="text-center">Test</span>
                                <span className="text-center">Test</span>
                                <span className="text-center">Test</span>
                            </nav>                        
                        </>
                }
            </div>
            <div className="grid grid-cols-4 gap-4 justify-between">
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs"> <BsCaretUpFill className="h-4 w-4" /> </button>
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs"> <BsCaretDownFill className="h-4 w-4" /> </button>
                <button className="btn btn-outline btn-accent btn-xs"> <BsFillCircleFill className="h-2 w-2" /> </button>
                <button className={`btn btn-ghost btn-pushable border-secondary text-secondary btn-xs ${isPlaying && "btn-pushed"}`}> { isPlaying ? <BsFillPauseFill className="h-4 w-4"/> : <BsPlayFill className="h-4 w-4" />} </button>
            </div>
        </section>
    )
}

export default Display;