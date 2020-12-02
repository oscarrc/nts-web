import React from 'react';
import { Layout, Row, Col, Divider } from 'antd';

import { Credits } from './components/credits/credits';
import { Display } from './components/display/display';
import { NavBar } from './components/navbar/navbar';

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
            <Divider className="text-gold">OSC</Divider>
            <Divider className="text-gold">ARP</Divider>
          </Col>
          
          <Col span={2}>
            <Divider className="text-gold">VCF</Divider>
          </Col>

          <Col span={2}>
            <Divider className="text-gold">AMP</Divider>
          </Col>
          
          <Col span={4}>
            <Divider className="text-gold">EFFECTS</Divider>
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