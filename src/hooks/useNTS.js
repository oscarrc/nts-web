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
    const { input, output, passthrough, channels } = useMidi();
    const [ controls, setControls ] = useState(defaultControls);
    const [ bank, setBank ] = useState(localStorage.getItem("bank") || 0);
    const [ state, dispatch ] = useReducer(NTSReducer, defaultValues(controls, true));

    const randomize = () => {
        const random = defaultValues(defaultControls, true);        
        Object.keys(random).forEach( key =>  sendControlChange(parseInt(key), random[key]) );
        dispatch({ type: "bank", payload: random })

        return random;
    };

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
        const control = controls[cc];
        const hasSwitch = !isNaN(control?.switch);
        const isActive = value?.active === undefined ? true : value?.active;
        const val = hasSwitch ? (value.value >= control.switch ? value.value + 1 : value.value) : value;
        const options = control.options ? control.options.length  + (hasSwitch ? 0 : -1 ) : 1;
        const step = control.options ? Math.floor( 127 / options ) : 1;
        const parsed = control.options ? (val === options ? 127 : val * step) : val;
        
        output && output.sendControlChange(cc, isActive ? parsed : control.switch, { channels: channels.output || null })
        dispatch({type: cc, payload: value })
    }

    const switchBank = (b) => {
        let bank = JSON.parse(localStorage.getItem(`bank${b}`));

        if(!bank){
            bank = defaultValues(controls, true);
            localStorage.setItem(`bank${b}`, JSON.stringify(bank));
        }

        localStorage.setItem("bank", b);

        Object.keys(bank).forEach( key =>  sendControlChange(parseInt(key), bank[key]) );

        setBank(b);
        dispatch({ type: "bank", payload: bank})
    }

    useEffect(() => { input && getUserPrograms() }, [getUserPrograms, input]);

    useEffect(() => {
        input && !input.hasListener("controlchange", receiveControlChange ) && input.addListener("controlchange", receiveControlChange )
        passthrough && !passthrough.hasListener("controlchange", receiveControlChange ) && passthrough.addListener("controlchange", receiveControlChange )
        return () => {
            input && input.hasListener("controlchange", receiveControlChange ) && input.removeListener("controlchange", receiveControlChange );
            passthrough && passthrough.hasListener("controlchange", receiveControlChange ) && passthrough.removeListener("controlchange", receiveControlChange )
        }
    }, [receiveControlChange, input, passthrough]);
    
    return (
        <NTSContext.Provider 
            value={{
                controls,
                randomize,
                state, 
                setState: sendControlChange,
                bank,
                switchBank
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