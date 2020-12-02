import React from 'react';
import { Space } from 'antd';

import './display.css';

export function Display() { 
    return  (
        <Space className="display" direction="vertical">
            <h2 className="text-lcd">TEST</h2>
        </Space>
    );
}