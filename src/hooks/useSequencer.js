import { useState } from "react";

const useSequencer = () => {
    const [clock, setClock] = useState(null);
    const [tempo, setTempo] = useState(60);
    const [step, setStep] = useState(0)
    const [sequence, setSequence] = useState(null)

    return {
        clock,
        tempo,
        sequence,
        step
    }
}

export default useSequencer;