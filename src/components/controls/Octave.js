import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Octave = ({ octave, setOctave }) => {
    const handleClick = (q) => {
        if(q < 0 && octave > 0) setOctave(o => o - 1)
        if(q > 0 && octave < 6) setOctave(o => o + 1)
    }

    return (
        <div className="flex flex-col gap-1 h-28 w-10">            
            <button onClick={ () => handleClick(1)} className="btn btn-pushable btn-xs rounded-b-none"> <FaCaretUp className="h-4 w-4" /></button>
            <div className="bg-neutral w-full flex flex-1 bg-grid text-dotMatrix items-center justify-center font-semibold text-accent outline outline-base-100 outline-offset-1 outline-1">
                <span>{ octave }</span>
            </div>            
            <button onClick={ () => handleClick(-1) } className="btn btn-pushable btn-xs rounded-t-none"> <FaCaretDown className="h-4 w-4" /></button>
        </div>
    )
}

export default Octave;