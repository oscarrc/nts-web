import React from 'react';
import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { Bank } from '../partials/bank';

export function Patches() {
    const dispatch = useDispatch();

    return  (
        <Row className="patches-wrapper" justify="space-between" align="middle"     >
            <Col span={8}>
                <Bank label="Patch" bank={0} />
            </Col>
            <Col span={8}>
                <Bank label="Patch" bank={1} />
            </Col>
            <Col span={8}>
                <Bank label="Patch" bank={2} />
            </Col>
            <Col span={8}>
                <Bank label="Patch" bank={3} />
            </Col>
            <Col span={8}>
                <Bank label="Patch" bank={4} />
            </Col>
            <Col span={8}>
                <Bank label="Patch" bank={5} />
            </Col>
        </Row>
    );
}