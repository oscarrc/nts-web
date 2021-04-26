import React from 'react';
import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { Bank } from '../partials/bank';
import { exportData, importData, convertPatch } from '../../utils/files';
import { Capacitor, Plugins, Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

export function Patches(props) {
    const dispatch = useDispatch();
    const { Modals } = Plugins;

    const exportPatch = async (bank) => {
        if(Capacitor.platform === 'android'){
            const { value, cancelled } = await Modals.prompt({
                title: `Patch name`,
                message: `Enter patch name`
            });
            
            if(!cancelled){
                await Filesystem.writeFile({
                    path: `nts-web/${value || 'patch' + new Date() }.ntspatch`,
                    data: new Blob([decodeURIComponent(encodeURI(JSON.stringify(props.patches[bank])))], { type: "application/json;charset=utf-8;"}),
                    directory: FilesystemDirectory.Documents,
                    encoding: FilesystemEncoding.UTF8,
                    recursive: true
                });
            }
        }else{ 
            exportData(props.patches[bank], "patch.ntspatch")
        }
    };

    const importPatch = async (file, bank) => {
        const patch = await importData(file);

        if(patch.osc){
            const converted = convertPatch(patch);
            dispatch({ type: "synth/setLegacyPatch", payload: {
                patch: converted,
                bank: bank
            }});
        }else{
            dispatch({ type: "synth/setPatch", payload: {
                patch: patch,
                bank: bank
            }});
        }

        dispatch( {type: "display/setDisplay", payload: {
            title: "Patch imported",
            text: "Patch has been imported to bank " + (bank + 1)
        }});
    }
   
    const setPatch = (bank) => {
        dispatch({ type:"synth/setBank", payload: bank })
        if(!props.loading){
            dispatch( {type: "display/setDisplay", payload: {
                title: "Bank " + (bank + 1) + " selected"
            }});
        }
    };

    const renderButtons = () => {
        let buttons = [];

        for (let i = 0; i < props.patches.length; i++) {
            buttons.push(
                <Col key={ "patch" + i } span={8}>
                    <Bank label="Patch" accept=".ntspatch" bank={i} active={ props.bank === i } onClick={setPatch} onImport={importPatch} onExport={exportPatch} />
                </Col>
            )
        }

        return buttons;
    }

    return  (
        <Row className="patches-wrapper" justify="space-between" align="middle" gutter={[20,0]}>
            { renderButtons() }
        </Row>
    );
}