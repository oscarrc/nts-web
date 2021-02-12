import React from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Divider } from 'antd';
import { midiControlChange } from '../../utils/midi';
import { Dropdown, Knob, Selector, Switch } from '../partials';

import { strings } from '../../config/synth';

export function Section(props) {
    const dispatch = useDispatch();

    const controlChange = (cc, val, active = true) => {
        if(active && !isNaN(val.value)) midiControlChange(cc, val.value, props.midi.outputDevice, props.midi.outputChannel);
        dispatch({type:'synth/setControl', payload: { cc, val }});
    }

    const renderControl = (control, span) => {
        switch(control.type){
            case "knob":
                return <Col key={ control.label + control.cc } span={ span }>
                    <Knob 
                        label={ control.label } 
                        cc={ control.cc } 
                        value={ props.state.patches[props.state.bank][control.cc].value }
                        onChange={ controlChange }
                    />
                </Col>
            case "selector":
                return <Col key={ control.label + control.cc } span={ span }>
                    <Selector 
                        label={ control.label } 
                        cc={ control.cc } 
                        value={ props.state.patches[props.state.bank][control.cc].value }
                        active={ props.state.patches[props.state.bank][control.cc].active }
                        min={ props.state.patches[props.state.bank][control.cc].min }
                        max={ props.state.patches[props.state.bank][control.cc].max }
                        step={ props.state.patches[props.state.bank][control.cc].step }
                        onChange={ controlChange }
                    />
                </Col>
            case "dropdown":
                let dropdown = []
                if(control.switch){
                    span = 18;
                    dropdown.push(
                        <Col key={ control.label + control.cc + 'switch' } span={ 24 - span }>
                            <Switch 
                                cc={ control.cc } 
                                switch={ control.switch } 
                                value={ props.state.patches[props.state.bank][control.cc].value } 
                                active={ props.state.patches[props.state.bank][control.cc].active }
                                onChange={ controlChange }
                            />
                        </Col>
                    )
                }

                dropdown.push(
                    <Col key={ control.label + control.cc } span={ span }>
                        <Dropdown 
                            label={ control.label }
                            cc={control.cc}
                            active={ isNaN(control.active) ? 1 : 0 }
                            svalue={ props.state.patches[props.state.bank][control.cc].svalue }
                            value={ props.state.patches[props.state.bank][control.cc].value }
                            values={ strings[control.cc] }
                            step={ props.state.patches[props.state.bank][control.cc].step }
                            onChange={ controlChange }
                        />
                    </Col>
                )
                return dropdown;
            case "switch":
                return <Col key={ control.label + control.cc } span={ span }>
                    <Switch 
                        label={ control.label } 
                        cc={ control.cc } 
                        switch={ control.switch } 
                        value={ props.state.patches[props.state.bank][control.cc].value } 
                        active={ props.state.patches[props.state.bank][control.cc].active } 
                        tag={ !!control.label }
                        onChange={ controlChange }
                    />
                </Col>         
            case "dummy":
                return <Col key={ control.label + control.cc } span={ span }></Col>
            default:
                break;
        }
    }

    const renderSection = (section, subsection = false) => {
        const span = Math.floor(24/section.controls.length);
        const rendered = [
            <Divider key={section.label} className={ subsection ? "text-light" : "text-gold" }>{ section.label }</Divider>
        ];
        
        section.controls?.forEach( c => {
            rendered.push(renderControl(c, span))
        });

        section.sections?.forEach( s => {
            rendered.push(renderSection(s, true));
        });

        return rendered;
    }
       
    return (
        <Row justify="space-between">
            { renderSection(props.section) }       
        </Row>
    );
};
