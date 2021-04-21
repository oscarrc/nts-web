import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Button, Space, Upload, Layout } from 'antd';
import { DownloadOutlined, UploadOutlined, SettingOutlined } from '@ant-design/icons';
import { importData, exportData } from '../../utils/files';
import { Capacitor, Plugins, Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import korg from '../../assets/korg.svg';

export function Header() {
    const { Header } = Layout;    
    const { FileSelector, Modals } = Plugins;
    const platform = Capacitor.platform
    const synthState = useSelector(state => state.synth).value;
    const seqState = useSelector(state => state.sequencer).value;
    const dispatch = useDispatch();
    
    const toggleSettings = () => dispatch({type: 'app/toggleSettings'});   

    const pickFile = async () => {  
        if(platform === 'android'){
            let selectedFile = await FileSelector.fileSelector({
                multiple_selection: false,
                ext: ['ntsweb']
            });
    
            const path = JSON.parse(selectedFile.paths);            
            const file = await fetch(path).then((r) => r.blob());
            loadData(file);
        }        
    }
	const loadData = async (file) => {
        const data = await importData(file);
        dispatch({ type: 'synth/importSynth', payload: data.synth });
        dispatch({ type: 'sequencer/importSeq', payload: data.sequencer })
    }
	const saveData = async () => {
        const data = {
            synth: synthState,
            sequencer: seqState
        };

        if(platform === 'android'){
            const { value, cancelled } = await Modals.prompt({
                title: 'Data name',
                inputPlaceholder: 'data'
            });

            if(!cancelled){
                await Filesystem.writeFile({
                    path: `nts-web/${value}.ntsweb`,
                    data: decodeURIComponent(encodeURI(JSON.stringify(data))),
                    directory: FilesystemDirectory,
                    encoding: FilesystemEncoding.UTF8,
                    recursive: true
                });
            }
        }else{
            exportData(data, "data.ntsweb");
        }
    }

    return  (
        <Header className="header transparent">
            <PageHeader
                title={<img className="logo" src={korg} alt="nts-web"/>}
                subTitle={<strong className="text-gold">NTS-web</strong>}
                extra={[
                    <Space key="headeractions">
                        {
                            platform !== 'android' ? 
                                <Upload accept=".ntsweb"  beforeUpload={ file => loadData(file) } showUploadList={false} customRequest={ () => false }>
                                    <Button ghost className="btn-gold" icon={<UploadOutlined />}>Import</Button>
                                </Upload> :
                                <Button onClick={ pickFile } ghost className="btn-gold" icon={<UploadOutlined />}>Import</Button>
                        }
                        <Button onClick={ saveData } ghost className="btn-gold" icon={<DownloadOutlined />}>Export</Button>
                        <Button ghost onClick={toggleSettings} className="btn-gold" icon={<SettingOutlined />}></Button>
                    </Space>
                ]}
            >
            </PageHeader>
        </Header>
    );
}