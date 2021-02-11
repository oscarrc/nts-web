import React from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Divider } from 'antd';
import { midiControlChange } from '../../utils/midi';
import { Dropdown, Knob, Selector, Switch } from '../partials';

import { strings } from '../../config/synth';

export function Section(props) {
    const dispatch = useDispatch();

    const controlChange = (cc, value, active = true) => {
        if(active) dispatch({type:'synthesizer/setControl', payload: { cc, value }});
        midiControlChange(cc, value, props.midi.outputDevice, props.midi.outputChannel);
    }

    const renderControl = (control, span) => {
        switch(control.type){
            case "knob":
                return <Col key={ control.label + control.cc } span={ span }>
                    <Knob 
                        label={ control.label } 
                        cc={ control.cc } 
                        state={ props.state.patches[props.state.bank][control.cc].value }
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
                    />
                </Col>
            case "dropdown":
                return <Col key={ control.label + control.cc } span={ span }>
                    <Dropdown 
                        label={ control.label }
                        cc={control.cc}
                        active={ isNaN(control.active) ? 1 : 0 }
                        value={ props.state.patches[props.state.bank][control.cc].svalue }
                        values={ strings[control.cc] }
                    />
                </Col>
            case "switch":
                return <Col key={ control.label + control.cc } span={ span }>
                    <Switch 
                        label={ control.label } 
                        cc={ control.cc } 
                        switch={ control.switch } 
                        value={ props.state.patches[props.state.bank][control.cc].value } 
                        active={ props.state.patches[props.state.bank][control.cc].active } tag={ !!control.label }
                    />
                </Col>         
            case "dummy":
                return <Col key={ control.label + control.cc } span={ span }></Col>
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
