import Display from "../components/layout/Display";
import More from "../components/layout/More";
import Section from "../components/layout/Section"
import { useNTS } from "../hooks/useNTS";

const Synth = () => {
    const { currentControls } = useNTS();
    
    return (        
        <div className="grid w-full overflow-hidden xl:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-rows-auto gap-8 grid-flow-row">
            <div className="flex flex-col">
                <Display />
                <Section section={currentControls.osc} />
                <Section section={currentControls.arp} />
            </div>
            <div className="flex flex-col">
                <Section section={currentControls.amp} />
            </div>
            <div className="flex flex-col">
                <Section section={currentControls.effects} />
            </div>
            <div className="flex flex-col">
                <Section section={currentControls.vcf} />
                <More />
            </div>
        </div>
    )
}

export default Synth;