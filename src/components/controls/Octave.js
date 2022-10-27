import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Octave = ({ value = 1}) => {
    return (
        <div className="flex flex-col gap-1">            
            <button className="btn btn-pushable btn-xs rounded-b-none"> <FaCaretUp className="h-4 w-4" /></button>
            <div className="bg-neutral w-full bg-grid text-dotMatrix h-6 leading-6 text-sm text-center text-accent outline outline-base-100 outline-offset-1 outline-1">
                { value }
            </div>            
            <button className="btn btn-pushable btn-xs rounded-t-none"> <FaCaretDown className="h-4 w-4" /></button>
        </div>
    )
}

export default Octave;