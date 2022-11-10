const Sequencer = () => {
    return (
        <div className="w-full relative flex-1 px-2">
            <div className="absolute bottom-0 left-0 grid grid-cols-3 text-sm w-full">
                <span className="text-center">Step</span>
                <span className="text-center">Note</span>
                <span className="text-center">Length</span>
            </div>
        </div>
    )
}

export default Sequencer;