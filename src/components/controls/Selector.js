import { useEffect, useRef, useState } from "react";

import selector from "../../assets/selector.png";

const Selector = ({value = 0, options, label, onChange}) => {
    const [ currentValue, setValue ] = useState(value ? value : 0);
    const selectorRef = useRef(null);
    
    const handleValue = (e) => {
        setValue(e.target.value);
        onChange && onChange(e.target.value);
    }

    useEffect(() => setValue(value), [value]);

    useEffect(() => {
        const currentKnob = selectorRef.current;

        currentKnob.addEventListener("change", handleValue)        
        currentKnob.addEventListener("input", handleValue)

        return () => {
            currentKnob.removeEventListener("change", handleValue)        
            currentKnob.removeEventListener("input", handleValue)
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center self-start">
            { label && <label className="text-secondary text-xs uppercase font-bold" htmlFor={label}>{label}</label> }
            <div className="flex-1">
                <input 
                    ref={selectorRef}
                    type="range"
                    name={label}
                    className="input-knob focus-visible:ring-offset-0"
                    data-src={ selector }
                    data-sprites="23"
                    diameter="90" 
                    value={ currentValue }
                    min="0"
                    max={ options?.length - 1 || 0}
                    step="1"
                    onChange={ handleValue }
                />
            </div>
        </div>
    )
}

export default Selector;