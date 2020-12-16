import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Row, Col } from 'antd';
import { Knob, Selector } from '../../../components';
import { arp } from '../../../config/midi';

export function Arpegiator() {   
    const arpValues = useSelector(state => state.synthesizer).value.arp;

    return  (
        <div className="arp">
            <Divider className="text-gold">ARP</Divider>
            <Row className="padded-row" justify="space-between">   
                <Col span={6}>
                    <Selector 
                        name="TYPE" 
                        max={ arp.type.values.length - 1 }
                        values={ arp.type.values }
                        cc={ arp.type.cc }
                        value={ arpValues.type }
                    />
                </Col>
                <Col span={6}>
                    <Selector 
                        name="SCALE"
                        max={ arp.scale.values.length - 1 }
                        values={ arp.scale.values }
                        cc={ arp.scale.cc }
                        value={ arpValues.scale }
                    />
                </Col>
                <Col span={6}>      
                    <Knob name={arp.length.label}
                        max={arp.length.max}
                        min={arp.length.min}
                        step={arp.length.step}
                        cc={arp.length.cc}
                        value={ arpValues.length }
                    />
                </Col>
            </Row>
        </div>
        
    );
}