import { FaCaretUp } from "react-icons/fa";

const Display = ({ children }) => {
    return (
        <section className="sticky md:relative flex flex-col gap-4 flex-1 h-full min-h-[235px] mx-4 my-2">
            <div  className="flex-1 bg-neutral bg-grid text-dotMatrix rounded text-accent outline outline-base-100 outline-offset-2 outline-2">
                { children }
            </div>
            <div className="flex gap-4 justify-between px-2">
                <button className="btn btn-pushable btn-xs"> <FaCaretUp className="h-4 w-4" /> </button>
                <button className="btn btn-pushable btn-xs"> <FaCaretUp className="h-4 w-4" /> </button>
                <button className="btn btn-pushable btn-xs"> <FaCaretUp className="h-4 w-4" /> </button>
                <button className="btn btn-pushable btn-xs"> <FaCaretUp className="h-4 w-4" /> </button>
            </div>
        </section>
    )
}

export default Display;