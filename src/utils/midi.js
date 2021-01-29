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

const midiGetUserPrograms = (id, vendor, device, channel, type) => {
    for(let i = 0; i<16; i++){
        webmidi.getOutputById(id).sendSysex(vendor, [48 + channel, 0, device, 25, type, i]);
    }
}

const midiListenControlChange = ( cb, id, channel, enable = true ) => {
    const input = webmidi.getInputById(id);
    if(webmidi.enabled && input){
        if(enable){
            input.addListener("controlchange", channel, cb);
            input.addListener("sysex", "all", function (e) {
                console.log(e);
            });
            webmidi.outputs[0].sendSysex(0x42, [0x50, 0x00, 0x02]);
            setTimeout( () => {
                webmidi.outputs[0].sendSysex(0x42, [0x00, 0x00, 0x57, 0x19, 0x01, 0x00]); 
            }, 1000)           
        }else{
            input.removeListener("controlchange", channel, cb);
        }
    }
}

export { midiStart, midiControlChange, midiPlayNote, midiSendPitchBend, midiListenControlChange, midiGetUserPrograms }