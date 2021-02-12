import React from 'react';
import { useDispatch } from 'react-redux';
import { PageHeader, Button, Space, Upload, Layout } from 'antd';
import { DownloadOutlined, UploadOutlined, SettingOutlined } from '@ant-design/icons';

import korg from '../../assets/korg.svg';

export function Header() {
    const { Header } = Layout;
    const dispatch = useDispatch();

    const toggleSettings = () => dispatch({type: 'app/toggleSettings'});

    return  (
        <Header className="header transparent">
            <PageHeader
                title={<img className="logo" src={korg} alt="nts-web"/>}
                subTitle={<strong className="text-gold">NTS-web</strong>}
                extra={[
                    <Space key="headeractions">
                        <Upload accept=".ntspatch" showUploadList={false} customRequest={ () => false }>
                            <Button ghost className="btn-gold" icon={<UploadOutlined />}>Import</Button>
                        </Upload>
                        <Button ghost className="btn-gold" icon={<DownloadOutlined />}>Export</Button>
                        <Button ghost onClick={toggleSettings} className="btn-gold" icon={<SettingOutlined />}></Button>
                    </Space>
                ]}
            >
            </PageHeader>
        </Header>
    );
}