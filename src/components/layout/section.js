import React from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Divider } from 'antd';
import { midiControlChange } from '../../utils/midi';
// import { Knob, Selector, Dropdown, Switch } from '../partials';

export function Section(props) {
    const dispatch = useDispatch();

    const controlChange = (cc, value, active = true) => {
        if(active) dispatch({type:'synthesizer/setControl', payload: { cc, value }});
        midiControlChange(cc, value, props.midi.outputDevice, props.midi.outputChannel);
    }

    const renderControl = (control, span) => {
        switch(control.type){
            case "knob":
                return <Col key={control.label + control.cc} span={span}>{control.label}</Col>
            case "selector":
                return <Col key={control.label + control.cc} span={span}>{control.label}</Col>
            case "dropdown":
                return <Col key={control.label + control.cc} span={span}>{control.label}</Col>
            case "switch":
                return <Col key={control.label + control.cc} span={span}>{control.label}</Col>         
            case "dummy":
                return <Col key={control.label + control.cc} span={span}></Col>
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
