import { controls, sysex } from "../config/synth";
import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'

import { useMidi } from './useMidi';

const NTSContext = createContext();

const NTSReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const NTSProvider = ({ children }) => {
    const [state, setState] = useReducer(NTSReducer);
    const [currentControls, setControls] = useState(controls);
    const { input, output, channels } = useMidi();

    const getState = () => {}
    const saveSatate = () => {}

    const getUserPrograms = useCallback(() => {
        let type = 0;
        let bank = 0;
        const index = [88, 89, 90, 53];     

        const decode = (data) => {
            let name = data.slice(30, data.length -1 );
            let decoded = "";
            name.forEach(e => { if(e) decoded = decoded + String.fromCharCode(e) });
            return decoded.replace(/[^a-zA-Z0-9 -]/g, "")
        }

        const set = (object, cc, value) => {
            switch(cc){
                case 53:
                    object.osc.controls[0].options.push(value);
                    break;
                case 88:
                    object.effects.sections[0].controls[0].options.push(value);
                    break;
                case 89:
                    object.effects.sections[1].controls[0].options.push(value);
                    break;
                case 90:
                    object.effects.sections[2].controls[0].options.push(value);
                    break;
                default:
                    break;
            }
            
            return object
        }  

        const get = async (e) => {
            if (e.data.length === 53) setControls( c => set(c, index[type], { label: decode(e.data), value: 0 } ));

            if(bank < 16){
                bank++
                output.sendSysex(sysex.vendor, [48 + sysex.channel, 0, 1, sysex.device, 25, type, bank]);
            }else if(type < 4){
                bank = 0;
                type ++
                output.sendSysex(sysex.vendor, [48 + sysex.channel, 0, 1, sysex.device, 25, type, bank]);
            }else{
                input.removeListener("sysex", channels.input, get);
            }
        }

        
        if(!input) return setControls(controls);

        input.addListener("sysex", channels.input, get);
        output.sendSysex(sysex.vendor, [80, 0, 2]);
        output.sendSysex(sysex.vendor, [48 + sysex.channel, 0, 1, sysex.device, 25, 1, 0]);
    }, [channels.input, input, output])

    useEffect(() => { getUserPrograms() }, [getUserPrograms])
    
    return (
        <NTSContext.Provider value={{ state, setState }}>{ children }</ NTSContext.Provider>
    )
}

const useNTS = () => {
    const context = useContext(NTSContext);
    if(context === undefined) throw new Error("useNTS must be used within a NTSProvider")
    return context;
}

export { NTSProvider, useNTS };