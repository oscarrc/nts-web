import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Button, Space, Upload, Layout } from 'antd';
import { DownloadOutlined, UploadOutlined, SettingOutlined } from '@ant-design/icons';
import { importData, exportData } from '../../utils/files';
import korg from '../../assets/korg.svg';

export function Header() {
    const { Header } = Layout;
    const dispatch = useDispatch();
    const synthState = useSelector(state => state.synth).value;
    const seqState = useSelector(state => state.sequencer).value;
    
    const toggleSettings = () => dispatch({type: 'app/toggleSettings'});    
	const loadData = async (file) => {
        const data = await importData(file);
        dispatch({ type: 'synth/importSynth', payload: data.synth });
        dispatch({ type: 'sequencer/importSeq', payload: data.sequencer })
    }
	const saveData = () => exportData({
        synth: synthState,
        sequencer: seqState
    }, "data.ntsweb");

    return  (
        <Header className="header transparent">
            <PageHeader
                title={<img className="logo" src={korg} alt="nts-web"/>}
                subTitle={<strong className="text-gold">NTS-web</strong>}
                extra={[
                    <Space key="headeractions">
                        <Upload accept=".ntsweb"  beforeUpload={ file => loadData(file) } showUploadList={false} customRequest={ () => false }>
                            <Button ghost className="btn-gold" icon={<UploadOutlined />}>Import</Button>
                        </Upload>
                        <Button onClick={ saveData } ghost className="btn-gold" icon={<DownloadOutlined />}>Export</Button>
                        <Button ghost onClick={toggleSettings} className="btn-gold" icon={<SettingOutlined />}></Button>
                    </Space>
                ]}
            >
            </PageHeader>
        </Header>
    );
}