import React from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { Keyboard, Pad, Octave } from '../partials';
import { midiPlayNote, midiSendPitchBend } from '../../utils/midi';

export function Live(props) {    
    const dispatch = useDispatch();

    const playNote = (note) => midiPlayNote(note[1], props.midi.outputDevice, props.midi.outputChannel, note[0]);
    const pitchBend = (pitch) =>  midiSendPitchBend(pitch, props.midi.outputDevice, props.midi.outputChannel);
    const setOctave = (octave) => dispatch({type:'synth/setOctave', payload: octave});

    return  (
        <Row justify="space-around" align="stretch">
            <Col span={2}>
                <Octave onChange={ setOctave } octave={ props.octave } />
            </Col>
            <Col span={18}>
                <Keyboard onChange={ playNote } octave={ props.octave } />
            </Col>   
            <Col span={2}>
                <Pad onChange={ pitchBend } />
            </Col>
        </Row>
    );
}