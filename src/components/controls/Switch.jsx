import { useCallback, useEffect, useRef } from "react";

import switchButton from "../../assets/switch.png";

const Switch = ({ id, isActive = false, isMomentary = false, label, inline, onChange }) => {
   
    const switchRef = useRef(null);

    const toggle = useCallback((e) => {
        switchRef.current.checked = !switchRef.current.checked;
        onChange && ["mouseup","touchend"].includes(e.type) && onChange(switchRef.current.checked);
    }, [onChange])

    const handleValue = (e) => {
           onChange(e.target.checked);
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
        <div className={`switch-control flex items-center justify-center ${inline ? 'flex-row' : "flex-col-reverse"}`}>
            { label && <label className="text-secondary text-xs uppercase font-bold" htmlFor={id}>{label}</label> }
            <div className="flex-1">
                <input 
                    {...(label ? {id: id} : {"aria-label": id}) }
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