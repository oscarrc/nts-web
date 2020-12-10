import React from 'react';
import { Space } from 'antd';
import { useSelector } from 'react-redux';

export function Display() { 
    const isLoading = useSelector(state => state.loader).value;

    return  (
        <Space className="display" direction="vertical">
            { isLoading ? 
                <h2 className="text-lcd">PLEASE, ALLOW THE APP TO USE YOUR MIDI DEVICES</h2> 
                : ''
            }
        </Space>
    );
}