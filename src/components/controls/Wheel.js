import { useCallback, useEffect, useRef, useState } from "react";

import wheel from "../../assets/wheel.png";

const Wheel = ({defaultValue = 50, minValue = 0, maxValue = 100, step = 1, autoReturn = false, label, onChange}) => {
    const [ value, setValue ] = useState(defaultValue ? defaultValue : (maxValue - minValue) / 2 );
    const wheelRef = useRef(null);

    const handleValue = (e) => {
        setValue(e.target.value);
    }

    const resetValue = useCallback( () => {        
        setValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        // onChange(value)
    }, [value, onChange])

    useEffect(() => {
        if(!autoReturn) return;
        
        const currentWheel = wheelRef.current;
        currentWheel.addEventListener("mouseup", resetValue);        
        currentWheel.addEventListener("mouseleave", resetValue);     
        currentWheel.addEventListener("touchend", resetValue); 

        return () => {
            currentWheel.removeEventListener("mouseup", resetValue);        
            currentWheel.removeEventListener("mouseleave", resetValue);           
            currentWheel.removeEventListener("touchstart", resetValue);
        }
    }, [autoReturn, resetValue])

    useEffect(() => {
        const currentWheel = wheelRef.current;

        currentWheel.addEventListener("change", handleValue)        
        currentWheel.addEventListener("input", handleValue)

        return () => {
            currentWheel.removeEventListener("change", handleValue)        
            currentWheel.removeEventListener("input", handleValue)
        }
    }, [])


    return (
        <span className="flex flex-col items-center justify-center -mr-8 -mt-6">
            { label && <label className="text-secondary text-xs uppercase font-bold" htmlFor={label}>{label}</label> }
            <input 
                ref={wheelRef} 
                type="range"
                className="input-slider rotate-180"
                data-src={ wheel }
                data-width="60"
                data-height="120"
                data-sprites="127"
                value={ value }
                min={minValue}
                max={maxValue}
                step={step}
                onChange={handleValue}
            />
        </span>
    )
}

export default Wheel;