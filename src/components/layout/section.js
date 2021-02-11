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

    const renderControl = (control, span ) => {
        return <Col span={span}>{control.label}</Col>
    }

    const renderSection = (section, subsection = false) => {
        const span = Math.floor(24/section.controls.length);
        const rendered = [
            <Divider className={ subsection ? "text-light" : "text-gold" }>{ section.label }</Divider>
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
