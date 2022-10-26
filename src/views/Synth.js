import Knob from "../components/controls/Knob";
import Selector from "../components/controls/Selector";
import Switch from "../components/controls/Switch";
import Wheel from "../components/controls/Wheel";

const Synth = () => {
    return (
        <div className="flex">
            <Selector label="test" />
            <Knob label="test" />
            <Switch label="test" isMomentary={true} />
            <Wheel autoReturn={true} />
        </div>
    )
}

export default Synth;