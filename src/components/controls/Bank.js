import {useEffect, useRef, useState} from "react";

const Bank = ({index, name, selected, onClick, onRename}) => {
    const [dropdown, setDropdown] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false)
    const dropdownRef = useRef(null);

    const handleClick = () => {        
        window.navigator.vibrate && window.navigator.vibrate(10);
        onClick(index)
    };

    const handleDropdown = (e) => {
        e.preventDefault();
        if(dropdown) return;
        setDropdown(true);
    }

    const handleRename = () => {
        setDropdown(false);
        setIsRenaming(true);
    }

    useEffect( () => {
        const handleClickOutside = (e) =>  {
            console.log(e.target === dropdownRef.current)
            if(e.target !== dropdownRef.current || e.key === "Escape") setDropdown(false);
        }

        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleClickOutside);
        document.addEventListener("contextmenu", handleClickOutside);

        return () => {            
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleClickOutside);
            document.removeEventListener("contextmenu", handleClickOutside);
        }
    }, [])

    return (
        <div className={`dropdown dropdown-context w-full ${dropdown ? 'dropdown-open' : ''}`}>
            <button ref={dropdownRef} aria-label={`Select bank ${name || index}`} key={index} onContextMenu={handleDropdown} onClick={handleClick} className={`btn btn-ghost btn-pushable border-secondary text-secondary btn-xs w-full ${selected ? "btn-pushed" : ""}`}>
                { name ? name : `Bank ${index}`}
            </button>
            <ul className="dropdown-content menu p-0 shadow-lg bg-neutral text-secondary rounded min-w-full">
                <li><button className="btn-sm" onClick={ handleRename }>Rename</button></li>
            </ul>
        </div>
    )
}

export default Bank;