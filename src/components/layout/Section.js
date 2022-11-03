import Dropdown from "../controls/Dropdown";
import Knob from "../controls/Knob";
import Selector from "../controls/Selector";
import Switch from "../controls/Switch";
import { useNTS } from "../../hooks/useNTS";

const Section = ({ section }) => {
    const { state, setState, controls } = useNTS();

    const renderControl = (cc, type = false) => {
        const control = controls[cc]
        const currentValue = isNaN(control.switch) ? state[cc] : state[cc].value;
        
        switch( type || control.type ){
            case "knob":
                return <Knob 
                    key={cc}
                    label={ control.label }
                    value={ state[cc] }
                    onChange={ value => setState(cc, value) } 
                />
            case "dropdown":
                return <Dropdown 
                    key={cc}
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
                    label={ control.label }
                    options={ control.options }
                    value={ currentValue } 
                    display={ control.options[currentValue] }
                    onChange={ value => setState(cc, isNaN(control.switch) ? value : { ...state[cc], value } ) }
                />
            case "switch":
                return <Switch 
                    key={cc}
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
                    { section.controls?.map(control => renderControl(control, section?.type )) }
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