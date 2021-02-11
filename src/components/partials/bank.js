import React from 'react';
import { Button, Dropdown, Menu, Upload } from 'antd';
import { DownOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';

export function Bank(props) {
    const menu = (
        <Menu className="menu-dark">
            <Menu.Item key="import" icon={<UploadOutlined />}>
                <Upload accept=".ntspatch" showUploadList={false} customRequest={ () => false }>
                    Import
                </Upload>
            </Menu.Item>
            <Menu.Item key="save" icon={<DownloadOutlined />}>
                Export
            </Menu.Item>
        </Menu>
    )

    return  (
        <Dropdown key="menu" overlay={menu}>
            <Button ghost className="btn-gold">
                { props.label } { props.bank + 1 } <DownOutlined />
            </Button>
        </Dropdown>
    );
}