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
        <span className="flex flex-col items-center justify-center">
            { label && <label className="text-secondary text-xs uppercase font-bold" htmlFor={label}>{label}</label> }
            <input 
                ref={knobRef}
                type="range"
                name={label}
                className="input-knob focus-visible:ring-offset-0"
                data-src={ knob }
                data-sprites="100"
                diameter="60" 
                value={ value }
                min={ minValue }
                max={ maxValue }
                step={ step }
                onChange={ handleValue }
            />
        </span>
    )
}

export default Knob;