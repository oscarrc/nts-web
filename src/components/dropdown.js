import React from 'react';
import { Select } from 'antd';

export function Dropdown(props) {
    const { Option } = Select;

    const renderOptions = (opt) => {
        let options = [];
        opt.forEach( (option) => {
            if(option.label !== "Off"){
                options.push(<Option key={props.cc + option.value} value={option.value}>{option.label}</Option>)
            }
        })
        return options;
    }

    return  (
        <Select className="control-select text-lcd" size="medium" name={ props.name } placeholder={ props.name } defaultValue={0} defaultActiveFirstOption={ true }>
            { renderOptions(props.values) }
        </Select>
    );
}

Dropdown.defaultProps = {
    name: null,
    cc: null,
    values: [],
    value: 0,
};