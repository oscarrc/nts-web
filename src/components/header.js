import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PageHeader, Button, Dropdown, Menu, Space, Upload, Layout } from 'antd';
import { DownOutlined, LinkOutlined, DownloadOutlined, UploadOutlined, SettingOutlined } from '@ant-design/icons';
import { savePatch, linkPatch, loadPatchFile } from '../utils/patch';

import korg from '../assets/korg.svg';

export function Header() {
    const { Header } = Layout;
    const isLoading = useSelector(state => state.loader).value;
    const patch = useSelector(state => state.synthesizer).value;
    const dispatch = useDispatch();

    const exportPatch = () => savePatch(patch);
    const copyLink = () => {
        linkPatch(patch);        
        dispatch({ type: 'display/setDisplay', payload: { screen: "link"}});
    }
    const importPatch = async (file) => {
        const patch = await loadPatchFile(file);
        dispatch({ type: 'synthesizer/setControl', payload: patch});
        dispatch({ type: 'sequencer/stopPlay', payload: patch});
        dispatch({ type: 'display/setDisplay', payload: { screen: "import"}});
    }
    const openSettings = () => dispatch({type: 'midi/toggleSettings'});

    const menu = (
        <Menu className="menu-dark">
            <Menu.Item onClick={ copyLink } key="copy" icon={<LinkOutlined />}>
                Copy link
            </Menu.Item>
            <Menu.Item onClick={ exportPatch } key="save" icon={<DownloadOutlined />}>
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
                        <Upload accept=".ntspatch" showUploadList={false} beforeUpload={ file => importPatch(file) } customRequest={ () => false }>
                            <Button disabled={isLoading} ghost className="btn-gold" icon={<UploadOutlined />}>Import</Button>
                        </Upload>
                        <Dropdown disabled={isLoading} key="menu" overlay={menu}>
                            <Button ghost className="btn-gold">
                                Export <DownOutlined />
                            </Button>
                        </Dropdown>
                        <Button disabled={isLoading} onClick={ openSettings } ghost className="btn-gold" icon={<SettingOutlined />}></Button>
                    </Space>
                ]}
            >
            </PageHeader>
        </Header>
    );
}