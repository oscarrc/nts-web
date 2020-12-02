import React from 'react';
import { PageHeader, Button, Dropdown, Menu, Space } from 'antd';
import { DownOutlined, LinkOutlined, DownloadOutlined } from '@ant-design/icons';
import korg from '../../assets/korg.svg';
import './navbar.css';

const menu = (
    <Menu className="menu-dark">
        <Menu.Item key="1" icon={<LinkOutlined />}>
        Copy link
        </Menu.Item>
        <Menu.Item key="2" icon={<DownloadOutlined />}>
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
                    <Dropdown overlay={menu}>
                        <Button className="btn-gold">
                            Export <DownOutlined />
                        </Button>
                    </Dropdown>
                    <Button className="btn-gold">Import</Button>
                </Space>
            ]}
        >
        </PageHeader>
    );
}