import webmidi from 'webmidi';

const midiStart = () => {
    return new Promise((resolve, reject) => {
        webmidi.enable( (err) => {
            if (err) reject(err);
            resolve ({
                inputDevices: webmidi.inputs,
                outputDevices: webmidi.outputs
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

const midiPlayNote = (note, id, channel, stop = false) => {
    if(webmidi.enabled){
        const output = webmidi.getOutputById(id);
        if(output){
            if(stop){
                output.stopNote(note, channel);
            }else{
                output.playNote(note, channel);
            }
        }
    }
}

export { midiStart, midiControlChange, midiPlayNote }