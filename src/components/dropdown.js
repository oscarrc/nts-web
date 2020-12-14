import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { midiControlChange } from '../utils/midi';

export function Dropdown(props) {
    const midiConfig = useSelector(state => state.midi).value;
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
       if(props.active) midiControlChange(props.cc, value, midiConfig.outputDevice, midiConfig.outputChannel);
    }, [props.active, props.cc, midiConfig]);

    useEffect( () => {
        const element = document.getElementById(props.name + props.cc);

        handleChange(element.value)

        element.addEventListener("change", (event)=>{
          handleChange(event.target.value)
        });
    
        return () => { if(element) element.removeEventListener("change", handleChange) };      
      }, [handleChange, props.name, props.value, props.cc])

    return  (
        <Select className="control-select text-lcd" size="medium" id= { props.name + props.cc } name={ props.name } placeholder={ props.name } value={ props.values[props.value].label } defaultActiveFirstOption={ true }>
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