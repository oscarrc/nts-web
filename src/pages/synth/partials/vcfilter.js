import React from 'react';
import { Divider, Row, Col } from 'antd';
import { Button, Knob, Dropdown } from '../../../components';

export function Vcfilter(props) { 
    const vcfValues = props.values;
    const vcf = props.spec;

    const renderControls = (ctrls, span, values, path) => {
        let controls = [];

        Object.keys(ctrls).forEach( (control) => {
            controls.push(
                <Col span={ span } key={ctrls[control].label + ctrls[control].cc}>
                    <Knob 
                        name={ ctrls[control].label }
                        max={ ctrls[control].max }
                        min={ ctrls[control].min }
                        step={ ctrls[control].step }
                        cc={ ctrls[control].cc }
                        value={ values[control] }
                        path={ path + '.' + control }
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
                        path="vcf.active"
                    />
                </Col>       
                <Col span={20}>
                    <Dropdown 
                        name="filter"
                        cc={ vcf.type.cc }
                        values={ vcf.type.values }
                        value={ vcfValues.type }
                        active={ vcfValues.active } 
                        path="vcf.type"
                    />
                </Col>
            </Row>                     
            <Divider className="text-light">Filter</Divider>
            <Row>
                { renderControls(vcf.filter, 12, vcfValues.filter, "vcf.filter") }
            </Row>
            <Divider className="text-light">Sweep</Divider>
            <Row>                
                { renderControls(vcf.sweep, 12, vcfValues.sweep, "vcf.sweep") }
            </Row>
        </div>
    );
}