import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { useEffect, useState } from "react";

const SeqInput = (value, options, min, max, onChange) => {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        max && currentValue > max && setCurrentValue(max);
        min && currentValue < min && setCurrentValue(min);
        options && !options[currentValue] && setCurrentValue(value);
        onChange && onChange(currentValue)
    }, [min, max, options, currentValue, value, onChange])

    return (
        <div className="flex w-full group">
            <input 
                type="text"
                min={min || 0}
                max={ max || 0} 
                className="flex-1 text-center bg-transparent font-sevenSegment text-xl px-0 input-sm w-full focus:border-none border-none focus:ring-0 outline-none" 
                value={ currentValue ? (options.length ? options[currentValue] : currentValue) : '' } 
                onChange={ onChange }
            />
            <div className="flex flex-col invisible group-hover:visible items-center">
                <button className="flex-1 mx-1" onClick={() => setCurrentValue(v => v + 1) }>
                    <BsCaretUpFill className="h-3 w-3" />
                </button>
                <button className="flex-1 mx-1"  onClick={() => setCurrentValue(v => v - 1) }>
                    <BsCaretDownFill className="h-3 w-3" />
                </button>
            </div>
        </div>
    )
}

export default SeqInput;