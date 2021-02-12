import React from 'react';
import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { Bank } from '../partials/bank';
import { exportData, importData } from '../../utils/files';

export function Patches(props) {
    const dispatch = useDispatch();

    const setPatch = (bank) => dispatch({ type:"synth/setBank", payload: bank });
    const exportPatch = (bank) => exportData(props.patches[bank], "patch.ntspatch");

    const importPatch = async (file, bank) => {
        const patch = await importData(file);
        dispatch({ type: "synth/setPatch", payload: {
            patch: patch,
            bank: bank
        }});
    }

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