import { channelList, defaultChannels, defaultDevices } from "../config/midi";
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";

import { WebMidi } from 'webmidi';

const MidiContext = createContext();

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

const MidiProvider = ({ children }) => {    
    const [devices, setDevices] = useReducer(DeviceReducer, defaultDevices );
    const [channels, setChannels] = useReducer(ChannelReducer, defaultChannels);
    const [enabled, setEnabled] = useState(WebMidi.enabled);
    const [octave, setOctave] = useState(3);
    
    const input = useMemo(() => devices.inputDevices[devices.input], [devices.input, devices.inputDevices]);
    const output = useMemo(() => devices.outputDevices[devices.output], [devices.output, devices.outputDevices]);
    const passthrough = useMemo(() => devices.passthroughDevices[devices.passthrough], [devices.passthrough, devices.passthroughDevices]);

    const init = useCallback(async () => { 
        await WebMidi.enable({ sysex: true });
        setEnabled(WebMidi.enabled);
        parseDevices();
    }, [])

    const parseDevices = () => {
        const currentDevices = {
            inputDevices : WebMidi._inputs.filter(d => d._midiInput.name.includes("NTS")),
            outputDevices : WebMidi._outputs.filter(d => d._midiOutput.name.includes("NTS")),
            passthroughDevices : WebMidi._inputs.filter(d => !d._midiInput.name.includes("NTS"))
        }

        if(currentDevices.inputDevices.length) setDevices({ type: "Input", payload: 0 });
        if(currentDevices.outputDevices.length) setDevices({ type: "Output", payload: 0 });
        if(currentDevices.passthroughDevices.length) setDevices({ type: "Passthrough", payload: 0 });
        setDevices({type:"All", payload: currentDevices});
    }

    const playNote = (note, play = true, velocity = false, duration = false) => {
        let options = {
            channels: channelList[channels.output],
            ...( velocity && { velocity } ),
            ...( duration && { duration } )
        }
        if(velocity) options.velocity = velocity;
        if(duration) options.duration = duration*1000;
    
        if(output){
            if(play) output.playNote(note, options);
            else output.stopNote(note, options);
        }
    }
    
    const controlChange = (cc, value) => {
        if(output) output.sendControlChange(cc, value, channelList[channels.output]);
    }
    
    const pitchBend = (value) => {      
        if(output) output.sendPitchBend(value, channelList[channels.output]);
    }

    useEffect(() => { init() }, [init]);

    useEffect(() => {
        !WebMidi.hasListener("connected", parseDevices) && WebMidi.addListener("connected", parseDevices)
        !WebMidi.hasListener("connected", parseDevices) && WebMidi.addListener("disconnected", parseDevices)

        return () => {
            WebMidi.hasListener("connected", parseDevices) && WebMidi.removeListener("connected", parseDevices)
            WebMidi.hasListener("connected", parseDevices) && WebMidi.removeListener("disconnected", parseDevices)
        }
    }, []);

    useEffect(() => {
        if(!passthrough) return;
        !passthrough.hasForwarder(output) && passthrough.addForwarder(output)

        return () => {
            passthrough.hasForwarder(output) && passthrough.removeForwarder(output);
        }
    }, [passthrough, output])
    
    return (
        <MidiContext.Provider value={{
            enabled, 
            devices, 
            setDevices, 
            channels, 
            setChannels, 
            octave, 
            setOctave, 
            playNote, 
            controlChange, 
            pitchBend,
            input
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