import React, { useEffect, useRef } from 'react';
import { Select } from 'antd';

export function Dropdown(props) {
    const control = useRef(null);
    const { Option } = Select;

    const onChange = (value) => {
        value = value * props.step > (props.max * props.step) - 1 ? 127 : value * props.step;
        props.onChange(props.cc, { value: value }, props.active);
    }
  
    useEffect(() => {
        const current = control.current;
        const value = props.values.findIndex( v => v === current.props.value);
        onChange(value);
        //eslint-disable-next-line
    }, [props.value, props.values]);

    const renderOptions = (opt) => {
        let options = [];
        opt.forEach( (option, index) => {
            if(option !== "Off"){
                options.push(<Option key={props.cc + option} value={index}>{option}</Option>)
            }
        })
        return options;
    }

    return  (
        <Select ref={control} onChange={onChange} className="control-select text-lcd" size="medium" id= { props.label + props.cc } name={ props.label } placeholder={ props.label } value={ props.svalue }>
            { renderOptions(props.values) }
        </Select>
    );
}

Dropdown.defaultProps = {
    label: null,
    cc: null,
    values: [],
    value: 0,
    svalue: "",
    active: 1
};