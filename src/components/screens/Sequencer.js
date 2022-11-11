import { BsCaretRightFill } from "react-icons/bs";

const Sequencer = ({step}) => {
    return (
        <div className="w-full relative flex-1 px-2 max-h-[180px] overflow-hidden">
            { [...Array(16).keys()].map(k => (
                <div key={k} className="grid grid-cols-4 border-b border-accent">
                    <div className="flex items-center">{k === step && <BsCaretRightFill className="h-3 w-3 inline"/>} {k < 10 && '0'}{k}</div>
                    <div>C4</div>
                    <div className="text-center">2</div>
                    <div className="text-right">Bank 00</div>
                </div>
            )) }
        </div>
    )
}

export default Sequencer;