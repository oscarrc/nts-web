import React from 'react';
import { Space, Row, Col, Affix, Grid } from 'antd';

export function Display(props) {
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    return  (
        <Affix offsetTop={screens.xxl || screens.xl ? -999999 : 12 }>
            <Space className="display bg-grid">
                <Row className="text-lcd" align="middle">
                    <Col span={24}>
                        <h2>{props.title}</h2> 
                        { props.text !== "" ? <Row justify="space-around">{props.text}</Row> : ""}
                    </Col>  
                </Row>
            </Space>
        </Affix>
    );
}