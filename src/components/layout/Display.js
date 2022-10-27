import { BsFillCircleFill } from "react-icons/bs";

const Display = ({ children }) => {
    return (
        <section className="sticky md:relative flex flex-col gap-4 flex-1 h-full min-h-[235px] mx-4 my-2">
            <div  className="relative flex-1 bg-neutral bg-grid text-dotMatrix rounded text-accent outline outline-base-100 outline-offset-2 outline-2">
                { children }
                <nav className="grid grid-cols-4 gap-4 absolute bottom-0 left-0 w-full bg-transparent font-dotMatrix text-sm px-2">
                    <span className="text-center">Testamento</span>
                    <span className="text-center">Test</span>
                    <span className="text-center">adfgads</span>
                    <span className="text-center">Test</span>
                </nav>
            </div>
            <div className="grid grid-cols-4 gap-4 justify-between">
                <button className="btn btn-pushable btn-xs"> <BsFillCircleFill className="h-2 w-2" /> </button>
                <button className="btn btn-pushable btn-xs"> <BsFillCircleFill className="h-2 w-2" /> </button>
                <button className="btn btn-pushable btn-xs"> <BsFillCircleFill className="h-2 w-2" /> </button>
                <button className="btn btn-pushable btn-xs"> <BsFillCircleFill className="h-2 w-2" /> </button>
            </div>
        </section>
    )
}

export default Display;