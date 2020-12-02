import React from 'react';
import { Layout, Row, Col, Divider } from 'antd';

import { NavBar } from './components/navbar/navbar';
import { Credits } from './components/credits/credits';

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
          <Col span={2}>
            <Divider className="text-gold">OSC</Divider>
            <Divider className="text-gold">ARP</Divider>
          </Col>
          <Col span={2}>
            <Divider className="text-gold">VCF</Divider>
          </Col>
          <Col span={3}>
            <Divider className="text-gold">AMP</Divider>
          </Col>
          <Col span={5}>
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