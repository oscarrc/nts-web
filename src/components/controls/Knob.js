import { useEffect, useRef, useState } from "react";

import knob from "../../assets/knob.png";

const Knob = ({defaultValue = 0, minValue = 0, maxValue = 100, step = 1, label, onChange}) => {
    const [ value, setValue ] = useState(defaultValue ? defaultValue : minValue);
    const knobRef = useRef(null);

    const handleValue = (e) => {
        setValue(e.target.value);
        // onChange(e.value);
    }

    useEffect(() => {
        const currentKnob = knobRef.current;

        currentKnob.addEventListener("change", handleValue)        
        currentKnob.addEventListener("input", handleValue)

        return () => {
            currentKnob.removeEventListener("change", handleValue)        
            currentKnob.removeEventListener("input", handleValue)
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center">
            { label && <label className="text-secondary text-xs uppercase font-bold" htmlFor={label}>{label}</label> }
            <div className="flex-1">
                <input 
                    ref={knobRef}
                    type="range"
                    name={label}
                    className="input-knob focus-visible:ring-offset-0"
                    data-src={ knob }
                    data-sprites="100"
                    diameter="90" 
                    value={ value }
                    min={ minValue }
                    max={ maxValue }
                    step={ step }
                    onChange={ handleValue }
                />
            </div>
            <div className="bg-neutral bg-grid text-dotMatrix h-4 w-8 text-xs text-center rounded text-accent outline outline-base-100 outline-offset-1 outline-1">{ value }</div>
        </div>
    )
}

export default Knob;