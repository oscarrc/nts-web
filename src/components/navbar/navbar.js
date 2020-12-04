import React from 'react';
import { PageHeader, Button, Dropdown, Menu, Space } from 'antd';
import { DownOutlined, LinkOutlined, DownloadOutlined } from '@ant-design/icons';
import korg from '../../assets/korg.svg';
import './navbar.css';

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

export function NavBar() {
    return  (
        <PageHeader
            title={<img className="logo" src={korg} alt="nts-web"/>}
            subTitle={<strong className="text-gold">NTS-web</strong>}
            extra={[
                <Space>
                    <Dropdown key="menu" overlay={menu}>
                        <Button ghost className="btn-gold">
                            Export <DownOutlined />
                        </Button>
                    </Dropdown>
                    <Button ghost className="btn-gold">Import</Button>
                </Space>
            ]}
        >
        </PageHeader>
    );
}