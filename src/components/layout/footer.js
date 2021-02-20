import React, { useEffect, useState } from 'react';
import { Space, Button, Layout, Tooltip } from 'antd';
import { HeartFilled, CoffeeOutlined, BugOutlined, CloudDownloadOutlined } from '@ant-design/icons';

export function Footer() {
    const { Footer } = Layout;
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    const install = evt => {
        evt.preventDefault();
        if(promptInstall) promptInstall.prompt();
        promptInstall.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') setSupportsPWA(false);
        });
    };

    useEffect(() => {
        const handler = e => {
            e.preventDefault();
            setSupportsPWA(true);
            setPromptInstall(e);
          };
          window.addEventListener("beforeinstallprompt", handler);
    }, []);

    return  (
        <Footer className="footer transparent">
            <Space className="credits" align="center">
                <p className="text-gold">Made with <HeartFilled className="text-red" /> by <a className="link text-gold" href="https://oscarrc.me" rel="noreferrer" target="_BLANK">Oscar R.C.</a></p>
                <p className="text-light"><i>This page is not affiliated or endorsed by Korg</i></p>
                <Space>
                    <Button ghost size="small" className="btn-gold" href="https://ko-fi.com/oscarrc" target="_BLANK"><CoffeeOutlined /> Buy me a coffee</Button>
                    { supportsPWA ? <Tooltip title="Install the app">
                                        <Button onClick={ install } ghost size="small" className="btn-gold"><CloudDownloadOutlined /></Button> 
                                    </Tooltip>
                                  : ""}
                    <Tooltip title="Report a bug">
                        <Button ghost size="small" className="btn-gold" href="https://github.com/oscarrc/nts-web/issues" target="_BLANK"><BugOutlined /></Button>
                    </Tooltip>                    
                </Space>
            </Space>
        </Footer>
    );
}