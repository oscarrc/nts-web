import Keyboard from "../components/controls/Keyboard";
import { MdClose } from "react-icons/md";
import Octave from "../components/controls/Octave";
import Wheel from "../components/controls/Wheel";

const Live = ({ isOpen, toggle }) => {
    return (
        <aside className={`${isOpen ? 'translate-y-0' : 'translate-y-full'} transition-transform transition-200 bottom-drawer bg-neutral flex flex-row justify-center items-center gap-16 py-8 px-4 text-secondary`}>
            <button onClick={ toggle } className="btn btn-circle btn-sm absolute top-2 right-2 text-secondary">
                <MdClose className="h-5 w-5" />
            </button>
            <Wheel autoReturn={true} />
            <Keyboard />
            <Octave />
        </aside>
    )
}

export default Live;