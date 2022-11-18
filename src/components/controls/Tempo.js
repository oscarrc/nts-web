import { BsDash, BsPlus } from "react-icons/bs";
import { useEffect, useRef } from "react";

const Tempo = ({ tempo, metronome, barLength, onTempoChange, onBarChange, onToggle }) => {
    const checkboxRef = useRef(null);

    const setTempo = (e) => {
        const value = parseInt(e)
        if(typeof value === "number" && value > 0) onTempoChange(value)
    }

    const setBar = (e) => {
        const value = parseInt(e)
        if(typeof value === "number" && value > 0) onBarChange(value)
    }

    const toggleMetronome = (e) => {
        onToggle(!metronome)
    }

    // useEffect(() => {
    //     onToggle(checkboxRef.current.checked)
    // }, [checkboxRef?.current?.checked, onToggle])

    return (
        <div className="flex flex-col gap-4">
            <div>
                <label className="text-sm">BPM</label>
                <div className="flex gap-1 h-8 w-36">            
                    <button aria-label="BPM down" onClick={ () => setTempo(tempo - 1)} className="px-2 btn btn-ghost btn-pushable outline-neutral border-secondary text-secondary btn-sm rounded-r-none"><BsDash className="h-4 w-4" /></button>
                    <input
                        aria-label="BPM"
                        type="text" 
                        value={ tempo } 
                        onChange={ (e) => setTempo(e.target.value) }  
                        className="bg-neutral w-full text-center bg-grid font-sevenSegment text-2xl text-accent outline focus:outline-base-100 focus:outline-offset-1 focus:outline-1 focus:border-none border-none focus:ring-0 outline-base-100 outline-offset-1 outline-1 px-2"
                    />           
                    <button aria-label="BPM up" onClick={ () => setTempo(tempo + 1) } className="px-2 btn btn-ghost btn-pushable outline-neutral border-secondary text-secondary btn-sm rounded-l-none"><BsPlus className="h-4 w-4" /></button>
                </div>
            </div>
            <div>
                <label className="text-sm">Bar length</label>
                <div className="flex gap-1 h-8 w-36">            
                    <button aria-label="Increase bar length" onClick={ () => setBar(barLength - 1)} className="px-2 btn btn-ghost btn-pushable outline-neutral border-secondary text-secondary btn-sm rounded-r-none"><BsDash className="h-4 w-4" /></button>
                    <input
                        aria-label="Bar length"
                        type="text" 
                        value={ barLength } 
                        onChange={ (e) => setBar(e.target.value) }  
                        className="bg-neutral w-full text-center bg-grid font-sevenSegment text-2xl text-accent outline focus:outline-base-100 focus:outline-offset-1 focus:outline-1 focus:border-none border-none focus:ring-0 outline-base-100 outline-offset-1 outline-1 px-2"
                    />           
                    <button aria-label="Decrease bar length" onClick={ () => setBar(barLength + 1) } className="px-2 btn btn-ghost btn-pushable outline-neutral border-secondary text-secondary btn-sm rounded-l-none"><BsPlus className="h-4 w-4" /></button>
                </div>
            </div>
            <div className="form-control">
                <label className="cursor-pointer label" onClick={ toggleMetronome }> 
                    <span className="label-text">Metronome</span> 
                    <input                         
                        aria-label="Metronome sound" 
                        type="checkbox" 
                        value="METRONOME_ON"
                        checked={ metronome }
                        className="toggle toggle-secondary checked:toggle-accent toggle-sm" 
                        readOnly
                    />
                </label>
            </div>
        </div>
    )
}

export default Tempo;