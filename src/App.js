import React from 'react';
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

  return (
    <Layout id="app">
      <Header className="header transparent">
        <NavBar />
      </Header>
      <Content className="main transparent">
        <Row justify="space-between" align="center">
          <Col span={4}>
            <Display />
            <Oscilator />
            <Arpegiator />
          </Col>
          
          <Col span={2}>
            <Vcfilter />
          </Col>

          <Col span={2}>
            <Amplifier />
          </Col>
          
          <Col span={4}>
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