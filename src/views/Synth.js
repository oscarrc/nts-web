import Display from "../components/layout/Display";
import More from "../components/layout/More";
import Section from "../components/layout/Section"
import { defaultLayout } from "../config/layout";
import { useState } from "react";

const Synth = () => {
    const [ screen, setScreen ] = useState("bank");
    
    return (        
        <div className="grid w-full h-full xl:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-rows-auto gap-8 grid-flow-row">
            <div className="flex flex-col">
                <Display screen={screen} setScreen={setScreen} />
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
                <More />
            </div>
        </div>
    )
}

export default Synth;