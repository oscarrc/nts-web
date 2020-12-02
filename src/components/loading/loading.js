import React, {useEffect, useState} from 'react';
import webmidi from 'webmidi';

import { useDispatch } from 'react-redux';

import { loadEnd } from '../../features/loader';

import './loading.css';

export function Loading() { 
    const [midi, setMidi] = useState(true);   
    const dispatch = useDispatch();
    
    useEffect(() => {  
        webmidi.enable( (err) => {
            if (err) {
                setMidi(false);
            }else{
                dispatch(loadEnd())
            }
            
        }, true);
    });

    return  (
        <h2 className="text-lcd">
            { midi ? "Please, allow the app to use midi ": "ERROR. MIDI is not enabled for this app" }
        </h2>
    );
}