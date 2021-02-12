import React from 'react';
import {  Dropdown, Menu, Upload } from 'antd';
import { DownOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';

export function Bank(props) {
    const menu = (
        <Menu className="menu-dark">
            <Menu.Item key="import" icon={<UploadOutlined />}>
                <Upload accept={ props.accept } showUploadList={false} beforeUpload={ file => props.onImport(file) } customRequest={ () => false }>
                    Import
                </Upload>
            </Menu.Item>
            <Menu.Item key="save" onClick={ () => props.onExport(props.bank) } icon={<DownloadOutlined />}>
                Export
            </Menu.Item>
        </Menu>
    )

    return  (
        <Dropdown.Button onClick={ () => props.onClick(props.bank) } className={"btn-gold" + (props.active ? " active" : "")} overlay={menu} icon={<DownOutlined />}>
            { props.label } { props.bank + 1 } 
        </Dropdown.Button>
    );
}