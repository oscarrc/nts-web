import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

const SeqInput = ({label, value, options, min, max, onChange, className}) => {
    const handleValue = (value) => {
        if(isNaN(value)) value = min;
        if(!isNaN(min) && parseInt(value) < min ) value = min;
        if(!isNaN(max) && parseInt(value) > max) value = max;
        
        onChange && onChange(value);
    }
    
    return (
        <div className="flex w-full group gap-1">
            <input 
                aria-label={label}
                type="text"
                min={min}
                max={max} 
                className={`flex-1 bg-transparent font-sevenSegment text-xl px-0 input-sm w-full focus:border-none border-none focus:ring-0 outline-none ${className}`} 
                value={ !isNaN(value) ? ( options ? (options[value] || `${label} ${value}`) : value) : '---' } 
                onChange={ (e) => handleValue(e.target.value) }
                disabled={options}
            />
            <div className="flex flex-col invisible group-hover:visible items-center">
                <button aria-label={`increment ${label}`} className="flex-1" onClick={() => handleValue(value + 1) }>
                    <BsCaretUpFill className="h-3 w-3" />
                </button>
                <button aria-label={`decrement ${label}`} className="flex-1"  onClick={() => handleValue(value - 1) }>
                    <BsCaretDownFill className="h-3 w-3" />
                </button>
            </div>
        </div>
    )
}

export default SeqInput;