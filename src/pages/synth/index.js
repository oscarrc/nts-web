import React from 'react';
import { Layout, Row, Col, Collapse} from 'antd';

import { Display, Keyboard } from '../../components';
import { Amplifier, Arpegiator, Effects, More, Oscilator, Vcfilter } from './components';


export function Synth() {
  const { Panel } = Collapse;
  const { Content } = Layout;

  return (
    <Content className="main transparent">
        <Row justify="space-between" align="top" gutter={[0,20]}>
          <Col span={24} md={12} lg={6}>
            <Display />
            <Row justify="space-between" align="top">
              <Col span={24}>
                <Oscilator />
              </Col>
              <Col span={24}>
                <Arpegiator />
              </Col>
            </Row>
          </Col>          
          <Col span={24} md={10} lg={4}>            
            <Amplifier />
          </Col>
          <Col span={24} md={12} lg={6}>
            <Effects />
          </Col>          
          <Col span={24} md={10} lg={4}>
            <Vcfilter />
            <More />
          </Col>
        </Row>
        <Collapse className="transparent"  bordered={false}  >
          <Panel showArrow={false} header={ <span className='text-gold'><strong >Show Keyboard</strong></span> } key="1">            
            <Row justify="space-between" align="center">
              <Col span={12} order={1} lg={{ span: 6, order: 1 }}></Col>
              <Col span={24} order={3} lg={{ span: 12, order: 2 }}>
                <Keyboard />
              </Col>
              <Col span={12} order={2} lg={{ span: 6, order: 3 }}></Col>
            </Row>
          </Panel>
        </Collapse>
    </Content>
  );
}