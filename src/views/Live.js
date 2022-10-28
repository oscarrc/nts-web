import Keyboard from "../components/controls/Keyboard";
import { MdClose } from "react-icons/md";
import Octave from "../components/controls/Octave";
import Pitch from "../components/controls/Pitch";
import Wheel from "../components/controls/Wheel";
import { useLayout } from "../hooks/useLayout";
import { useMidi } from "../hooks/useMidi";

const Live = () => {
    const { bottomDrawer, setBottomDrawer } = useLayout();
    const { octave, setOctave, pitchBend } = useMidi();

    return (
        <aside className={`${ bottomDrawer ? 'translate-y-0' : 'translate-y-full'} transition-transform transition-200 bottom-drawer bg-neutral flex flex-row justify-center items-end gap-16 py-6 xl:px-12 md:px-8 sm:px-4 px-2 text-secondary`}>
            <button onClick={ () => setBottomDrawer( d => !d) } className="btn btn-circle btn-sm absolute top-2 right-2 text-secondary">
                <MdClose className="h-5 w-5" />
            </button>
            {/* <Wheel 
                autoReturn={true}
                defaultValue="0"
                minValue="-1"
                maxValue="1"
                step="0.01"
                onChange={ pitchBend }
            /> */}
            <Pitch />
            <Keyboard />
            <Octave octave={octave} setOctave={setOctave} />
        </aside>
    )
}

export default Live;