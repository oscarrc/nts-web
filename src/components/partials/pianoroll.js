import React, {useEffect, useRef} from 'react';

export function Pianoroll(props) {   
    const pianoroll = useRef();    

    const handleResize = (current) => {
        const actualWidth = document.getElementsByClassName('pianoroll-wrapper')[0]?.offsetWidth;
        const actualHeight = document.getElementsByClassName('main')[0]?.clientHeight - 
                             document.getElementsByClassName('footer')[0]?.clientHeight - 32;
        current.width = actualWidth;
        current.height = actualHeight;
    }

    useEffect( () => {
        const current = pianoroll.current;
        if(props.sequence){            
            const startingOctave = props.sequence.match(/o\d+\D/g)[1];
            const offset = startingOctave ? startingOctave.substring(1, startingOctave.length - 1) * 12 : 36;
            current.yoffset = offset > 96 ? 96 : offset;            
            current.setMMLString(props.sequence);
        }
    }, [props.sequence]);

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
            pianoroll.current.play(actx, (e) => props.playNote(e.n));
        }else if(typeof pianoroll.current.stop === "function"){
            pianoroll.current.stop();
        }
    }, [props.play]);

    useEffect( () => {        
        const current = pianoroll.current;
        current.tempo = props.tempo;
        current.loop = props.loop;
    }, [props.tempo, props.loop])

    return (
        <div className="pianoroll-wrapper">            
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
                yoffset={36}
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
        </div>
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
    octadj: 0,
    tempo: 120,
    play: false,
    sequence: ""
};