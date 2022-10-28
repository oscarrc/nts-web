import { useCallback, useEffect, useReducer, useState } from "react";

import { WebMidi } from 'webmidi';
import { defaults } from "../config/midi";

const MidiReducer = (state, action) => {
    switch (action.type) {
        case "Available": 
            return {
                ...state,
                inputDevices: action.payload.inputDevices,
                outputDevices: action.payload.outputDevices,
                passthroughDevices: action.payload.passthroughDevices
            }
        case "Input":
            state.input = action.payload;
            return state;
        case "Output":
            state.output = action.payload;
            return state;
        case "Passthrough":
            state.passthrough = action.payload;
            return state;
        default:
            break;
    }
}

const useMidi = () => {    
    const [devices, setDevices] = useReducer(MidiReducer, defaults);
    const [enabled, setEnabled] = useState(WebMidi.enabled);
    
    const init = useCallback(async () => { 
        await WebMidi.enable({ sysex: true });
        setEnabled(WebMidi.enabled);
        parseDevices();
    }, [])

    const parseDevices = () => {
        const currentDevices = {
            inputDevices : WebMidi._inputs.filter(d => d._midiInput.name.includes("NTS")).map( i => i._midiInput),
            outputDevices : WebMidi._outputs.filter(d => d._midiOutput.name.includes("NTS")).map( o => o._midiOutput),
            passthroughDevices : WebMidi._inputs.filter(d => !d._midiInput.name.includes("NTS")).map( p => p.midiInput)
        }

        setDevices({type:"Available", payload: currentDevices});
    }

    useEffect(() => { init() }, [init]);

    useEffect(() => {
        WebMidi.addListener("connected", parseDevices)
        WebMidi.addListener("disconnected", parseDevices)

        return () => {
            WebMidi.removeListener("connected", parseDevices)
            WebMidi.removeListener("disconnected", parseDevices)
        }
    }, []);
    
    return ({ enabled, devices, setDevices })
}

export { useMidi }