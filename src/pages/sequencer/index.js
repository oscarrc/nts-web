import React from 'react';
import { Layout } from 'antd';
import { Pianoroll, Controls }  from './components';

export function Sequencer() {
  const { Content } = Layout;

  return (
    <Content className="main transparent">
      <Controls />
      <Pianoroll />
    </Content>
  );
}