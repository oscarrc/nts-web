import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Pianoroll }  from './components/pianoroll';

export function Sequencer() {
  const { Content } = Layout;

  return (
    <Content className="main transparent">
        <Row justify="space-between" align="top" gutter={[0,20]}>
          <Col md={20} xs={24}>
            <Pianoroll />
          </Col>
          <Col md={2} xs={24}>

          </Col>
        </Row>
    </Content>
  );
}