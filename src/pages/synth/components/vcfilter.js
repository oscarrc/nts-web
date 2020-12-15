import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Row, Col } from 'antd';
import { Button, Knob, Dropdown } from '../../../components';
import { vcf } from '../../../config/midi';

export function Vcfilter() { 
    const vcfValues = useSelector(state => state.synthesizer).value.vcf;

    return  (
        <div className="vcf">
            <Divider className="text-gold">VCF</Divider>                       
            <Row className="select-row" justify="space-between">         
                <Col span={4}>                    
                    <Button name="vcf" active={ vcfValues.active } cc={ vcf.type.cc } onValue={ vcf.type.values[vcfValues.type].value } offValue={ 127 } />
                </Col>       
                <Col span={20}>
                    <Dropdown name="filter" cc={ vcf.type.cc } values={ vcf.type.values } value={ vcfValues.type } active={ vcfValues.active } />
                </Col>
            </Row>                     
            <Divider className="text-light">Filter</Divider>
            <Row>
                <Col span={12}>
                    <Knob name={vcf.filter.cutoff.label} max={vcf.filter.cutoff.max} min={vcf.filter.cutoff.min} step={vcf.filter.cutoff.step} cc={vcf.filter.cutoff.cc} value={ vcfValues.filter.cutoff } />
                </Col>
                <Col span={12}>
                    <Knob name={vcf.filter.res.label} max={vcf.filter.res.max} min={vcf.filter.res.min} step={vcf.filter.res.step} cc={vcf.filter.res.cc} value={ vcfValues.filter.res } />
                </Col>
            </Row>
            <Divider className="text-light">Sweep</Divider>
            <Row>                
                <Col span={12}>
                    <Knob name={vcf.sweep.rate.label} max={vcf.sweep.rate.max} min={vcf.sweep.rate.min} step={vcf.sweep.rate.step} cc={vcf.sweep.rate.cc} value={ vcfValues.sweep.rate } />
                </Col>
                <Col span={12}>
                    <Knob name={vcf.sweep.depth.label} max={vcf.sweep.depth.max} min={vcf.sweep.depth.min} step={vcf.sweep.depth.step} cc={vcf.sweep.depth.cc} value={ vcfValues.sweep.depth } />
                </Col>
            </Row>
        </div>
    );
}