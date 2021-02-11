import React from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Divider } from 'antd';
import { midiControlChange } from '../../utils/midi';
// import { Knob, Selector, Dropdown, Switch } from '..';

export function Section(props) {
    const dispatch = useDispatch();

    const controlChange = (cc, value, active = true) => {
        if(active) dispatch({type:'synthesizer/setControl', payload: { cc, value }});
        midiControlChange(cc, value, props.midi.outputDevice, props.midi.outputChannel);
    }
       
    return (
        <Row justify="space-between">               
        </Row>
    );
};
