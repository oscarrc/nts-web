import Display from "../components/layout/Display";
import More from "../components/layout/More";
import Section from "../components/layout/Section"
import { controls } from '../config/synth';
import { useEffect } from "react";
import { useMidi } from "../hooks/useMidi";

const Synth = () => {
    const { enabled, devices } = useMidi();

    useEffect(() => {
        console.log(devices)
    }, [devices])

    return (        
        <div className="grid w-full overflow-hidden xl:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-rows-auto gap-8 grid-flow-row">
            <div className="flex flex-col">
                <Display />
                <Section section={controls.osc} />
                <Section section={controls.arp} />
            </div>
            <div className="flex flex-col">
                <Section section={controls.amp} />
            </div>
            <div className="flex flex-col">
                <Section section={controls.effects} />
            </div>
            <div className="flex flex-col">
                <Section section={controls.vcf} />
                <More />
            </div>
        </div>
    )
}

export default Synth;