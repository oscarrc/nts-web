import { createContext, useContext, useEffect, useRef, useState } from "react";

const SequencerContext = createContext();

const SequencerProvider = ({children}) => {
    //TODO: sequencer
    //TODO: Audible metronome
    const [step, setStep] = useState(0);
    const [steps, setSteps] = useState(16)
    const [sequence, setSequence] = useState(JSON.parse(localStorage.getItem("SEQ")) || {});
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [metronome, setMetronome] = useState(false);
    const [tempo, setTempo] = useState(parseInt(localStorage.getItem("TEMPO")) || 60);
    const prevStep = useRef(0);

    const stepStart = (note,bank) => {
        prevStep.current = step;

        setSequence( s => ({
            ...s, 
            [step]: {
                note,
                bank,
                length: 1
            }}
        ))
    }

    const stepEnd = () => {
        const length =  step - prevStep.current + 1;

        setSequence( s => ({
            ...s,
            [prevStep.current]: { 
                ...s[prevStep.current],
                length: length < 1 ? 1 : length
            }
        }))
    }

    useEffect(() => { !isPlaying && setIsRecording(false) }, [isPlaying]);
    useEffect(() => { localStorage.setItem("TEMPO", tempo) }, [tempo]);
    useEffect(() => { localStorage.setItem("SEQ", JSON.stringify(sequence)) }, [sequence]);
    useEffect(() => {
        let interval;

        if(isPlaying) interval = setInterval(() => { setStep( s => s === steps -1 ? 0 : s + 1) }, 60000/tempo);
        else clearInterval(interval);

        return () => clearInterval(interval);
    }, [isPlaying, setStep, steps, tempo]);

    return (
        <SequencerContext.Provider value={{
            sequence,
            setSequence,
            step,
            setStep,
            steps,
            setSteps,
            stepStart,
            stepEnd,
            isPlaying,
            setIsPlaying,
            isRecording,
            setIsRecording,
            tempo,
            setTempo,
            metronome,
            setMetronome
        }}>
            {children}
        </SequencerContext.Provider>
    )
}

const useSequencer = () => {
    const context = useContext(SequencerContext);
    if(context === undefined) throw new Error("useSequencer must be used within a SequencerProvider")
    return context;
}

export { useSequencer, SequencerProvider };