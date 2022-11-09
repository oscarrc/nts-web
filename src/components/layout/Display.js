import { BsCaretDownFill, BsCaretUpFill, BsFillCircleFill, BsFillPauseFill, BsPlayFill } from "react-icons/bs";
import { Suspense, lazy, useEffect, useState } from "react";

import { messages } from "../../config/display";
import { useMidi } from "../../hooks/useMidi";
import { useNTS } from "../../hooks/useNTS";
import { useSequencer } from "../../hooks/useSequencer";

const Display = ({ screen }) => {
    const isPlaying = false;    
    const { enabled, input, output, passthrough, octave } = useMidi();
    const { bank, setBank } = useNTS();
    const { tempo } = useSequencer();
    const [ message, setMessage ] = useState(null);
    const [ bpmIndicator, setBpmIndicator ] = useState(0)

    const renderScreen = (bank) => {
        let Screen = () => { return (<div className="flex-1"></div>) }
        let props = {};

        switch (screen){
            case "bank":
                Screen = lazy(() => import('../screens/Bank'));
                props = { bank, setBank }
                break;
            default:
                Screen = lazy(() => import('../screens/Message'));
                props = { message }
                break;
        }

        return <Screen {...props} />
    }

    useEffect(() => {
        if(!enabled) return setMessage(messages["midi"]);
        else if(!input || !output) return setMessage(messages["nodevice"]);
        else if(passthrough){
            setMessage(messages["newdevice"]);
            return setTimeout(() => setMessage(null), 5000)
        }else setMessage(null)

    }, [enabled, input, output, passthrough])

    useEffect(() => { // TODO: this makes screen flicker
        let interval;
        interval = setInterval(() => setBpmIndicator(b => !b), (60000/tempo)/2 );
        return () => clearInterval(interval);
    }, [tempo])

    return (
        <section className="sticky md:relative flex flex-col gap-4 flex-1 h-full min-h-[235px] mx-4 my-2">
            <div  className="flex flex-col flex-1 bg-neutral bg-grid font-sevenSegment text-xl rounded text-accent outline outline-base-100 outline-offset-2 outline-2">                            
                <div className="flex justify-between w-full bg-transparent px-2 border-b border-accent">
                    <div className="text-center">Bank {bank < 10 && 0 }{bank}</div>                       
                    <div className="text-center">Octave {octave} </div>
                    <div className={`text-center relative before:absolute before:bg-accent before:rounded-full before:top-3 before:-left-3 before:w-2 before:h-2 ${ bpmIndicator ? 'before:opacity-1': 'before:opacity-0'}`}>{tempo} BPM</div>
                </div>
                <Suspense fallback={<div className="flex-1"></div>}>
                    { renderScreen(bank) }
                </Suspense>
                <nav className="grid grid-cols-4 gap-4 w-full bg-transparent font-sevenSegment text-sm px-2 border-t border-accent">
                    <span className="text-center">Test</span>
                    <span className="text-center">Test</span>
                    <span className="text-center">Test</span>
                    <span className="text-center">Test</span>
                </nav>
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