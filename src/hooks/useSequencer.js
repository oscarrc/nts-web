import { useState } from "react";

const useSequencer = () => {
    //TODO: implement clock and sequencer
    // input && input.addListener("clock", (e) => console.log(e) )
    // According to the standard, there are 24 MIDI clocks for every quarter note
    const [clock, setClock] = useState(null);
    const [tempo, setTempo] = useState(60);
    const [patch, setPatch] = useState(0);
    const [patches, setPatches] = useState([]);
    const [step, setStep] = useState(0);
    const [sequence, setSequence] = useState(null);

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