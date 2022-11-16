import { BsCaretRightFill } from "react-icons/bs";
import SeqInput from "../controls/SeqInput";
import { useEffect } from "react";

const Sequencer = ({step, setStep, steps, setSteps, sequence, banks}) => {
    useEffect(() => {
        // step === steps - 1 && setSteps(c => c + 16);
        document.getElementById(`step-${step}`).scrollIntoView({block: "nearest", inline: "nearest", behavior: "smooth"});
    }, [setSteps, step, steps])

    return (
        <div className="sequencer w-full relative flex-1 px-2 max-h-[180px] overflow-y-scroll">
            { [...Array(steps).keys()].map(k => (
                <div onClick={() => setStep(k)} id={`step-${k}`} key={k} className={`grid grid-cols-4 ${ k < steps - 1 && 'border-b'} border-accent cursor-pointer`}>
                    <div className="flex items-center">{k === step && <BsCaretRightFill className="h-3 w-3 inline"/>} {k < 10 && '0'}{k}</div>
                    <div>{ sequence?.[k]?.note || "---" }</div>
                    <SeqInput 
                        value={ sequence?.[k]?.length } 
                        min="1" 
                        max={steps.length - 1 } 
                    />
                    {/* <div>
                        <input 
                            type="number"
                            className="text-center bg-transparent font-sevenSegment text-xl px-0 input-sm w-full focus:border-none border-none focus:ring-0 outline-none" 
                            value={ sequence?.[k]?.length || 0 } 
                            min="1" 
                            max={steps.length - 1 } 
                            readonly
                        />
                    </div> */}
                    <div className="text-right truncate">{ !isNaN(sequence?.[k]?.bank) ? banks?.[sequence?.[k]?.bank] || `Bank ${sequence?.[k]?.bank}` : "---" }</div>
                </div>
            )) }
        </div>
    )
}

export default Sequencer;