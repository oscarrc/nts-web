import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Row, Col, Button, InputNumber  } from 'antd';
import { CaretRightOutlined, RollbackOutlined } from '@ant-design/icons';
import { Capacitor, Plugins, Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { Bank } from '../partials';

import { importData, exportData } from '../../utils/files';

export function Controls(props) {  
    const dispatch = useDispatch();    
    const history = useHistory();
    const { Modals } = Plugins;

    const setTempo = (tempo) => dispatch({type:"sequencer/setTempo", payload: tempo });
    const togglePlay = () => {
        const pianoroll = document.getElementById(props.pianoroll);
        if(props.play) dispatch({ type: 'sequencer/setSequence', payload: { sequence: pianoroll.getMMLString() }}); 
        dispatch({type: "sequencer/togglePlay"});
    }    
    const setBank = (bank) => {
        const pianoroll = document.getElementById(props.pianoroll);
        dispatch({ type: 'sequencer/setSequence', payload: { sequence: pianoroll.getMMLString() }}); 
        dispatch({ type:"sequencer/setBank", payload: bank })
    }

	const importSequence = async (file, bank) => {
		const sequence = await importData(file);
		dispatch({ type: "sequencer/setSequence", payload: {
            sequence: sequence,
            bank: bank
        }});
        dispatch( {type: "display/setDisplay", payload: {
            title: "Sequence imported",
            text: "Sequence has been imported to bank " + (bank + 1)
        }});
    }  
    
	const exportSequence = async (bank) => {
        let sequence;
        const pianoroll = document.getElementById(props.pianoroll);
        if(bank === props.bank) sequence = pianoroll.getMMLString()
        else sequence = props.sequences[bank];

        if(Capacitor.platform === 'android'){
            const { value, cancelled } = await Modals.prompt({
                title: `Sequence name`,
                message: `Enter sequence name`
            });
            
            if(!cancelled){
                await Filesystem.writeFile({
                    path: `nts-web/${value || 'sequence' + new Date() }.ntsseq`,
                    data: decodeURIComponent(encodeURI(JSON.stringify(sequence))),
                    directory: FilesystemDirectory.Documents,
                    encoding: FilesystemEncoding.UTF8,
                    recursive: true
                });
            }
        }else{ 
		    exportData(sequence, "sequence.ntsseq");
        }
	}
    
	const goBack = () => {
		const pianoroll = document.getElementById(props.pianoroll);
		dispatch({ type:'sequencer/stopPlay' });
		dispatch({ type: 'sequencer/setSequence', payload: {
            sequence: pianoroll?.getMMLString()
        }});

		pianoroll?.stop();
		history.push("/");
    }
    
    const renderButtons = () => {
        let buttons = [];

        for (let i = 0; i < 6; i++) {
            buttons.push(
                <Col span={8} lg={4} xl={24} key={ "seq" + i } >
                    <Bank label="Seq" accept=".ntsSeq" bank={i} active={ props.bank === i } onClick={setBank} onImport={importSequence} onExport={exportSequence} />
                </Col>
            )
        }

        return buttons;
    }

    useEffect( () => {
        const handleKey = (event) => { if (event.keyCode === 32) props.onPlay() };
        document.addEventListener("keyup", (event) => handleKey(event) );
        return () => document.removeEventListener("keyup", handleKey);
        // eslint-disable-next-line
    }, [])

    return (
        <Row className="controls-wrapper" align="space-between">
            <Col span={12} order={1} xl={{ order: 1, span: 24 }} className="btn-group">
                <Button onClick={ togglePlay } ghost className={ "btn-gold " + (props.play ? "active" : "")} icon={<CaretRightOutlined />}></Button>
                <InputNumber onChange={ setTempo } className="control-number text-lcd" min={1} max={100000} defaultValue={props.tempo} />
            </Col>
            <Col span={24} order={3} xl={{ order: 2, span: 24 }} className="bank-selector">
                <Row justify="space-between" gutter={[0,10]}>
                    { renderButtons() }
                </Row>
            </Col>
            <Col span={12} order={2} xl={{ order: 3, span: 24 }} >
                <Button onClick={ goBack } ghost className="btn-gold back" icon={<RollbackOutlined />}> Back</Button>
            </Col>
        </Row>
    )
}

Controls.defaultProps = {
    tempo: 120,
    loop: 1,
    play: false,
    bank: 0,
    pianoroll: "pianoroll"
}