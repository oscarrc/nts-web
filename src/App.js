import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';

import { Amplifier } from './components/synth/amplifier';
import { Arpegiator } from './components/synth/arpegiator';
import { Credits } from './components/credits/credits';
import { Display } from './components/display/display';
import { Effects } from './components/synth/effects';
import { NavBar } from './components/navbar/navbar';
import { Oscilator } from './components/synth/oscilator';
import { Vcfilter } from './components/synth/vcfilter';

import './App.css';
import "antd/dist/antd.css";

function App() {
  const { Header, Footer, Content } = Layout;

  useEffect( () => {
    const script = document.createElement('script');
    script.src = "/webaudio-controls.js";
    script.async = true;
    document.body.appendChild(script);
  })

  return (
    <Layout id="app">
      <Header className="header transparent">
        <NavBar />
      </Header>
      <Content className="main transparent">
        <Row justify="space-between" align="top">
          <Col span={24} lg={6}>
            <Display />
            <Oscilator />
            <Arpegiator />
          </Col>          
          <Col span={12} xs={24} lg={4}>
            <Vcfilter />
          </Col>
          <Col span={12} xs={24} lg={4}>
            <Amplifier />
          </Col>          
          <Col span={24} lg={6}>
            <Effects />
          </Col>
        </Row>        
      </Content>
      <Footer className="footer transparent">
        <Credits />
      </Footer>
    </Layout>
  );
}

export default App;