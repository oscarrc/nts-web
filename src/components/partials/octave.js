import React from 'react';
import { Button } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

export function Octave(props) {       
    const octaveUp = () => {}
    const octaveDown = () => {};

    return  (
        <div className="octave-wrapper">
            <Button disabled={ props.octave === props.max } onClick={ octaveUp } block ghost className="btn-gold" icon={<CaretUpOutlined />}></Button>
            <div className="display bg-grid"><h2 className="text-lcd">{props.octave}</h2></div>
            <Button disabled={ props.octave === props.min } onClick={ octaveDown } block ghost className="btn-gold" icon={<CaretDownOutlined />}></Button>
        </div>
    );
}

Octave.defaultProps = {
    min: 0,
    max: 6,
    octave: 3
}