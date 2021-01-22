import React from 'react';
import { Layout, Row, Col, Collapse} from 'antd';
import { useDispatch } from 'react-redux';

import { Display } from '../../components';
import { Amplifier, Arpegiator, Effects, More, Oscilator, Vcfilter, Live } from './components';


export function Synth() {
  const { Panel } = Collapse;
  const { Content } = Layout;
  const dispatch = useDispatch();

  const setDisplay = (screen) => {
    dispatch({type:'display/setDisplay', payload: { screen }});
  }

  return (
    <Content className="main transparent">
        <Row justify="space-between" align="top" gutter={[0,20]}>
          <Col span={24} md={12} lg={6}>
            <Display />
            <Row justify="space-between" align="top">
              <Col span={24} onMouseEnter={ () => setDisplay("osc")}>
                <Oscilator />
              </Col>
              <Col span={24} onMouseEnter={ () => setDisplay("arp")}>
                <Arpegiator />
              </Col>
            </Row>
          </Col>          
          <Col span={24} md={10} lg={4} onMouseEnter={ () => setDisplay("amp")}>            
            <Amplifier />
          </Col>
          <Col span={24} md={12} lg={6} onMouseEnter={ () => setDisplay("effects")}>
            <Effects />
          </Col>          
          <Col span={24} md={10} lg={4} onMouseEnter={ () => setDisplay("vcf")}>
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