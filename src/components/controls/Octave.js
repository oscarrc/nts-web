import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Octave = ({ octave, setOctave }) => {
    const handleClick = (q) => {
        if (window.navigator.vibrate){
            let vibration = (q < 0 && octave > 0) || (q > 0 && octave < 6) ? 10 : 50
            window.navigator.vibrate(vibration);
        }
        if(q < 0 && octave > 0) setOctave(o => o - 1)
        if(q > 0 && octave < 11) setOctave(o => o + 1)
    }

    return (
        <div className="flex flex-col gap-1 h-28 w-10">            
            <button aria-label="Octave up" onClick={ () => handleClick(1)} className="btn btn-ghost btn-pushable outline-neutral border-secondary text-secondary btn-xs rounded-b-none"> <FaCaretUp className="h-4 w-4" /></button>
            <div className="bg-neutral w-full flex flex-1 bg-grid font-sevenSegment text-2xl items-center justify-center text-accent outline outline-base-100 outline-offset-1 outline-1">
                <span>{ octave }</span>
            </div>            
            <button aria-label="Octave down" onClick={ () => handleClick(-1) } className="btn btn-ghost btn-pushable outline-neutral border-secondary text-secondary btn-xs rounded-t-none"> <FaCaretDown className="h-4 w-4" /></button>
        </div>
    )
}

export default Octave;