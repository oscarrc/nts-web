import { SlArrowDown } from "react-icons/sl";
import switchButton from "../../assets/switch.png";

const Dropdown = ({ id, label, value = 0, options, switchValue, isActive, onChange, onSwitch }) => {
    const handleSelection = (i) => {
        document.activeElement.blur()
        onChange && onChange(i)
    }
   
    return (
        <div className={`input-select flex flex-1 px-4 items-center gap-4 dropdown-control ${isNaN(switchValue) && 'py-1.5'}`}>
            { label && <label className="text-secondary text-xs uppercase font-bold" htmlFor={id}>{label}</label> }
            { !isNaN(switchValue) && 
                <input type="checkbox" 
                    {...(label ? {id: id} : {"aria-label": id}) }
                    name={label}
                    onChange={ (e) => onSwitch(e.target.checked) } 
                    checked={ isActive || false } 
                    className="input-switch" 
                    data-diameter="60" 
                    data-src={ switchButton } 
                /> 
            }
            <div className="group dropdown flex-1 my-2">                
                <button type="button" tabIndex="0" className={`relative text-left cursor-pointer bg-grid px-2 py-1 w-full font-sevenSegment  rounded text-accent outline outline-base-100 outline-offset-2 outline-1 hover:outline-accent focus:outline-accent`}>
                    { options?.length ? options?.[value] : "No option" }
                    <SlArrowDown className="text-accent absolute top-2 right-2 h-4 w-4" />
                </button>
                <ul tabIndex="0" className="mt-2 dropdown-content menu shadow-lg bg-neutral text-secondary rounded w-full max-h-[8rem] flex-row overflow-y-scroll">
                    {   
                        options?.map((option, index) => {
                            return <li key={ index } onClick={ () => handleSelection(index) } className="px-2 py-1 cursor-pointer hover:bg-base-100 w-full">{ option }</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Dropdown;