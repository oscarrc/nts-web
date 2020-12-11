import React from 'react';
import { Modal, Form, Select, Divider, Button } from 'antd';
import { channels } from '../config/midi';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSettings, setOptions } from  '../redux/reducers/midi';

export function Settings() {   
    const { Option } = Select;
    const { Item } = Form;
    const [form] = Form.useForm();
    const midiState = useSelector(state => state.midi).value;
    const dispatch = useDispatch();

    const saveSettings = (values) => {
      dispatch(setOptions(values));
    }

    const closeSettings = () => dispatch(toggleSettings());

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
        <Form form={form} size="small" labelCol = {{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={saveSettings} >
          <Divider className="text-light">Input</Divider>
          <Item className="text-light" label="Channel" name="inputChannel">
            <Select className="control-select text-lcd" value={ midiState.inputChannel }>
              { renderOptions(channels) }
            </Select>
          </Item>
          <Item label="Device" name="inputDevice">
            <Select className="control-select text-lcd" value={ midiState.inputDevice?.id }>
              { renderOptions(midiState.inputDevices, true) }
            </Select>
          </Item>
          <Divider className="text-light">Output</Divider>
          <Item label="Channel" name="outputChannel">
            <Select className="control-select text-lcd" value={ midiState.outputChannel }>
              { renderOptions(channels) }
            </Select>
          </Item>
          <Item label="Device" name="outputDevice">
            <Select className="control-select text-lcd" value={ midiState.outputDevice?.id }>
              { renderOptions(midiState.outputDevices, true) }
            </Select>
          </Item>
        </Form>
      </Modal>
    );
}