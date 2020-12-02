import React from 'react';
import { Space, Button } from 'antd';
import { HeartFilled, CoffeeOutlined } from '@ant-design/icons';

import './credits.css';

export function Credits() {
    return  (
        <Space className="credits" align="center">
            <p className="text-gold">Made with <HeartFilled /> by <a className="link text-gold" href="https://oscarrc.me" rel="noreferrer" target="_BLANK">Oscar R.C.</a></p>
            <Button size="small"><a href="google.com"><CoffeeOutlined /> Buy me a coffee</a></Button>
        </Space>
    );
}