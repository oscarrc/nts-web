import { BsDash, BsPlus } from "react-icons/bs";
import { useEffect, useRef } from "react";

const Tempo = ({ tempo, metronome, onChange, onToggle }) => {
    const checkboxRef = useRef(null);

    const setValue = (e) => {
        const value = parseInt(e)
        if(typeof value === "number" && value > 0) onChange(value)
    }

    // const toggleMetronome = (e) => {
    //     onToggle(e.target.checked)
    // }

    // useEffect(() => {
    //     onToggle(checkboxRef.current.checked)
    // }, [checkboxRef?.current?.checked, onToggle])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-1 h-8 w-36">            
                <button aria-label="BPM down" onClick={ () => setValue(tempo - 1)} className="px-2 btn btn-ghost btn-pushable outline-neutral border-secondary text-secondary btn-sm rounded-r-none"><BsDash className="h-4 w-4" /></button>
                <input
                    aria-label="BPM"
                    type="text" 
                    value={ tempo } 
                    onChange={ (e) => setValue(e.target.value) }  
                    className="bg-neutral w-full text-center bg-grid font-sevenSegment text-2xl text-accent outline focus:outline-base-100 focus:outline-offset-1 focus:outline-1 focus:border-none border-none focus:ring-0 outline-base-100 outline-offset-1 outline-1 px-2"
                />           
                <button aria-label="BPM up" onClick={ () => setValue(tempo + 1) } className="px-2 btn btn-ghost btn-pushable outline-neutral border-secondary text-secondary btn-sm rounded-l-none"><BsPlus className="h-4 w-4" /></button>
            </div>
            <div className="form-control">
                    <input 
                        
                        aria-label="Metronome sound" 
                        type="radio" 
                        value="ON"
                        className="toggle toggle-secondary checked:toggle-accent " 
                    />
            </div>
        </div>
    )
}

export default Tempo;