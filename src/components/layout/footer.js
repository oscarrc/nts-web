import React, { useEffect } from 'react';
import { Space, Button, Layout } from 'antd';
import { HeartFilled, CoffeeOutlined, BugOutlined, CloudDownloadOutlined } from '@ant-design/icons';

export function Footer() {
    const { Footer } = Layout;
    let install;

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            install = e;
        })
    }, []);

    return  (
        <Footer className="footer transparent">
            <Space className="credits" align="center">
                <p className="text-gold">Made with <HeartFilled className="text-red" /> by <a className="link text-gold" href="https://oscarrc.me" rel="noreferrer" target="_BLANK">Oscar R.C.</a></p>
                <p className="text-light"><i>This page is not affiliated or endorsed by Korg</i></p>
                <Space>
                    <Button ghost size="small" className="btn-gold" href="https://ko-fi.com/oscarrc" target="_BLANK"><CoffeeOutlined /> Buy me a coffee</Button>
                    { install ? <Button onClick={ install.prompt } ghost size="small" className="btn-gold"><CloudDownloadOutlined /></Button> : ""}
                    <Button ghost size="small" className="btn-gold" href="https://github.com/oscarrc/nts-web/issues" target="_BLANK"><BugOutlined /></Button>
                </Space>
            </Space>
        </Footer>
    );
}