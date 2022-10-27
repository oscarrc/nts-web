import { Fragment } from "react"

const Keyboard = ({ octave = 1, octaves = 3 }) => {
    return (
        <div className="grid relative overflow-hidden auto-cols-auto grid-rows-none gap-x-1 grid-flow-col h-56 -mt-20"> 
            {
                [...Array(octaves).keys()].map((o) => {
                    return [...Array(7).keys()].map((n) => {
                        return (
                            <Fragment key={`${o}${n}`}>
                                { [1,2,4,5,6].includes(n + 1) && <button className="absolute btn btn-secondary row-start-1 relative top-3/4 w-3/4 left-2/3 h-3/4 rounded z-10 focus:shadow-inner shadow shadow-black"></button> }
                                <button className="btn btn-active btn-ghost h-36 row-start-2 w-full h-full rounded z-0 focus:shadow-inner shadow shadow-black"></button>
                            </Fragment>
                        )
                    })
                })
            }
            <button className="btn btn btn-active btn-ghost h-36 row-start-2 w-full h-full rounded z-0 focus:shadow-inner shadow shadow-black"></button>
        </div>
    )
}

export default Keyboard