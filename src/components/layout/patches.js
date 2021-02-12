import React from 'react';
import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { Bank } from '../partials/bank';

export function Patches(props) {
    const dispatch = useDispatch();

    const setPatch = (bank) => dispatch({ type:"synth/setBank", payload: bank });

    const renderButtons = () => {
        let buttons = [];

        for (let i = 0; i < 6; i++) {
            buttons.push(
                <Col key={ "patch" + i } span={8}>
                    <Bank label="Patch" accept=".ntspatch" bank={i} active={ props.active === i } onClick={setPatch} onInport="" onExport="" />
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