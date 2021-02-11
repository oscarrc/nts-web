import React from 'react';
import { Space, Row, Col } from 'antd';

export function Display(props) {
    return  (
        <Space align="start" className="display bg-grid">
           <Row className="text-lcd" align="middle">
            <Col span={24}>
                    <h2>{props.title}</h2> 
                    <p>{props.text}</p>
                </Col>  
           </Row>
        </Space>
    );
}