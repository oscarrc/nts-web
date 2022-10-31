import { useCallback, useEffect, useRef } from "react";

import switchButton from "../../assets/switch.png";

const Switch = ({ isActive = false, isMomentary = false, label, inline, onChange }) => {
   
    const switchRef = useRef(null);

    const toggle = useCallback(() => {
        switchRef.current.checked = !switchRef.current.checked;
        onChange && onChange(switchRef.current.checked);
    }, [onChange])

    const handleValue = (e) => {
        !isMomentary && onChange(e.target.checked);
    }

    useEffect(() => {
        if(!isMomentary) return;
        const currentSwitch = switchRef.current;
        currentSwitch.addEventListener("mousedown", toggle);
        currentSwitch.addEventListener("mouseup", toggle);
        currentSwitch.addEventListener("touchstart", toggle);        
        currentSwitch.addEventListener("touchend", toggle);

        return () => {
            currentSwitch.removeEventListener("mousedown", toggle);
            currentSwitch.removeEventListener("mouseup", toggle);
            currentSwitch.removeEventListener("touchstart", toggle);        
            currentSwitch.removeEventListener("touchend", toggle);
        }
    }, [isMomentary, toggle])

    return (
        <div className={`flex items-center justify-center ${inline ? 'flex-row' : "flex-col-reverse"}`}>
            { label && <label className="text-secondary text-xs uppercase font-bold" htmlFor={label}>{label}</label> }
            <div className="flex-1">
                <input 
                    ref={switchRef}
                    type="checkbox"
                    className="input-switch"
                    data-diameter="60"
                    data-src={ switchButton }
                    checked={ isActive }
                    onChange={ handleValue }
                />
            </div>
        </div>
    )
}

export default Switch;