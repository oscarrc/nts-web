import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Row, Col } from 'antd';
import { Button, Knob, Dropdown } from '../../../components';
import { vcf } from '../../../config/midi';

export function Vcfilter() { 
    const vcfValues = useSelector(state => state.synthesizer).value.vcf;

    const renderControls = (ctrls, span, values) => {
        let controls = [];

        
        Object.keys(ctrls).forEach( (control) => {
            controls.push(
                <Col span={span}>
                    <Knob 
                        name={ctrls[control].label}
                        max={ctrls[control].max}
                        min={ctrls[control].min}
                        step={ctrls[control].step}
                        cc={ctrls[control].cc}
                        values={values[control]}
                    />
                </Col>
            )
        });

        return controls;
    }

    return  (
        <div className="vcf">
            <Divider className="text-gold">VCF</Divider>                       
            <Row className="select-row" justify="space-between">         
                <Col span={4}>                    
                    <Button 
                        name="vcf"
                        active={ vcfValues.active }
                        cc={ vcf.type.cc }
                        onValue={ vcf.type.values[vcfValues.type].value }
                        offValue={ 127 } 
                    />
                </Col>       
                <Col span={20}>
                    <Dropdown 
                        name="filter"
                        cc={ vcf.type.cc }
                        values={ vcf.type.values }
                        value={ vcfValues.type }
                        active={ vcfValues.active } 
                    />
                </Col>
            </Row>                     
            <Divider className="text-light">Filter</Divider>
            <Row>
                { renderControls(vcf.filter, 12, vcfValues.filter) }
            </Row>
            <Divider className="text-light">Sweep</Divider>
            <Row>                
                { renderControls(vcf.sweep, 12, vcfValues.sweep) }
            </Row>
        </div>
    );
}