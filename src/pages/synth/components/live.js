import React from 'react';
import { Row, Col } from 'antd';
import { Keyboard } from '../../../components';

export function Live() {   
    return  (
        <Row justify="space-between" align="center">
            <Col span={12} order={1} lg={{ span: 3, order: 1 }}>
            </Col>
            
            <Col span={12} order={2} lg={{ span: 3, order: 3 }}>
                
            </Col>
            <Col span={24} order={3} lg={{ span: 18, order: 2 }}>
                <Keyboard />
            </Col>
        </Row>
    );
}