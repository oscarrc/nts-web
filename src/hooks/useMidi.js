import { defaultChannels, defaultDevices } from "../config/midi";
import { useCallback, useEffect, useReducer, useState } from "react";

import { WebMidi } from 'webmidi';

const DeviceReducer = (state, action) => {
    switch (action.type) {
        case "All": 
            return {
                ...state,
                inputDevices: action.payload.inputDevices,
                outputDevices: action.payload.outputDevices,
                passthroughDevices: action.payload.passthroughDevices
            }
        case "Input":
            return { ...state, input: action.payload }
        case "Output":
            return { ...state, output: action.payload }
        case "Passthrough":
            return { ...state, passthrough: action.payload }
        default:
            break;
    }
}

const ChannelReducer = (state, action) => {
    switch (action.type) {
        case "All":
            return action.payload;
        case "Input":
            return { ...state, input: action.payload }
        case "Output":
            return { ...state, output: action.payload }
        case "Passthrough":
            return { ...state, passthrough: action.payload }
        default:
            break;
    }
}

const useMidi = () => {    
    const [devices, setDevices] = useReducer(DeviceReducer, defaultDevices );
    const [channels, setChannels] = useReducer(ChannelReducer, defaultChannels);
    const [enabled, setEnabled] = useState(WebMidi.enabled);
    const [octave, setOctave] = useState(3);
    
    const input = () => devices.inputDevices[devices.input];
    const output = () => devices.outputDevices[devices.output];
    const passthrough = () => devices.passthroughDevices[devices.passthrough];

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

        if(currentDevices.inputDevices.length) setDevices({ type: "Input", payload: 0 });
        if(currentDevices.outputDevices.length) setDevices({ type: "Output", payload: 0 });
        if(currentDevices.passthroughDevices.length) setDevices({ type: "Passthrough", payload: 0 });

        setDevices({type:"All", payload: currentDevices});
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
    
    return ({ enabled, devices, setDevices, channels, setChannels, octave, setOctave })
}

export { useMidi }