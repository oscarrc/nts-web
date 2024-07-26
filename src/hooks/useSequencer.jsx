import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const SequencerContext = createContext();

const SequencerProvider = ({children}) => {
    //TODO: sequencer
    const [barLength, setBarLength] = useState(parseInt(localStorage.getItem("BAR")) || 4);
    const [bars, setBars] = useState(parseInt(localStorage.getItem("BARS")) || 1);
    const [step, setStep] = useState(0);
    const [sequence, setSequence] = useState(JSON.parse(localStorage.getItem("SEQ")) || {});
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [metronome, setMetronome] = useState(true);
    const [tempo, setTempo] = useState(parseInt(localStorage.getItem("TEMPO")) || 60);
    const steps = useMemo(() => bars * barLength, [bars, barLength])
    const prevStep = useRef(0);

    const audioContext = useRef(new AudioContext());

    const playBeat = useCallback((step) => {
        const osc = audioContext.current.createOscillator();
        const envelope = audioContext.current.createGain();
        const time = audioContext.current.currentTime;
       
        osc.frequency.value = (step % barLength === 0) ? 1000 : 800;
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);        

        osc.connect(envelope);
        envelope.connect(audioContext.current.destination);

        osc.start(time);
        osc.stop(time + 0.03);
    }, [barLength])

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

    const clearStep = (step) => {
        let s = sequence;
        delete s[step];
        setSequence(s);
    }

    useEffect(() => { !isPlaying && setIsRecording(false) }, [isPlaying]);
    useEffect(() => { isPlaying && isRecording && metronome && playBeat(step) }, [isPlaying, isRecording, metronome, playBeat, step]);
    
    useEffect(() => { localStorage.setItem("TEMPO", tempo) }, [tempo]);
    useEffect(() => { localStorage.setItem("BAR", barLength) }, [barLength]);
    useEffect(() => { localStorage.setItem("BARS", bars) }, [bars]);
    useEffect(() => { localStorage.setItem("SEQ", JSON.stringify(sequence)) }, [sequence]);

    useEffect(() => {
        let interval;
        
        if(isPlaying) interval = setInterval(() => setStep(s => s === steps - 1 ? 0 : s + 1), 60000/tempo);
        else clearInterval(interval);

        return () => clearInterval(interval);
    }, [isPlaying, isRecording, playBeat, setStep, tempo, metronome, steps]);

    return (
        <SequencerContext.Provider value={{
            bars,
            setBars,
            barLength,
            setBarLength,
            isPlaying,
            setIsPlaying,
            isRecording,
            setIsRecording,
            metronome,
            setMetronome,
            sequence,
            setSequence,
            step,
            setStep,
            clearStep,
            steps,
            stepStart,
            stepEnd,
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