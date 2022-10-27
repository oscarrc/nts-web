import { SlArrowDown } from "react-icons/sl";
import switchButton from "../../assets/switch.png";
import { useState } from "react";

const Dropdown = ({ label, defaultSelection, options, switchValue, onChange }) => {
    const [ selected, setSelected ] = useState(defaultSelection);

    const handleSelection = (i) => {
        document.activeElement.blur()
        setSelected(i)
        //options?.[i] && onChange(options?.[i])
    }

    return (
        <div className={`input-select flex flex-1 px-4 items-center gap-4 ${!switchValue && 'py-1.5'}`}>
            { label && <label className="text-secondary text-xs uppercase font-bold" htmlFor={label}>{label}</label> }
            { switchValue && <input type="checkbox" className="input-switch" data-diameter="60" data-src={ switchButton } /> }
            <div className="group dropdown flex-1 my-2">                
                <button type="button" tabIndex="0" className={`relative text-left cursor-pointer bg-grid px-2 py-1 w-full font-dotMatrix rounded text-accent outline outline-base-100 outline-offset-2 outline-1 hover:outline-accent focus:outline-accent`}>
                    { options ? options?.[selected].label : "No option" }
                    <SlArrowDown className="text-accent absolute top-2 right-2 h-4 w-4" />
                </button>
                <ul tabIndex="0" className="mt-2 dropdown-content menu shadow-lg bg-neutral text-secondary rounded w-full">
                    {   
                        options?.map((option, index) => {
                            return <li key={ index } onClick={ () => handleSelection(index) } className="px-2 py-1 cursor-pointer hover:bg-base-100">{ option.label }</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Dropdown;