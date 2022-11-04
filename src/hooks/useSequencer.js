import { useState } from "react";

const useSequencer = () => {
    //TODO: implement clock and sequencer
    // input && input.addListener("clock", (e) => console.log(e) )
    // According to the standard, there are 24 MIDI clocks for every quarter note

    const [clock, setClock] = useState(null);
    const [tempo, setTempo] = useState(60); // 60bpm
    const [patch, setPatch] = useState(0);
    const [patches, setPatches] = useState([]);
    const [step, setStep] = useState(0);
    const [sequence, setSequence] = useState([
        {
            note: "C4",
            duration: 24 //  1/4 Tiempo -> 96 clocks
        },
        {
            note: "D3",
            duration: 96 //  1 Tiempo -> 96 clocks
        }
    ]);

    return {
        clock,
        patch,
        patches,
        sequence,
        step,
        tempo
    }
}

export default useSequencer;