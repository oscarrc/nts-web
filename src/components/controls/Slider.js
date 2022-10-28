import { useCallback, useEffect, useRef, useState } from "react";

const Slider = ({defaultValue = 50, minValue = 0, maxValue = 100, step = 1, autoReturn = false, label, onChange}) => {
    const [ value, setValue ] = useState(defaultValue ? defaultValue : (maxValue - minValue) / 2 );
    const SliderRef = useRef(null);

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
        if(!autoReturn) return;
        
        const currentSlider = SliderRef.current;
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
        const currentSlider = SliderRef.current;

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
                ref={SliderRef} 
                orientation="vertical"
                type="range"
                className="slider rounded bg-neutral bg-grid outline outline-base-100 outline-offset-1 outline-1"
                value={ value }
                min={minValue}
                max={maxValue}
                step={step}
                onChange={handleValue}
            />
        </span>
    )
}

export default Slider;