import React, {useEffect, useRef} from 'react';

export function Pianoroll(props) {    
    const pianoroll = useRef(null);

    useEffect( () => {  
        const handleResize = () => {
            const actualWidth = document.getElementsByClassName('pianoroll-wrapper')[0].offsetWidth;
            const actualHeight = document.getElementsByClassName('main')[0].clientHeight - document.getElementsByClassName('footer')[0].clientHeight;
            pianoroll.current.width = actualWidth;
            pianoroll.current.height = actualHeight;
        }

        handleResize();

        window.addEventListener("resize", handleResize);     

        return () => {
            window.removeEventListener("resize", handleResize);   
        };
    })

    return (
        <div className="pianoroll-wrapper">            
            <webaudio-pianoroll 
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
                ></webaudio-pianoroll>
        </div>
    );
}


Pianoroll.defaultProps = {
    xrange: 16,
    yrange: 16,
    timebase: 16,
    loop: 1,
    xscroll: 1,
    yscroll: 1,
    snap: 1,
    octadj: -1,
    tempo: 120
};