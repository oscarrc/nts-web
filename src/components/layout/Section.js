import Dropdown from "../controls/Dropdown";
import Knob from "../controls/Knob";
import Selector from "../controls/Selector";
import Switch from "../controls/Switch";
import { useNTS } from "../../hooks/useNTS";

const Section = ({ section }) => {
    const { state, setState } = useNTS();

    const renderControl = (control) => {
        const currentValue = isNaN(control.switch) ? state[control.cc] : state[control.cc].value

        switch( control.type ){
            case "knob":
                return <Knob 
                    key={control.cc}
                    label={control.label}
                    value={ state[control.cc] }
                    onChange={ (value) => { setState({type: control.cc, payload: value}) }} 
                />
            case "dropdown":
                return <Dropdown 
                    key={control.cc}
                    switchValue={ control?.switch }
                    isActive={ state[control.cc]?.active }
                    value={ currentValue } 
                    options={ control.options } 
                    onChange={ (value) => { setState({type: control.cc, payload: isNaN(control.switch) ? value : { ...state[control.cc], value } }) }} 
                    onSwitch={ (value) => { setState({type: control.cc, payload: { ...state[control.cc], active: value } }) }}
                />;
            case "selector":               
                return <Selector 
                    key={ control.cc }
                    label={ control.label }
                    options={ control.options }
                    value={ currentValue } 
                    display={ control.options[currentValue] }
                    onChange={ (value) => { setState({type: control.cc, payload: isNaN(control.switch) ? value : { ...state[control.cc], value } }) }}
                />
            case "switch":
                return <Switch 
                    key={control.cc}
                    switchValue={control?.switch}
                    label={control.label}
                    inline={true}
                    isActive={ state[control.cc].active }
                    onChange={ (value) => { setState({type: control.cc, payload: { ...state[control.cc], active: value } }) }} 
                />
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