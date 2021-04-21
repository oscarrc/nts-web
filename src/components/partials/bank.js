import React from 'react';
import {  Dropdown, Menu, Upload } from 'antd';
import { DownOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Capacitor, Plugins } from '@capacitor/core';

export function Bank(props) {
    const { FileSelector } = Plugins;
    const platform = Capacitor.platform;

    const pickFile = async () => {  
        if(platform === 'android'){
            let selectedFile = await FileSelector.fileSelector({
                multiple_selection: false,
                ext: [props.accept.substring(1)]
            });
    
            const path = JSON.parse(selectedFile.paths);            
            const file = await fetch(path).then((r) => r.blob());
            props.onImport(file, props.bank);
        }        
    }

    const saveFile = () => {
        if(platform === 'android'){

        }else{
            props.onExport(props.bank);
        }
    }

    const menu = (
        <Menu className="menu-dark">
            <Menu.Item key="import" icon={<UploadOutlined />} onClick={ pickFile } >
                {
                    platform !== 'android' ? 
                        <Upload accept={ props.accept } showUploadList={false} beforeUpload={ file => props.onImport(file, props.bank) } customRequest={ () => false }>
                            Import
                        </Upload>
                    : 'Import'
                }
            </Menu.Item>
            <Menu.Item key="save" onClick={ saveFile } icon={<DownloadOutlined />}>
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