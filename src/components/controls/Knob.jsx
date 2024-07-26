import { useCallback, useEffect, useRef, useState } from "react";

import knob from "../../assets/knob.png";

const Knob = ({id, value = 0, min = 0, max = 127, step = 1, label, onChange}) => {
    const [ currentValue, setValue ] = useState(value ? value : min);
    const knobRef = useRef(null);

    const handleValue = useCallback((e) => {
        setValue(e.target.value);
        onChange && onChange(parseInt(e.target.value));
    }, [onChange])

    useEffect(() => setValue(value), [value]);
    
    useEffect(() => {
        const currentKnob = knobRef.current;

        currentKnob.addEventListener("change", handleValue)        
        currentKnob.addEventListener("input", handleValue)

        return () => {
            currentKnob.removeEventListener("change", handleValue)        
            currentKnob.removeEventListener("input", handleValue)
        }
    }, [handleValue])

    return (
        <div className="flex flex-col items-center justify-center">
            { label && <label className="text-secondary text-xs uppercase font-bold" htmlFor={id}>{label}</label> }
            <div className="flex-1">
                <input 
                    {...(label ? {id: id} : {"aria-label": id}) }
                    ref={knobRef}
                    type="range"
                    name={label}
                    className="input-knob focus-visible:ring-offset-0"
                    data-src={ knob }
                    data-sprites="100"
                    diameter="90" 
                    value={ currentValue }
                    min={ min }
                    max={ max }
                    step={ step }
                    onChange={ handleValue }
                />
            </div>
            <div className="bg-neutral bg-grid font-sevenSegment h-4 w-8 text-xs text-center rounded text-accent outline outline-base-100 outline-offset-1 outline-1">{ value }</div>
        </div>
    )
}

export default Knob;