import { useEffect, useState } from "react";

import { BsCaretRightFill } from "react-icons/bs";

const Sequencer = ({step, setStep}) => {
    const [ stepCount, setStepCount] = useState(16);

    useEffect(() => {
        step === stepCount - 1 && setStepCount(c => c + 16);
        document.getElementById(`step-${step}`).scrollIntoView({block: "nearest", inline: "nearest", behavior: "smooth"});
    }, [step, stepCount])

    return (
        <div className="sequencer w-full relative flex-1 px-2 max-h-[180px] overflow-y-scroll">
            { [...Array(stepCount).keys()].map(k => (
                <div onClick={() => setStep(k)} id={`step-${k}`} key={k} className={`grid grid-cols-4 ${ k < stepCount - 1 && 'border-b'} border-accent cursor-pointer`}>
                    <div className="flex items-center">{k === step && <BsCaretRightFill className="h-3 w-3 inline"/>} {k < 10 && '0'}{k}</div>
                    <div>C4</div>
                    <div className="text-center">2</div>
                    <div className="text-right">Bank 00</div>
                </div>
            )) }
        </div>
    )
}

export default Sequencer;