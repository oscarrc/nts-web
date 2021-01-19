import React from 'react';
import { Row, Col } from 'antd';
import { Keyboard, Pad, Wheel } from '../../../components';

export function Live() {   
    return  (
        <Row justify="space-between" align="center">
            <Col span={12} order={1} lg={{ span: 2, order: 1 }}>
                <Wheel />
            </Col>
            <Col span={24} order={3} lg={{ span: 15, order: 2 }}>
                <Keyboard />
            </Col>
            <Col span={12} order={2} lg={{ span: 6, order: 3 }}>
                <Pad />
            </Col>
        </Row>
    );
}