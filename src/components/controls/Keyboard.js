const Keyboard = ({ octave = 1, octaves = 2 }) => {
    return (
        <div className="grid overflow-hidden auto-cols-auto grid-rows-none gap-x-1 grid-flow-col"> 
            {
                [...Array((octaves*7 + 1)).keys()].map(() => {
                    return <span className="min-w-full h-32 w-24 min-h-full rounded bg-secondary"></span>
                })
            }
        </div>
    )
}

export default Keyboard