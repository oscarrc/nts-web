import Display from "../components/layout/Display";
import Memory from "../components/layout/Memory";
import Section from "../components/layout/Section"
import { defaultLayout } from "../config/layout";
import { useState } from "react";

const Synth = () => {
    const [ mode, setMode ] = useState("synth");

    return (           
        <main className="flex flex-col flex-1 min-h-full justify-between items-center py-8">      
            <div className="grid w-full h-full xl:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-rows-auto gap-8 grid-flow-row">
                <div className="flex flex-col">
                    <Display mode={mode} setMode={setMode} />
                    <Section section={defaultLayout.osc} />
                    <Section section={defaultLayout.arp} />
                </div>
                <div className="flex flex-col">
                    <Section section={defaultLayout.amp} />
                </div>
                <div className="flex flex-col">
                    <Section section={defaultLayout.effects} />
                </div>
                <div className="flex flex-col">
                    <Section section={defaultLayout.vcf} />
                    <Memory mode={mode} setMode={setMode} />
                </div>
            </div>
        </main>
    )
}

export default Synth;