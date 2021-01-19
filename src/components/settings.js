import React from 'react';
import { Modal, Form, Select, Divider, Button } from 'antd';
import { channels } from '../config/midi';
import { useSelector, useDispatch } from 'react-redux';

export function Settings() {   
    const { Option } = Select;
    const { Item } = Form;
    const [form] = Form.useForm();
    const midiState = useSelector(state => state.midi).value;
    const dispatch = useDispatch();

    const saveSettings = (values) => {
      dispatch({type: 'midi/setOptions', payload: values});
      closeSettings();
    }

    const closeSettings = () => dispatch({type: 'midi/toggleSettings'});

    const renderOptions = (opt, obj = false) => {
      let options = [];

      opt.forEach( (option) => {
        options.push(<Option key={ obj ? option.id : option } value={ obj ? option.id : option }>{ obj ? option.name : option }</Option>)
      })

      return options;
  }
    
    return  (
      <Modal className="modal-dark settings"
        title={ <Divider className="text-gold">MIDI Settings</Divider> } 
        visible={ midiState.settings } 
        closable={false}
        centered
        footer={[
          <Button className="btn-gold" ghost key="cancel" onClick={closeSettings}>
            Cancel
          </Button>,
          <Button key="submit" className="btn-gold" ghost onClick={form.submit}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} size="small" labelCol = {{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={saveSettings} initialValues={{
          inputDevice: midiState.inputDevice,
          inputChannel: midiState.inputChannel,
          outputDevice: midiState.outputDevice,
          outputChannel: midiState.outputChannel
        }} >
          <Divider className="text-light">Input</Divider>
          <Item label="Device" name="inputDevice">
            <Select className="control-select text-lcd">
              { renderOptions(midiState.inputDevices, true) }
            </Select>
          </Item>
          <Item className="text-light" label="Channel" name="inputChannel">
            <Select className="control-select text-lcd">
              { renderOptions(channels) }
            </Select>
          </Item>
          <Divider className="text-light">Output</Divider>
          <Item label="Device" name="outputDevice">
            <Select className="control-select text-lcd">
              { renderOptions(midiState.outputDevices, true) }
            </Select>
          </Item>
          <Item label="Channel" name="outputChannel">
            <Select className="control-select text-lcd">
              { renderOptions(channels) }
            </Select>
          </Item>
        </Form>
      </Modal>
    );
}