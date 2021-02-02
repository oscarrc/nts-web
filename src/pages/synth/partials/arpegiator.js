import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Knob, Selector } from '../../../components';

export function Arpegiator(props) {   
    const arpValues = props.values;
    const arp = props.spec;

    return  (
        <div className="arp">
            <Divider className="text-gold">ARP</Divider>
            <Row className="padded-row" justify="space-between">   
                <Col span={6}>
                    <Selector 
                        name="TYPE" 
                        max={ arp.type.values.length }
                        values={ arp.type.values }
                        cc={ arp.type.cc }
                        value={ arpValues.type }
                        path="arp.type"
                        vstep={ 14 }
                        offset={ 1 }
                    />
                </Col>
                <Col span={6}>
                    <Selector 
                        name="SCALE"
                        max={ arp.scale.values.length }
                        values={ arp.scale.values }
                        cc={ arp.scale.cc }
                        value={ arpValues.scale }
                        path="arp.scale"
                        vstep={ 25 }
                        offset={ 1 }
                    />
                </Col>
                <Col span={6}>      
                    <Knob name={arp.length.label}
                        max={arp.length.max}
                        min={arp.length.min}
                        step={arp.length.step}
                        cc={arp.length.cc}
                        value={ arpValues.length }
                        path="arp.length"
                    />
                </Col>
            </Row>
        </div>
        
    );
}