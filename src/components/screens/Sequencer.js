import { BsCaretRightFill } from "react-icons/bs";
import SeqInput from "../controls/SeqInput";
import { useEffect } from "react";

const Sequencer = ({step, setStep, steps, setSteps, sequence, setSequence, banks, barLength }) => {
    useEffect(() => {
        document.getElementById(`step-${step}`).scrollIntoView({block: "nearest", inline: "nearest", behavior: "smooth"});
    }, [setSteps, step, steps])

    return (
        <div className="sequencer w-full relative flex-1 px-2 max-h-[180px] overflow-y-scroll">
            { [...Array(steps).keys()].map(k => (
                <div onClick={() => setStep(k)} id={`step-${k}`} key={k} className={`grid grid-cols-4 ${ k < steps - 1 && ((k + 1) % barLength === 0 ? 'border-b-4' : 'border-b')} border-accent cursor-pointer`}>
                    <div className="flex items-center">{k === step && <BsCaretRightFill className="h-3 w-3 inline"/>} {k < 10 && '0'}{k}</div>
                    <div>{ sequence?.[k]?.note || "---" }</div>
                    <SeqInput 
                        className="text-center"
                        label="Duration"
                        value={ sequence?.[k]?.length } 
                        min={1} 
                        max={steps - 1 } 
                        onChange={ (v) => setSequence( s => ({...s, [k]: { ...s[k], length: parseInt(v) }}) ) }
                    />
                    <SeqInput 
                        className="text-right"
                        label="Bank"
                        value={ sequence?.[k]?.bank } 
                        min={ 0 } 
                        max={ 15 }
                        options={ banks }
                        onChange={ (v) => setSequence( s => ({...s, [k]: { ...s[k], bank: parseInt(v) }}) ) }
                    />
                </div>
            )) }
        </div>
    )
}

export default Sequencer;