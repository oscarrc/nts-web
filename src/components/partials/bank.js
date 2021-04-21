import React from 'react';
import {  Dropdown, Menu, Upload } from 'antd';
import { DownOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Capacitor, Plugins } from '@capacitor/core';

export function Bank(props) {
    const { FileSelector } = Plugins;

    const pickFile = async () => {
        if (Capacitor.platform !== 'web'){    
            let selectedFile = await FileSelector.fileSelector({
                multiple_selection: false,
                ext: props.accept
            });

            let paths = JSON.parse(selectedFile.paths);

            props.onImport(paths[0], props.bank)
        }
    }

    const menu = (
        <Menu className="menu-dark">
            <Menu.Item key="import" icon={<UploadOutlined />} onClick={ pickFile } >
                {
                    Capacitor.platform == 'web' ? 
                        <Upload accept={ props.accept } showUploadList={false} beforeUpload={ file => props.onImport(file, props.bank) } customRequest={ () => false }>
                            Import
                        </Upload>
                    : ''
                }
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