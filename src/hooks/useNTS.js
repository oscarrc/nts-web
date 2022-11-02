import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { defaultControls, defaultValues, sysex } from "../config/synth";

import { useMidi } from './useMidi';

const NTSContext = createContext();

const NTSReducer = (state, action) => {
    if(action.type === "bank") return action.payload;
    else if(state[action.type] === undefined) return state;
    else return { ...state, [action.type]: action.payload }
}

const NTSProvider = ({ children }) => {
    const { input, output, channels } = useMidi();
    const [ controls, setControls ] = useState(defaultControls);
    const [ state, dispatch ] = useReducer(NTSReducer, defaultValues(controls, true));
    const randomize = () => dispatch({ type: "bank", payload: defaultValues(defaultControls, true) });

    // TODO: debug get user programs and why selectors don't update
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

        const get = async (e) => {
            if (e.data.length === 53) setControls( c => {
                c[index[type-1]]?.options.push(decode(e.data));
                return c;
            })

            if(bank < 16){
                bank++
                output.sendSysex(sysex.vendor, [48 + sysex.channel, 0, 1, sysex.device, 25, type, bank]);
            }else if(type < 4){
                bank = 0;
                type ++
                output.sendSysex(sysex.vendor, [48 + sysex.channel, 0, 1, sysex.device, 25, type, bank]);
            }else{ 
                setTimeout(()=> input.removeListener("sysex", channels.input, get), 200);
            }
        }
        
        setControls(defaultControls);
        
        if(!input || !output) return setControls(defaultControls);
        input.addListener("sysex", channels.input, get);
        output.sendSysex(sysex.vendor, [80, 0, 2]);
        output.sendSysex(sysex.vendor, [48 + sysex.channel, 0, 1, sysex.device, 25, 1, 0]);
    }, [channels.input, input, output]);
  
    const receiveControlChange = useCallback(( event ) => {
        const { rawValue, value, controller: { number }} = event;
        
        const control = controls[number];
        const hasSwitch = !isNaN(control.switch);

        let parsed = control?.options ? Math.round(value * (control.options.length + (hasSwitch ? 0 : -1 )  ) ) : rawValue;
        
        if(hasSwitch) parsed = { ...state[number], ...( control.switch === rawValue ? { active: false } : { value: parsed, active: true })}
        
        dispatch({ type:number, payload: parsed })
    }, [controls, state]);

    const sendControlChange = (cc, value) => {
        // TODO: parse  value
        const control = controls[cc];
        const hasSwitch = !isNaN(control?.switch)
        let parsed = value;

        if(hasSwitch) parsed = value.active === false ? control.switch : Math.round(127/( control.options.length  + (hasSwitch ? 0 : -1 )) )
        
        output.sendControlChange(cc, parsed, { channels: channels.output })
        dispatch({type: cc, payload: value })
    }

    useEffect(() => { input && getUserPrograms() }, [getUserPrograms, input]);

    useEffect(() => { //TODO: Listen passthrough control changes
        if(!input) return;
        !input.hasListener("controlchange", receiveControlChange ) && input.addListener("controlchange", receiveControlChange )
        return () => input.hasListener("controlchange", receiveControlChange ) && input.removeListener("controlchange", receiveControlChange )
    }, [receiveControlChange, input]);
    
    return (
        <NTSContext.Provider 
            value={{
                controls,
                randomize,
                state, 
                setState: sendControlChange
            }}
        >
            { children }
        </ NTSContext.Provider>
    )
}

const useNTS = () => {
    const context = useContext(NTSContext);
    if(context === undefined) throw new Error("useNTS must be used within a NTSProvider")
    return context;
}

export { NTSProvider, useNTS };