import { useLayout } from "../../hooks/useLayout";
import { useState } from "react";

const Info = () => {
    const { handleModal } = useLayout();
    const [ active, setActive ] = useState(0);
    const sections = ["How it works", "Installation", "Compatibility"]

    return(
        <div className="card w-full max-w-lg bg-neutral shadow-xl overflow-visible">
            <div className="card-body gap-4 mt-2 justify-center">
                <div className="tabs">
                    { sections.map((s, i) => <button onClick={ () => setActive(i) } key={i} aria-label={s} className={`flex-1 tab tab-bordered ${ i === active ? "tab-active" : ""}`}>{s}</button>) }
                </div>
                <div className="flex">
                    <div className={`${active === 0 ? "visible" : "hidden" }`}>
                        TEST 1
                    </div>
                    <div className={`${active === 1 ? "visible" : "hidden" }`}>
                        TEST 2
                    </div>
                    <div className={`${active === 2 ? "visible" : "hidden" }`}>
                        TEST 3
                    </div>
                </div>
                <div className="card-actions justify-end gap-2 mt-4 col-span-2">
                    <button onClick={ () => handleModal() } className="btn btn-sm btn-primary btn-outline">Close</button>
                </div>
            </div>
        </div>
    )
}

export default Info;