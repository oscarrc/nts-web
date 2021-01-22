import React from 'react';
import { Space, Row, Col } from 'antd';
import { useSelector } from 'react-redux';

export function Display() { 
    const isLoading = useSelector(state => state.loader).value;
    const controlValues = useSelector(state => state.synthesizer).value;
    const screen = useSelector(state => state.display).value;

    const renderLine = (values, span) => {
        const line = [];

        Object.keys(values).forEach( (key) => {
            if(typeof values[key] === 'object'){                
                line.push(
                    <Row>
                        <Col span={24}><h3>{key}</h3></Col>
                        {renderLine(values[key], 24/values[key].length)}
                    </Row>
                );
            }else{
                line.push(<Col span={span}>{key}: {values[key]}</Col>);
            }
        })

        return line;
    }

    const renderSection = (values, screen) => {
        let section = [
            <Col span={24}><h2>{screen}</h2></Col>
        ];

        Object.keys(values).forEach( (key) => {
            section.push(renderLine(values[key]));
        });

        return section;
    }

    const renderDisplay = (values) => {
        let content;

        switch(screen){
            case "welcome":
                content = (                    
                    <Col>
                        <h2>WELLCOME TO NTS-WEB</h2> 
                        <p>If you like it, please, support me by buying me a coffee.</p>
                        <p>Link at the bottom.</p>
                    </Col>                    
                )
                break;
            case "link":
                content = (                    
                    <Col>
                        <h2>LINK COPIED TO CLIPBOARD</h2> 
                        <p>Go and share it with your firends.</p>
                    </Col>                    
                )
                break;
            case "import":
                content = (                    
                    <Col>
                        <h2>PATCH IMPORTED</h2> 
                        <p>Your patch has been successfully imported.</p>
                    </Col>                    
                )
                break;
            default:
                content = renderSection(values[screen], screen)
                break;
        }

        return (
            <Row justify="center" align="middle" className="text-lcd">
                {content}
            </Row>
        )
    }

    return  (
        <Space className="display bg-grid">
            { isLoading ? 
                <h2 className="text-lcd">PLEASE, ALLOW THE APP TO USE YOUR MIDI DEVICES</h2> 
                : renderDisplay(controlValues)
            }
        </Space>
    );
}