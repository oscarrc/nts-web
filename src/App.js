import React from 'react';

import './App.css';
import "antd/dist/antd.css";

import { useSelector } from 'react-redux';
import { Loader } from './features/loader/loader';
import { Synth } from './features/synth/synth';
import { loading } from './features/loader/loaderSlice';
import { NavBar } from './components/navbar/navbar';
import { Credits } from './components/credits/credits';

import { Layout } from 'antd';

function App() {
  const isLoading = useSelector(loading);  
  const { Header, Footer, Content } = Layout;

  return (
    <Layout id="app">
      <Header className="header transparent">
        <NavBar />
      </Header>
      <Content className="transparent">
        { isLoading ? <Loader /> : <Synth /> }
      </Content>
      <Footer className="footer transparent">
        <Credits />
      </Footer>
    </Layout>
  );
}

export default App;