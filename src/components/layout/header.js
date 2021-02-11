import React from 'react';
import { useDispatch } from 'react-redux';
import { PageHeader, Button, Dropdown, Menu, Space, Upload, Layout } from 'antd';
import { DownOutlined, LinkOutlined, DownloadOutlined, UploadOutlined, SettingOutlined } from '@ant-design/icons';

import korg from '../../assets/korg.svg';

export function Header() {
    const { Header } = Layout;
    const dispatch = useDispatch();

    const toggleSettings = () => dispatch({type: 'app/toggleSettings'});

    const menu = (
        <Menu className="menu-dark">
            <Menu.Item key="copy" icon={<LinkOutlined />}>
                Copy link
            </Menu.Item>
            <Menu.Item key="save" icon={<DownloadOutlined />}>
                Save file
            </Menu.Item>
        </Menu>
    )

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
                        <Dropdown key="menu" overlay={menu}>
                            <Button ghost className="btn-gold">
                                Export <DownOutlined />
                            </Button>
                        </Dropdown>
                        <Button ghost onClick={toggleSettings} className="btn-gold" icon={<SettingOutlined />}></Button>
                    </Space>
                ]}
            >
            </PageHeader>
        </Header>
    );
}