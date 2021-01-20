import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'antd';
import { Keyboard } from '../../../components';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

// TODO octave change control
// TODO maybe a pitch bend control
export function Live() {       
    const dispatch = useDispatch();
    const octave = useSelector(state => state.midi).value.octave;
    const octaveUp = () => dispatch({ type: 'midi/octaveUp'});
    const octaveDown = () => dispatch({ type: 'midi/octaveDown'});

    return  (
        <Row justify="space-between" align="center">
            <Col span={2} justify="center">
                <Button disabled={ octave === 10 } onClick={ octaveUp } block ghost className="btn-gold" icon={<CaretUpOutlined />}></Button>
                <div class="display small"><h2 className="text-lcd">{octave}</h2></div>
                <Button disabled={ octave === 0 } onClick={ octaveDown } block ghost className="btn-gold" icon={<CaretDownOutlined />}></Button>
            </Col>
            <Col span={18}>
                <Keyboard octave={octave} />
            </Col>   
            <Col span={1}>
                
            </Col>
        </Row>
    );
}