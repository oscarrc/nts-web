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
    const [pattern, setPattern] = useState(0);

    return {
        clock,
        patch,
        patches,
        pattern,
        setPattern,
        step,
        tempo
    }
}

export { useSequencer };