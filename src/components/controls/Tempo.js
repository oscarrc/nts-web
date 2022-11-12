import { BsDash, BsPlus } from "react-icons/bs";

const Tempo = ({ tempo, onChange }) => {

    const setValue = (e) => {
        const value = parseInt(e)
        if(typeof value === "number" && value > 0) onChange(value)
    }

    return (
        <div className="flex gap-1 h-8 w-36">            
            <button aria-label="BPM down" onClick={ () => setValue(tempo - 1)} className="px-2 btn btn-ghost btn-pushable outline-neutral border-secondary text-secondary btn-sm rounded-r-none"><BsDash className="h-4 w-4" /></button>
            <input onChange={ (e) => setValue(e.target.value) } type="text" value={ tempo } className="bg-neutral w-full text-center bg-grid font-sevenSegment text-2xl text-accent outline focus:outline-base-100 focus:outline-offset-1 focus:outline-1 focus:border-none border-none focus:ring-0 outline-base-100 outline-offset-1 outline-1 px-2" />           
            <button aria-label="BPM up" onClick={ () => setValue(tempo + 1) } className="px-2 btn btn-ghost btn-pushable outline-neutral border-secondary text-secondary btn-sm rounded-l-none"><BsPlus className="h-4 w-4" /></button>
        </div>
    )
}

export default Tempo;