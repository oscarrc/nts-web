import React from 'react';
import { Modal, Form, Select, Divider, Button } from 'antd';
import { useDispatch } from 'react-redux';

export function Settings(props) {   
    const { Option } = Select;
    const { Item } = Form;
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const saveSettings = (values) => {
      dispatch({type: 'midi/setOptions', payload: values});
      closeSettings();
    }

    const closeSettings = () => dispatch({type: 'app/toggleSettings'});

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
        visible={ props.visible } 
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
          inputDevice: props.settings.inputDevice,
          inputChannel: props.settings.inputChannel,
          outputDevice: props.settings.outputDevice,
          outputChannel: props.settings.outputChannel,          
          passthroughDevice: props.settings.passthroughDevice,
          passthroughChannel: props.settings.passthroughChannel
        }} >
          <Divider className="text-light">Input</Divider>
          <Item label="Device" name="inputDevice">
            <Select className="control-select text-lcd">
              { renderOptions(props.settings.inputDevices, true) }
            </Select>
          </Item>
          <Item className="text-light" label="Channel" name="inputChannel">
            <Select className="control-select text-lcd">
              { renderOptions(props.channels) }
            </Select>
          </Item>
          <Divider className="text-light">Output</Divider>
          <Item label="Device" name="outputDevice">
            <Select className="control-select text-lcd">
              { renderOptions(props.settings.outputDevices, true) }
            </Select>
          </Item>
          <Item label="Channel" name="outputChannel">
            <Select className="control-select text-lcd">
              { renderOptions(props.channels) }
            </Select>
          </Item>
          <Divider className="text-light">Passthrough</Divider>
          <Item label="Device" name="passthroughDevice">
            <Select className="control-select text-lcd">
              { renderOptions(props.settings.passthroughDevices, true) }
            </Select>
          </Item>
          <Item className="text-light" label="Channel" name="passthroughChannel">
            <Select className="control-select text-lcd">
              { renderOptions(props.channels) }
            </Select>
          </Item>
        </Form>
      </Modal>
    );
}