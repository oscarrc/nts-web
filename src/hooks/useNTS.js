import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { defaultControls, defaultValues, sysex, verifyValues } from "../config/synth";

import { useMidi } from './useMidi';

const NTSContext = createContext();

const NTSReducer = (state, action) => {
    let updated;
    const { bank, value } = action.payload;

    if(action.type === "bank") updated = value;
    else if(state[action.type] === undefined) updated = state;
    else updated = { ...state, [action.type]: value }

    localStorage.setItem(`BANK_${bank}`, JSON.stringify(updated));

    return updated;
}

const NTSProvider = ({ children }) => {
    const { input, output, passthrough, channels } = useMidi();
    const [ controls, setControls ] = useState(JSON.parse(localStorage.getItem("CONTROLS")) || defaultControls);
    const [ bank, setBank ] = useState(localStorage.getItem("BANK") || 0);
    const [ state, dispatch ] = useReducer(NTSReducer, defaultValues(controls, true));

    const randomize = () => {
        const random = defaultValues(defaultControls, true);        
        Object.keys(random).forEach( cc =>  sendControlChange(parseInt(cc), random[cc]) );
        dispatch({ type: "bank", payload: { bank, value: random } })
    };

    const decode = (data) => {
        let name = data.slice(30, data.length -1 );
        let decoded = "";
        name.forEach(e => { if(e) decoded = decoded + String.fromCharCode(e) });
        return decoded.replace(/[^a-zA-Z0-9 -]/g, "")
    }

    const restoreBank = (b, data) => {
        // if(!verifyValues(data, controls)) return; 
        if(b === bank){
            dispatch({type: "bank", payload: { bank, value: data } });        
            Object.keys(data).forEach( cc =>  sendControlChange(parseInt(cc), data[cc]) );
        }
        else localStorage.setItem(`BANK_${b}`, JSON.stringify(data));
    }
  
    const receiveControlChange = useCallback(( event ) => {
        const { rawValue, value, controller: { number }} = event;
        const control = controls[number];
        const hasSwitch = !isNaN(control.switch);        
        let parsed = control?.options ? 
                    Math.round(value * (control.options.length + (hasSwitch ? 0 : -1))) : 
                    control.min && control.max ? Math.round(control.min + ((control.max - control.min) / 127) * rawValue) : rawValue;
        
        if(hasSwitch) parsed = { ...state[number], ...( control.switch === rawValue ? { active: false } : { value: parsed, active: true })}
        
        dispatch({ type:number, payload: { bank, value: parsed } })
    }, [bank, controls, state]);

    const sendControlChange = useCallback((cc, value) => {
        const control = controls[cc];
        const hasSwitch = !isNaN(control?.switch);
        const isActive = value?.active === undefined ? true : value?.active;
        const val = hasSwitch ? (value.value >= control.switch ? value.value + 1 : value.value) : value;
        const options = control.options ? control.options.length  + (hasSwitch ? 0 : -1 ) : 1;
        const step = control.options ? Math.floor( 127 / options ) : 1;
        const parsed = control.options ? 
                        val === options ? 127 : val * step : 
                        control.min && control.max ? Math.round((127 / (control.max - control.min)) * (val - control.min)) : val;
       
        output && output.sendControlChange(cc, isActive ? parsed : control.switch, { channels: channels.output || null })
        dispatch({type: cc, payload: { bank, value } })
    }, [bank, channels.output, controls, output]);
    
    useEffect(() => {
        let b = JSON.parse(localStorage.getItem(`BANK_${bank}`)) || defaultValues(controls, true);
        
        localStorage.setItem("BANK", bank);
        Object.keys(b).forEach( cc =>  sendControlChange(parseInt(cc), b[cc]));
        dispatch({type: "bank", payload: { bank, value: b }});
    }, [bank, controls, sendControlChange]); // Switch to another bank or create it if it doesn't exists

    useEffect(() => {
        input && !input.hasListener("controlchange", receiveControlChange ) && input.addListener("controlchange", receiveControlChange )
        passthrough && !passthrough.hasListener("controlchange", receiveControlChange ) && passthrough.addListener("controlchange", receiveControlChange )
        
        return () => {
            input && input.hasListener("controlchange", receiveControlChange ) && input.removeListener("controlchange", receiveControlChange );
            passthrough && passthrough.hasListener("controlchange", receiveControlChange ) && passthrough.removeListener("controlchange", receiveControlChange )
        }
    }, [receiveControlChange, input, passthrough]);  // Listen for input from NTS or passthrough device

    useEffect(() => {  
        let type = 0;
        let bank = 0;
        let controls = defaultControls;
        const index = [88, 89, 90, 53]; 
       
        const get = (e) => {
            if (e.data.length === 53){
                const decoded = decode(e.data)
                !controls[index[type-1]]?.options.includes(decoded) && controls[index[type-1]]?.options.push(decode(e.data))
            };

            if(bank < 16){
                bank++
                output.sendSysex(sysex.vendor, [48 + sysex.channel, 0, 1, sysex.device, 25, type, bank]);
            }else if(type < 4){
                bank = 0;
                type ++
                output.sendSysex(sysex.vendor, [48 + sysex.channel, 0, 1, sysex.device, 25, type, bank]);
            }else{ 
                setTimeout(()=> {
                    input.removeListener("sysex", channels.input, get);
                    localStorage.setItem("CONTROLS", JSON.stringify(controls));
                    setControls(controls)
                }, 200);
            }
        }
                         
        if(!input || !output) return setControls(defaultControls);        
        input.addListener("sysex", channels.input, get);
        output.sendSysex(sysex.vendor, [80, 0, 2]);
        output.sendSysex(sysex.vendor, [48 + sysex.channel, 0, 1, sysex.device, 25, 1, 0]);
    }, [channels.input, input, output]) // Get user oscilators and effects
    
    return (
        <NTSContext.Provider 
            value={{
                controls,
                randomize,
                state, 
                setState: sendControlChange,
                bank,
                setBank,
                restoreBank
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