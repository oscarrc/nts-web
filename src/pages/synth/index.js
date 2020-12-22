import React from 'react';
import { Layout, Row, Col, Collapse} from 'antd';

import { Display } from '../../components';
import { Amplifier, Arpegiator, Effects, More, Oscilator, Vcfilter, Live } from './components';


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
          <Panel showArrow={false} header={ <span className='text-gold'><strong >Live controls</strong></span> } key="1">
            <Live />
          </Panel>
        </Collapse>
    </Content>
  );
}