import webmidi from 'webmidi';

const midiStart = () => {
    return new Promise((resolve, reject) => {
        webmidi.enable( (err) => {
            if (err) reject(err);
            
            resolve ({
                inputDevices: webmidi.inputs.filter(d => d.name.includes("NTS")).map( d => { return {id: d.id, name: d.name } }),
                outputDevices: webmidi.outputs.filter(d => d.name.includes("NTS")).map( d => { return {id: d.id, name: d.name } })
            })
        }, true);
    })
}

const midiControlChange = (cc, value, id, channel) => {
    if(webmidi.enabled){
        const output = webmidi.getOutputById(id);
        if(output) output.sendControlChange(cc, value, channel);
    }
}

const midiPlayNote = (note, id, channel, play, duration = false) => {
    const noteString =  ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];
    let octave = (note / 12);
    let noteIndex = (note % 12);
     
    octave = octave < 1 ? 0 :  Math.floor(octave)
    note = noteString[noteIndex] + octave;

    if(webmidi.enabled){
        const output = webmidi.getOutputById(id);

        if(output){
            let options = {};
            if (duration) options.duration = duration * 1000;
            
            if(play){
                output.playNote(note, channel, options);
            }else{
                output.stopNote(note, channel);
            }
        }
    }
}

const midiSendPitchBend = (value, id, channel) => {
    if(webmidi.enabled){
        const output = webmidi.getOutputById(id);        
        if(output) output.sendPitchBend(value, channel);
    }
}

const midiGetUserPrograms = (inputId, outputId, inputChannel, vendor, device, channel, cb) => {
    let type = 1;
    let bank = 0;
    const input = webmidi.getInputById(inputId);
    const output = webmidi.getOutputById(outputId);
    
    const requestAll = e => {
        cb(e, type);
        if(bank < 16){
            bank++
            output.sendSysex(vendor, [48 + channel, 0, 1, device, 25, type, bank]);
        }else if(type < 5){
            bank = 0;
            type ++
            output.sendSysex(vendor, [48 + channel, 0, 1, device, 25, type, bank]);
        }
    };
    
    if(webmidi.enabled && input){
        if(input.hasListener("sysex", inputChannel, requestAll)){
            input.removeListener("sysex", inputChannel, requestAll);
        }else{            
            input.addListener("sysex", inputChannel, requestAll);
        }

        output.sendSysex(vendor, [48 + channel, 0, 1, device, 25, type, bank])
    }
}

const midiListenControlChange = ( id, channel, cb ) => {
    const input = webmidi.getInputById(id);
    
    if(webmidi.enabled && input){
        if(input.hasListener("controlchange", channel, cb)){            
            input.removeListener("controlchange", channel, cb);
        }else{            
            input.addListener("controlchange", channel, cb);
        }
    }
}

export { midiStart, midiControlChange, midiPlayNote, midiSendPitchBend, midiListenControlChange, midiGetUserPrograms }