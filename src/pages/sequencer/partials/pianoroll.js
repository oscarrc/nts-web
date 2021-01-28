import React, {useEffect, useRef} from 'react';
import { Row, Col  } from 'antd';
import { useSelector } from 'react-redux';
import { midiPlayNote } from '../../../utils/midi';

export function Pianoroll(props) {   
    const midiConfig = useSelector(state => state.midi).value; 
    const pianoroll = useRef();    

    const handleResize = (current) => {
        const actualWidth = document.getElementsByClassName('pianoroll-wrapper')[0].offsetWidth;
        const actualHeight = document.getElementsByClassName('main')[0].clientHeight - 
                             document.getElementsByClassName('footer')[0].clientHeight - 32;
        current.width = actualWidth;
        current.height = actualHeight;
    }

    useEffect( () => {
        const current = pianoroll.current;
        if(props.seq) current.setMMLString(props.seq);
    });

    useEffect( () => {  
        const current = pianoroll.current;
        window.addEventListener("resize", () => handleResize(current));
        setTimeout(() => handleResize(current), 100);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect( () => {
        if(props.play){
            const actx = new AudioContext();
            actx.resume();
            pianoroll.current.play(actx, (e) => midiPlayNote(e.n, midiConfig.outputDevice, midiConfig.outputChannel, true, e.g - e.t));
        }else if(typeof pianoroll.current.stop === "function"){
            pianoroll.current.stop();
        }
    }, [props.play, midiConfig]);

    useEffect( () => {        
        const current = pianoroll.current;
        current.tempo = props.tempo;
        current.loop = props.loop;
    }, [props.tempo, props.loop])

    return (
        <Row>
            { props.play }
            <Col className="pianoroll-wrapper">            
                <webaudio-pianoroll
                    id="pianoroll"
                    ref={pianoroll}
                    wheelzoom={1}
                    xrange={props.xrange}
                    yrange={props.yrange}
                    timebase={props.timebase}
                    loop={props.loop}
                    xscroll={props.xscroll}
                    yscroll={props.yscroll}
                    snap={props.snap}
                    octadj={props.octadj}
                    tempo={props.tempo}
                    collt="#eee"
                    coldk="#b4b4b4"
                    colgrid="#212122"
                    colrulerbg="#212122"
                    colrulerfg="#f3cc62"
                    colnote="#2a1215"
                    colnotesel="#d32029"
                    colnoteborder="#434343"
                    editmode="dragmono"
                    preload={0}
                ></webaudio-pianoroll>
            </Col>
        </Row>
    );
};


Pianoroll.defaultProps = {
    xrange: 16,
    yrange: 32,
    timebase: 16,
    loop: 1,
    xscroll: 1,
    yscroll: 1,
    snap: 1,
    octadj: -2,
    tempo: 120,
    play: false,
    seq: ""
};