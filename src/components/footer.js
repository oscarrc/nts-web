import React from 'react';
import { Space, Button, Layout } from 'antd';
import { HeartFilled, CoffeeOutlined, BugOutlined } from '@ant-design/icons';

export function Footer() {
    const { Footer } = Layout;
    
    return  (
        <Footer className="footer transparent">
            <Space className="credits" align="center">
                <p className="text-gold">Made with <HeartFilled className="text-red" /> by <a className="link text-gold" href="https://oscarrc.me" rel="noreferrer" target="_BLANK">Oscar R.C.</a></p>
                <Space>
                    <Button ghost size="small" className="btn-gold"><a href="https://ko-fi.com/oscarrc" target="_BLANK" rel="noreferrer"><CoffeeOutlined /> Buy me a coffee</a></Button>
                    <Button ghost size="small" className="btn-gold"><a href="https://github.com/oscarrc/nts-web/issues" target="_BLANK" rel="noreferrer"><BugOutlined /></a></Button>
                </Space>
            </Space>
        </Footer>
    );
}