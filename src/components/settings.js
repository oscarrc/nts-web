import React from 'react';
import { Modal } from 'antd';

export function Settigns() {    
    return  (
        <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >

      </Modal>
    );
}