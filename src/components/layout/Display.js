import { BsCaretDownFill, BsCaretUpFill, BsFillCircleFill, BsFillPauseFill, BsPlayFill } from "react-icons/bs";

import { useMidi } from "../../hooks/useMidi";
import { useNTS } from "../../hooks/useNTS";
import { useSequencer } from "../../hooks/useSequencer";

const Display = ({ children }) => {
    const isPlaying = false;
    const { bank } = useNTS();
    const { octave, enabled } = useMidi();
    const { tempo } = useSequencer();

    return (
        <section className="sticky md:relative flex flex-col gap-4 flex-1 h-full min-h-[235px] mx-4 my-2">
            <div  className="relative flex-1 bg-neutral bg-grid font-sevenSegment text-xl rounded text-accent outline outline-base-100 outline-offset-2 outline-2">
                <div className="flex flex-1 justify-between absolute top-0 left-0 w-full bg-transparent px-2">
                    <div className="text-center">Bank {bank < 10 && 0 }{bank}</div>                       
                    <div className="text-center">Octave {octave} </div>
                    <div className="text-center">{tempo} BPM</div>
                </div>
                { children }
                <nav className="grid grid-cols-4 gap-4 absolute bottom-0 left-0 w-full bg-transparent font-sevenSegment text-sm px-2">
                    <span className="text-center">Test</span>
                    <span className="text-center">Test</span>
                    <span className="text-center">Test</span>
                    <span className="text-center">Test</span>
                </nav>
            </div>
            <div className="grid grid-cols-4 gap-4 justify-between">
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs"> <BsCaretUpFill className="h-4 w-4" /> </button>
                <button className="btn btn-ghost btn-pushable border-secondary text-secondary btn-xs"> <BsCaretDownFill className="h-4 w-4" /> </button>
                <button className="btn btn-outline btn-accent btn-xs"> <BsFillCircleFill className="h-2 w-2" /> </button>
                <button className={`btn btn-ghost btn-pushable border-secondary text-secondary btn-xs ${isPlaying && "btn-pushed"}`}> { isPlaying ? <BsFillPauseFill className="h-4 w-4"/> : <BsPlayFill className="h-4 w-4" />} </button>
            </div>
        </section>
    )
}

export default Display;