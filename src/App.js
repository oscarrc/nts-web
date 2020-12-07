import React, { useEffect } from 'react';
import { Layout, Row, Col, Divider } from 'antd';

import { Amplifier } from './components/synth/amplifier';
import { Arpegiator } from './components/synth/arpegiator';
import { Credits } from './components/credits/credits';
import { Display } from './components/display/display';
import { Effects } from './components/synth/effects';
import { NavBar } from './components/navbar/navbar';
import { Oscilator } from './components/synth/oscilator';
import { Vcfilter } from './components/synth/vcfilter';

import { Keyboard } from './components/keyboard';

import './App.css';
import "antd/dist/antd.css";

function App() {
  const { Header, Footer, Content } = Layout;

  useEffect( () => {
    const controls = document.createElement('script');
    const pianoroll = document.createElement('script');

    controls.src= "assets/js/webaudio-controls.js";
    controls.async= true;
    pianoroll.src= "assets/js/webaudio-pianoroll.js";
    pianoroll.async= true;

    document.body.appendChild(controls);
    document.body.appendChild(pianoroll);
  })

  return (
    <Layout id="app">
      <Header className="header transparent">
        <NavBar />
      </Header>
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
        <Divider className="divider-gold" />
        <Row>
          <Col span={2}></Col>
          <Col span={16}>
            <Keyboard />
          </Col>
          <Col span={6}></Col>
        </Row>
      </Content>
      <Footer className="footer transparent">
        <Credits />
      </Footer>
    </Layout>
  );
}

export default App;