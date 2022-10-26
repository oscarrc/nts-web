import { useEffect, useState } from "react";

import { WebMidi } from 'webmidi';

const useMidi = () => {    
    const [ input, setInput ] = useState({ id: null, channel: "all", device: null });
    const [ output, setOutput ] = useState({ id: null, channel: "all", device: null });
    const [ passthrough, setPassthrough ] = useState({ id: null, channel: "all", device: null });
    
    const init = async () => { 
        await WebMidi.enable({ sysex: true });
    };

    useEffect(() => { init() }, []);
    
    return ({ 
            enabled: WebMidi.enabled,
            input,
            inputs: WebMidi.inputs,
            output,
            outputs: WebMidi.outputs,
            passthrough,
            setInput,
            setOutput,
            setPassthrough
         })
}

export { useMidi }