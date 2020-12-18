import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'antd';
import { midiControlChange } from '../utils/midi';
import { pathToStore } from '../utils/store';

export function Dropdown(props) {
    const midiConfig = useSelector(state => state.midi).value;
    const dispatch = useDispatch();
    const { Option } = Select;

    const renderOptions = (opt) => {
        let options = [];
        opt.forEach( (option, index) => {
            if(option.label !== "Off"){
                options.push(<Option key={props.cc + option.value} value={index}>{option.label}</Option>)
            }
        })
        return options;
    }

    const handleChange = useCallback((value) => {
       if(props.active) midiControlChange(props.cc, props.values[value].value, midiConfig.outputDevice, midiConfig.outputChannel);
       if(props.path) dispatch({type:'synthesizer/setControl', payload: pathToStore({}, props.path, value) });
    },[props.active, props.path, props.cc, props.values, midiConfig, dispatch]);

    // eslint-disable-next-line
    useEffect( () => handleChange(props.value), [])

    return  (
        <Select onChange={handleChange} className="control-select text-lcd" size="medium" id= { props.name + props.cc } name={ props.name } placeholder={ props.name } value={ props.values[props.value].label }>
            { renderOptions(props.values) }
        </Select>
    );
}

Dropdown.defaultProps = {
    name: null,
    cc: null,
    values: [],
    value: 0,
    active: true,
    path: null
};