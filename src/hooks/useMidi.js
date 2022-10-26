import { createContext, useContext, useEffect, useState } from "react";

import { WebMidi } from 'webmidi';

const MidiContext = createContext();

const MidiProvider = ({ children }) => {    
    const [ input, setInput ] = useState({ id: null, channel: "all", device: null });
    const [ output, setOutput ] = useState({ id: null, channel: "all", device: null });
    const [ passthrough, setPassthrough ] = useState({ id: null, channel: "all", device: null });
    
    const init = async () => { 
        await WebMidi.enable({ sysex: true });
    };

    useEffect(() => { init() }, []);
    
    return (
        <MidiContext.Provider value={{ 
            enabled: WebMidi.enabled,
            input,
            inputs: WebMidi.inputs,
            output,
            outputs: WebMidi.outputs,
            passthrough,
            setInput,
            setOutput,
            setPassthrough
         }}>
            { children }
        </MidiContext.Provider>
    )
}

const useMidi = () => {
    const context = useContext(MidiContext);
    if(context === undefined) throw new Error("useMidi must be used within a MidiProvider")
    return context;
}

export { MidiProvider, useMidi }