import { useEffect, useState } from "react";

const useSequencer = (tempo) => {
    //TODO: implement clock and sequencer
    // input && input.addListener("clock", (e) => console.log(e) )
    // According to the standard, there are 24 MIDI clocks for every quarter note

    const [clock, setClock] = useState(null);
    const [step, setStep] = useState(0);
    const [steps, setSteps] = useState(16)
    const [sequence, setSequence] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => { isPlaying && setIsRecording(false) }, [isPlaying]);
    useEffect(() => { isRecording && setIsPlaying(false) }, [isRecording]);    
    useEffect(() => {
        let interval;

        if(isPlaying) interval = setInterval(() => { setStep( s => s === steps -1 ? 0 : s + 1) }, 60000/tempo);
        else clearInterval(interval);

        return () => clearInterval(interval);
    }, [isPlaying, setStep, steps, tempo]);

    return {
        clock,
        sequence,
        setSequence,
        step,
        setStep,
        steps,
        setSteps,
        isPlaying,
        setIsPlaying,
        isRecording,
        setIsRecording
    }
}

export { useSequencer };