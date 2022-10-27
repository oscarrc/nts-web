import { Fragment, useEffect, useState } from "react"

import { octaveLimits } from "../../config/synth";
import { useLayout } from "../../hooks/useLayout"

const Keyboard = ({ octave = 1 }) => {
    const { breakpoint } = useLayout();
    const [ octaves, setOctaves ] = useState( octaveLimits[breakpoint] );

    useEffect(() => {
        setOctaves(octaveLimits[breakpoint])
    }, [breakpoint]);

    return (
        <div className="flex-1 grid relative overflow-hidden auto-cols-auto grid-rows-none gap-x-1 grid-flow-col h-56 -mt-20"> 
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