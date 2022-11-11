import { useEffect, useState } from "react";

const useSequencer = () => {
    //TODO: implement clock and sequencer
    // input && input.addListener("clock", (e) => console.log(e) )
    // According to the standard, there are 24 MIDI clocks for every quarter note

    const [clock, setClock] = useState(null);
    const [tempo, setTempo] = useState(60);
    const [step, setStep] = useState(0);
    const [sequence, setSequence] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => { isPlaying && setIsRecording(false) }, [isPlaying]);
    useEffect(() => { isRecording && setIsPlaying(false) }, [isRecording]);

    return {
        clock,
        sequence,
        setSequence,
        step,
        setStep,
        tempo,
        setTempo,
        isPlaying,
        setIsPlaying,
        isRecording,
        setIsRecording
    }
}

export { useSequencer };