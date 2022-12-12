import { useCallback, useEffect, useRef, useState } from "react";

import wheel from "../../assets/wheel.png";

const Wheel = ({id, defaultValue = 50, min = 0, max = 100, step = 1, autoReturn = false, label, onChange}) => {
    const [ value, setValue ] = useState(defaultValue ? defaultValue : (max - min) / 2 );
    const wheelRef = useRef(null);

    const handleValue = useCallback((e) => {
        if (window.navigator.vibrate) window.navigator.vibrate(5);
        setValue(e.target.value);
        onChange(e.target.value);
    }, [onChange])

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
    }, [handleValue])


    return (
        <span className="flex flex-col items-center justify-center -mr-8 -mt-4">
            { label && <label className="text-secondary text-xs uppercase font-bold" htmlFor={id}>{label}</label> }
            <input 
                {...(label ? {id: id} : {"aria-label": id}) }
                ref={wheelRef} 
                type="range"
                className="input-slider rotate-180"
                data-src={ wheel }
                data-width="60"
                data-height="120"
                data-sprites="127"
                value={ value }
                min={min}
                max={max}
                step={step}
                onChange={handleValue}
            />
        </span>
    )
}

export default Wheel;