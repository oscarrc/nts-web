import Dropdown from "../controls/Dropdown";
import Knob from "../controls/Knob";
import Selector from "../controls/Selector";
import Switch from "../controls/Switch";

const Section = ({ section }) => {

    const renderControl = (control) => {
        switch( control.type ){
            case "knob":
                return <Knob key={control.cc} label={control.label} />
            case "dropdown":
                return <Dropdown key={control.cc} switchValue={control?.switch} defaultSelection={0} options={control.options} />;
            case "selector":                
                return <Selector key={control.cc} label={control.label} options={control.options} />
            case "switch":
                return <Switch key={control.cc} switchValue={control?.switch} label={control.label} inline={true} />
            default:
                return <div key={control.cc} className="w-16"></div>
        }
    }

    return (
        section &&
            <section>
                <h2 key={ section.label } className="divider divider-primary font-semibold my-4">{ section.label }</h2>
                <div className="flex justify-around gap-8 py-2">
                    { section.controls?.map(control => renderControl(control)) }
                </div>
                { section?.sections?.map(section => (
                    <div key={ section.label }>
                        <h3 key={ section.label } className="divider text-secondary font-semibold my-4">{ section.label }</h3>
                        <div className="flex justify-around gap-8 py-2">
                            { section.controls.map(control => renderControl(control)) }
                        </div>
                    </div>
                )) }
            </section>
    )
}

export default Section;