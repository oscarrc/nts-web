import React, { useCallback, useEffect, useRef } from 'react';
import { Select } from 'antd';

export function Dropdown(props) {
    const control = useRef(null);
    const { Option } = Select;

    const renderOptions = (opt) => {
        let options = [];
        opt.forEach( (option, index) => {
            if(option !== "Off"){
                options.push(<Option key={props.cc + option} value={index}>{option}</Option>)
            }
        })
        return options;
    }

    const handleChange = useCallback((value) => {
    },[]);

    useEffect( () => handleChange(props.value), [props.value] );

    return  (
        <Select ref={control} onChange={handleChange} className="control-select text-lcd" size="medium" id= { props.label + props.cc } name={ props.label } placeholder={ props.label } value={ props.value }>
            { renderOptions(props.values) }
        </Select>
    );
}

Dropdown.defaultProps = {
    label: null,
    cc: null,
    values: [],
    value: "",
    active: 1
};