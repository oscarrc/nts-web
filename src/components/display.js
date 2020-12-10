import React from 'react';
import { Space, Row, Col } from 'antd';
import { useSelector } from 'react-redux';

export function Display() { 
    const isLoading = useSelector(state => state.loader).value;
    const controlValues = useSelector(state => state.synthesizer).value;

    const renderDisplay = (values) => {
        return (
            <Row>
                <Col>
                    <p className="text-lcd">{JSON.stringify(values)}</p>
                </Col>
            </Row>
        )
    }

    return  (
        <Space className="display" direction="vertical">
            { isLoading ? 
                <h2 className="text-lcd">PLEASE, ALLOW THE APP TO USE YOUR MIDI DEVICES</h2> 
                : renderDisplay(controlValues)
            }
        </Space>
    );
}