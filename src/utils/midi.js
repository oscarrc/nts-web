import webmidi from 'webmidi';

const midiStart = () => {
    return new Promise((resolve, reject) => {
        webmidi.enable( (err) => {
            if (err) reject(err);
            resolve ({
                inputDevices: webmidi.inputs.map( d => { return {id: d.id, name: d.name } }),
                outputDevices: webmidi.outputs.map( d => { return {id: d.id, name: d.name } })
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

const midiPlayNote = (note, id, channel, play) => {
    let noteString =  ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];
    let octave = (note / 12) - 1;
    let noteIndex = (note % 12);
    
    octave = octave < 1 ? 0 :  Math.floor(octave)
    note = noteString[noteIndex] + octave;

    if(webmidi.enabled){
        const output = webmidi.getOutputById(id);

        if(output){
            if(play){
                output.playNote(note, channel);
            }else{
                output.stopNote(note, channel);
            }
        }
    }
}

const midiSendPitchBend = (value, id, channel) => {
    if(webmidi.enabled){
        const output = webmidi.getOutputById(id);

        if(output){
            output.sendPitchBend(value, channel);
        }
    }
}

export { midiStart, midiControlChange, midiPlayNote, midiSendPitchBend }