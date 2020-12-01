import React, {useEffect, useState} from 'react';
import Lottie from 'lottie-react';
import webmidi from 'webmidi';
import { useDispatch } from 'react-redux';
import { loadEnd } from './loaderSlice';

import loader from '../../assets/loader.json'

export function Loader() {
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
        
    if(!midi){
        return <h1>MIDI IS NOT ENABLED</h1>
    }

    return <Lottie animationData={loader} />;
}