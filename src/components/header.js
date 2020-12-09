import React from 'react';
import { PageHeader, Button, Dropdown, Menu, Space, Upload, Layout } from 'antd';
import { DownOutlined, LinkOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import korg from '../assets/korg.svg';

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

export function Header() {
    const { Header } = Layout;
    
    return  (
        <Header className="header transparent">
            <PageHeader
                title={<img className="logo" src={korg} alt="nts-web"/>}
                subTitle={<strong className="text-gold">NTS-web</strong>}
                extra={[
                    <Space>
                        <Upload>
                            <Button ghost className="btn-gold" icon={<UploadOutlined />}>Import</Button>
                        </Upload>
                        <Dropdown key="menu" overlay={menu}>
                            <Button ghost className="btn-gold">
                                Export <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Space>
                ]}
            >
            </PageHeader>
        </Header>
    );
}