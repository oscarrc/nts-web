import Dropdown from "../controls/Dropdown";
import Knob from "../controls/Knob";
import Selector from "../controls/Selector";
import Switch from "../controls/Switch";
import { useNTS } from "../../hooks/useNTS";

const Section = ({ section }) => {
    const { state, setState, controls } = useNTS();

    const renderControl = (cc, section, type = false) => {
        const control = controls[cc]
        const currentValue = isNaN(control.switch) ? state[cc] : state[cc].value;
        
        switch( type || control.type ){
            case "knob":
                return <Knob 
                    key={cc}
                    id={`${section}-${control.label}`}
                    label={ control.label }
                    value={ state[cc] }
                    onChange={ value => setState(cc, value) } 
                    min={control.min}
                    max={control.max}
                />
            case "dropdown":
                return <Dropdown 
                    key={cc}
                    id={`${section}-${control.label}`}
                    switchValue={ control?.switch }
                    isActive={ state[cc]?.active }
                    value={ currentValue } 
                    options={ control.options } 
                    onChange={ value => setState(cc, isNaN(control.switch) ? value : { ...state[cc], value }) } 
                    onSwitch={ value =>  setState(cc, { ...state[cc], active: value }) } 
                />;
            case "selector":               
                return <Selector 
                    key={ cc }
                    id={`${section}-${control.label}`}
                    label={ control.label }
                    options={ control.options }
                    value={ currentValue } 
                    display={ control.options[currentValue] || "Unknown" }
                    onChange={ value => setState(cc, isNaN(control.switch) ? value : { ...state[cc], value } ) }
                />
            case "switch":
                return <Switch 
                    key={cc}
                    id={`${section}-${control.label}`}
                    switchValue={control?.switch}
                    label={control.label}
                    inline={true}
                    isActive={ state[cc]?.active }
                    onChange={ value =>  setState(cc, { ...state[cc], active: value }) } 
                />
            default:
                return <div key={cc} className="w-16"></div>
        }
    }

    return (
        section &&
            <section>
                <h2 key={ section.label } className="divider divider-primary font-semibold my-4">{ section.label }</h2>
                <div className="flex justify-around gap-8 py-2">
                    { section.controls?.map(control => renderControl(control, section.label, section?.type )) }
                </div>
                { section?.sections?.map(section => (
                    <div key={ section.label }>
                        <h3 key={ section.label } className="divider text-secondary font-semibold my-4">{ section.label }</h3>
                        <div className="flex justify-around gap-8 py-2">
                            { section.controls.map(control => renderControl(control, section.label)) }
                        </div>
                    </div>
                )) }
            </section>
    )
}

export default Section;