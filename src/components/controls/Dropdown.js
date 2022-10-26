import { SlArrowDown } from "react-icons/sl";

const Dropdown = ({ label }) => {
    return (
        <div className="input-select flex items-center gap-4">
            { label && <label className="text-secondary text-xs uppercase font-bold" htmlFor={label}>{label}</label> }
            <div className="dropdown flex-1 my-2 min-w-[14rem]">                
                <button type="button" tabindex="0" className={`relative text-left cursor-pointer bg-grid px-2 py-1 w-full font-dotMatrix rounded text-accent outline outline-base-100 outline-offset-2 outline-1 hover:outline-accent focus:outline-accent`}>
                    TEST
                    <SlArrowDown className="text-accent absolute top-2 right-2 h-4 w-4" />
                </button>
                <ul tabindex="0" class="mt-2 dropdown-content menu shadow-lg bg-neutral text-secondary rounded w-full">
                    <li className="px-2 py-1 cursor-pointer hover:bg-base-100">Item 1</li>
                    <li className="px-2 py-1 cursor-pointer hover:bg-base-100">Item 2</li>
                </ul>
            </div>
        </div>
    )
}

export default Dropdown;