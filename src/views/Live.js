import Keyboard from "../components/controls/Keyboard";
import Octave from "../components/controls/Octave";
import Wheel from "../components/controls/Wheel";

const Live = () => {
    return (
        <aside className="bottom-drawer bg-neutral flex flex-row justify-center items-center gap-16 py-8">
            <Wheel autoReturn={true} />
            <Keyboard />
            <Octave />
        </aside>
    )
}

export default Live;