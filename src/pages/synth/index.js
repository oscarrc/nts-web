import React from 'react';
import { Layout, Row, Col, Collapse} from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';

import { Display, Keyboard } from '../../components';
import { Amplifier, Arpegiator, Effects, Oscilator, Vcfilter } from './components';


export function Synth() {
  const { Panel } = Collapse;
  const { Content } = Layout;

  return (
    <Content className="main transparent">
        <Row justify="space-between" align="top" gutter={[0,20]}>
          <Col span={24} md={12} lg={6}>
            <Display />
            <Row justify="space-between" align="top">
              <Col span={10}>
                <Oscilator />
              </Col>
              <Col span={10}>
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
          </Col>
        </Row>
        <Collapse className="transparent"  bordered={false}  >
          <Panel showArrow={false} header={ <span className='text-gold'><strong >Show Keyboard</strong></span> } key="1">            
            <Row justify="space-between" align="center">
              <Col span={6}></Col>
              <Col span={12}>
                <Keyboard />
              </Col>
              <Col span={4}></Col>
            </Row>
          </Panel>
        </Collapse>
    </Content>
  );
}