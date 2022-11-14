import {useRef, useState} from "react";

const Bank = ({index, name, selected, onClick, onRename}) => {
    const [dropdown, setDropdown] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false)
    
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

    return (
        <div className={`dropdown w-full ${dropdown ? 'dropdown-open' : ''}`}>
            <button aria-label={`Select bank ${name || index}`} key={index} onContextMenu={handleDropdown} onClick={handleClick} className={`btn btn-ghost btn-pushable border-secondary text-secondary btn-xs w-full ${selected ? "btn-pushed" : ""}`}>
                { name ? name : `Bank ${index}`}
            </button>
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
                <li><button onClick={ handleRename }>Rename</button></li>
            </ul>
        </div>
    )
}

export default Bank;