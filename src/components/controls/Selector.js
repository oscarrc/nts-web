import { useCallback, useEffect, useRef, useState } from "react";

import selector from "../../assets/selector.png";

const Selector = ({value = 0, options, label, onChange, display}) => {
    const [ currentValue, setValue ] = useState(value ? value : 0);
    const [ maxValue, setMaxValue ] = useState(options?.length - 1 || 0);
    const selectorRef = useRef(null);
    
    const handleValue = useCallback((e) => {
        if (window.navigator.vibrate) window.navigator.vibrate(200);
        setValue(e.target.value);
        onChange && onChange(parseInt(e.target.value));
    }, [onChange])

    useEffect(() => setValue(value), [value]);
    useEffect(() => setMaxValue(options?.length - 1 || 0), [options]);

    useEffect(() => {
        const currentKnob = selectorRef.current;

        currentKnob.addEventListener("change", handleValue)        
        currentKnob.addEventListener("input", handleValue)

        return () => {
            currentKnob.removeEventListener("change", handleValue)        
            currentKnob.removeEventListener("input", handleValue)
        }
    }, [handleValue])

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
                    min={ 0 }
                    max={ maxValue }
                    step="1"
                    onChange={ handleValue }
                />
            </div>
            { display && <div className="bg-neutral bg-grid font-sevenSegment h-4 w-16 overflow-hidden text-xs text-center rounded text-accent outline outline-base-100 outline-offset-1 outline-1">{ display }</div>}
        </div>
    )
}

export default Selector;