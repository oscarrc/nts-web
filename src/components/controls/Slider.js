import { useCallback, useEffect, useRef, useState } from "react";

const Slider = ({value = 50, min = 0, max = 100, step = 1, defaultValue = 0, autoReturn = false, label, onChange}) => {
    const [ currentValue, setValue ] = useState(value ? value : (max - min) / 2 );
    const sliderRef = useRef(null);

    const handleValue = useCallback((e) => {        
        if (window.navigator.vibrate) window.navigator.vibrate(100);
        setValue(e.target.value);
        onChange && onChange(e.target.value);
    },[onChange])

    const resetValue = useCallback( (e) => {
        setValue(defaultValue);
        onChange && onChange(defaultValue);
    }, [defaultValue, onChange]);

    useEffect(() => {
        setValue(value);
        onChange(value);
    }, [value, onChange])

    useEffect(() => {
        if(!autoReturn) return;
        
        const currentSlider = sliderRef.current;
        currentSlider.addEventListener("mouseup", resetValue);        
        currentSlider.addEventListener("mouseleave", resetValue);     
        currentSlider.addEventListener("touchend", resetValue);     
        currentSlider.addEventListener("touchcancel", resetValue);  

        return () => {
            currentSlider.removeEventListener("mouseup", resetValue);        
            currentSlider.removeEventListener("mouseleave", resetValue);           
            currentSlider.removeEventListener("touchstart", resetValue);     
            currentSlider.addEventListener("touchcancel", resetValue); 
        }
    }, [autoReturn, resetValue])

    useEffect(() => {
        const currentSlider = sliderRef.current;

        currentSlider.addEventListener("change", handleValue)        
        currentSlider.addEventListener("input", handleValue)

        return () => {
            currentSlider.removeEventListener("change", handleValue)        
            currentSlider.removeEventListener("input", handleValue)
        }
    }, [handleValue])


    return (
        <span className="slider-wrapper flex flex-col items-center justify-center">
            { label && <label className="text-secondary text-xs uppercase font-bold" htmlFor={label}>{label}</label> }
            <input 
                ref={sliderRef} 
                orientation="vertical"
                type="range"
                className="slider rounded bg-neutral bg-grid outline outline-base-100 outline-offset-1 outline-1"
                value={currentValue}
                min={min}
                max={max}
                step={step}
                onChange={handleValue}
            />
        </span>
    )
}

export default Slider;