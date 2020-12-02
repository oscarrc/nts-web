import React from 'react';
import { Layout } from 'antd';

import { NavBar } from './components/navbar/navbar';
import { Credits } from './components/credits/credits';
import { Loading } from './components/loading/loading';

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
        <Loading />
      </Content>
      <Footer className="footer transparent">
        <Credits />
      </Footer>
    </Layout>
  );
}

export default App;