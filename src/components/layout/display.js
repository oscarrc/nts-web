import React from 'react';
import { Space, Row, Col, Affix, Grid } from 'antd';

export function Display(props) {
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    return  (
        <Affix offsetTop={screens.xs || screens.sm ? 12 : -999999 }>
            <Space className="display bg-grid">
                <Row className="text-lcd" align="middle">
                        <Col span={24}>
                            <h2>{props.title}</h2> 
                            <p>{props.text}</p>
                        </Col>  
                </Row>
            </Space>
        </Affix>
    );
}