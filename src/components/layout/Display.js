import { FaCaretUp } from "react-icons/fa";

const Display = () => {
    return (
        <section className="flex flex-col gap-4 flex-1 h-full mx-4 my-2">
            <div  className="flex-1 bg-neutral bg-grid min-h-1/3 text-dotMatrix rounded text-accent outline outline-base-100 outline-offset-2 outline-2">
                
            </div>
            <div className="flex gap-4 justify-between px-2">
                <button className="btn btn-ghost btn-active text-secondary active:outline-base-200 outline-base-100 outline-2 outline btn-xs"> <FaCaretUp className="h-4 w-4" /> </button>
                <button className="btn btn-ghost btn-active text-secondary active:outline-base-200 outline-base-100 outline-2 outline btn-xs"> <FaCaretUp className="h-4 w-4" /> </button>
                <button className="btn btn-ghost btn-active text-secondary active:outline-base-200 outline-base-100 outline-2 outline btn-xs"> <FaCaretUp className="h-4 w-4" /> </button>
                <button className="btn btn-ghost btn-active text-secondary active:outline-base-200 outline-base-100 outline-2 outline btn-xs"> <FaCaretUp className="h-4 w-4" /> </button>
            </div>
        </section>
    )
}

export default Display;