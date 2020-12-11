import React from 'react';
import { Modal, Form, Select, Divider, Button } from 'antd';
import { channels } from '../config/midi';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSettings } from  '../redux/reducers/midi';

export function Settings() {   
    const { Option } = Select;
    const { Item } = Form;
    const midiState = useSelector(state => state.midi).value;
    const dispatch = useDispatch();

    const saveSettings = () => {
      
    }

    const closeSettings = () => dispatch(toggleSettings());
    
    return  (
      <Modal className="modal-dark settings"
              title={ <Divider className="text-gold">MIDI Settings</Divider> } 
              visible={ midiState.settings } 
              onOk={saveSettings} 
              onCancel={closeSettings}
              closable={false}
              centered
              footer={[
                <Button className="btn-gold" ghost key="cancel" onClick={closeSettings}>
                  Cancel
                </Button>,
                <Button key="submit" className="btn-gold" ghost onClick={saveSettings}>
                  Save
                </Button>,
              ]}>
        <Form size="small" labelCol = {{ span: 4 }} wrapperCol={{ span: 20 }} >
          <Divider className="text-light">Input</Divider>
          <Item className="text-light" label="Channel" name="inputChannel">
            <Select className="control-select text-lcd">

            </Select>
          </Item>
          <Item label="Device" name="inputDevice">
            <Select className="control-select text-lcd">
              
            </Select>
          </Item>
          <Divider className="text-light">Output</Divider>
          <Item label="Channel" name="outputChannel">
            <Select className="control-select text-lcd">

            </Select>
          </Item>
          <Item label="Device" name="outputDevice">
            <Select className="control-select text-lcd">
              
            </Select>
          </Item>
        </Form>
      </Modal>
    );
}