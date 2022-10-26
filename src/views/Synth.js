import Dropdown from "../components/controls/Dropdown";
import Knob from "../components/controls/Knob";
import Selector from "../components/controls/Selector";
import Switch from "../components/controls/Switch";
import Wheel from "../components/controls/Wheel";

const Synth = () => {
    return (
        <section className="flex">
            <Selector label="test" />
            <Knob label="test" />
            <Switch label="test" isMomentary={true} />
            <Wheel autoReturn={true} />
            <Dropdown label="test" defaultSelection={0} options={[ {label: "Test1" }, {label: "Test2" } ]} />
        </section>
    )
}

export default Synth;