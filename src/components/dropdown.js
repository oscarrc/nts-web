import React, { useEffect, useCallback } from 'react';
import { Select } from 'antd';
import { midiControlChange } from '../utils/midi';

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

    const handleChange = useCallback((value) => {
        if(props.active) midiControlChange(props.cc, value, "", "");
    }, [props.active, props.cc]);

    useEffect( () => {
        const id = props.name + props.cc;
  
        document.getElementById(id).addEventListener("change", (event)=>{
          handleChange(event.target.value)
        });
    
        return () => document.getElementById(id).removeEventListener("change", handleChange);      
      }, [handleChange, props.name, props.value, props.cc])

    return  (
        <Select className="control-select text-lcd" size="medium" id= { props.name + props.cc } name={ props.name } placeholder={ props.name } defaultValue={ props.value } defaultActiveFirstOption={ true }>
            { renderOptions(props.values) }
        </Select>
    );
}

Dropdown.defaultProps = {
    name: null,
    cc: null,
    values: [],
    value: 0,
    active: true
};