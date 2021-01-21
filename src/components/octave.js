import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

export function Octave(props) {       
    const dispatch = useDispatch();
    const octave = useSelector(state => state.midi).value.octave;
    const octaveUp = () => dispatch({ type: 'midi/octaveUp'});
    const octaveDown = () => dispatch({ type: 'midi/octaveDown'});

    return  (
        <div className="octave-wrapper">
            <Button disabled={ octave === props.max } onClick={ octaveUp } block ghost className="btn-gold" icon={<CaretUpOutlined />}></Button>
            <div className="display bg-grid"><h2 className="text-lcd">{octave}</h2></div>
            <Button disabled={ octave === props.min } onClick={ octaveDown } block ghost className="btn-gold" icon={<CaretDownOutlined />}></Button>
        </div>
    );
}

Octave.defaultProps = {
    min: 0,
    max: 7
}