import React from 'react';
import { Space } from 'antd';
import { useSelector } from 'react-redux';

export function Display() { 
    const isLoading = useSelector(state => state.loader).value;
    const controlValues = useSelector(state => state.synthesizer).value;

    const renderDisplay = (values) => {
        return <p className="text-lcd text-left">{JSON.stringify(values)}</p>
    }

    return  (
        <Space className="display" direction="vertical">
            { isLoading ? 
                <h2 className="text-lcd">PLEASE, ALLOW THE APP TO USE YOUR MIDI DEVICES</h2> 
                : renderDisplay(controlValues)
            }
        </Space>
    );
}