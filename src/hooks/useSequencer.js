import { createContext, useContext, useEffect, useState } from "react";

const SequencerContext = createContext();

const SequencerProvider = ({children}) => {
    //TODO: sequencer
    const [step, setStep] = useState(0);
    const [steps, setSteps] = useState(16)
    const [sequence, setSequence] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [tempo, setTempo] = useState(parseInt(localStorage.getItem("TEMPO")) || 60);

    useEffect(() => { isPlaying && setIsRecording(false) }, [isPlaying]);
    useEffect(() => { isRecording && setIsPlaying(false) }, [isRecording]);
    useEffect(() => { localStorage.setItem("TEMPO", tempo) }, [tempo]);
    useEffect(() => {
        let interval;

        if(isPlaying) interval = setInterval(() => { setStep( s => s === steps -1 ? 0 : s + 1) }, 60000/tempo);
        else clearInterval(interval);

        return () => clearInterval(interval);
    }, [isPlaying, setStep, steps, tempo]);

    useEffect(() => {
        console.log(sequence[step])
    }, [step, sequence])

    return (
        <SequencerContext.Provider value={{
            sequence,
            setSequence,
            step,
            setStep,
            steps,
            setSteps,
            isPlaying,
            setIsPlaying,
            isRecording,
            setIsRecording,
            tempo,
            setTempo
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