import React, { useEffect } from 'react';
import { Row, Col, Button, InputNumber, Space, Upload  } from 'antd';
import { CaretRightOutlined, RollbackOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';

export function Controls(props) {  
    useEffect( () => {
        const handleKey = (event) => { if (event.keyCode === 32) props.onPlay() };
        document.addEventListener("keyup", (event) => handleKey(event) );
        return () => document.removeEventListener("keyup", handleKey);
        // eslint-disable-next-line
    }, [])

    return (
        <Row className="controls">
            <Col className="text-left" span={12}>                
                <Space>
                    <Button onClick={ props.onBack } ghost className="btn-gold" icon={<RollbackOutlined />}></Button>
                    <Button ghost onClick={ props.onSave } className="btn-gold" icon={<DownloadOutlined />}></Button>
                    <Upload accept=".ntsseq" showUploadList={false} beforeUpload={ file => props.onLoad(file) } customRequest={ () => false }>
                        <Button ghost className="btn-gold" icon={<UploadOutlined />}></Button>
                    </Upload>
                </Space>
            </Col>
            <Col className="text-right btn-group" span={12}>
                <Button onClick={ props.onPlay } ghost className="btn-gold" icon={<CaretRightOutlined />}></Button>
                <InputNumber onChange={ props.onTempo } className="control-number text-lcd" min={1} max={100000} defaultValue={props.tempo} />
            </Col>
        </Row>
    )
}

Controls.defaultProps = {
    tempo: 120,
    loop: 1,
    play: false,
    pianoroll: null
}