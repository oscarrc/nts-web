import Dropdown from "../controls/Dropdown";
import Knob from "../controls/Knob";
import Selector from "../controls/Selector";
import Switch from "../controls/Switch";

const Section = ({ section }) => {

    const renderControl = (control) => {
        switch( control.type ){
            case "knob":
                return <Knob label={control.label} />
            case "dropdown":
                return <Dropdown switchValue={control?.switch} defaultSelection={0} options={[ {label: "Test1" }, {label: "Test2" } ]} />;
            case "selector":                
                return <Selector label={control.label} />
            case "switch":
                return <Switch label={control.label} inline={true} />
            default:
                return <div className="w-16"></div>
        }
    }

    return (
        section &&
            <section>
                <h2 key={ section.label } className="divider divider-primary font-semibold">{ section.label }</h2>
                <div className="flex justify-around gap-8 py-2">
                    { section.controls?.map(control => renderControl(control)) }
                </div>
                { section?.sections?.map(section => (
                    <div>
                        <h3 key={ section.label } className="divider text-secondary font-semibold my-2">{ section.label }</h3>
                        <div className="flex justify-around gap-8 py-2">
                            { section.controls.map(control => renderControl(control)) }
                        </div>
                    </div>
                )) }
            </section>
    )
}

export default Section;