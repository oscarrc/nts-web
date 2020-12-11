import webmidi from 'webmidi';

const midiStart = (callback) => {
    webmidi.enable( (err) => {
        if (!err) callback();
    }, true);
}

const midiControlChange = (cc, value, id, channel) => {
    const output = webmidi.getOutputById(id);

    if(output) output.sendControlChange(cc, value, channel);
}

const midiPlayNote = (note, id, channel, stop = false) => {
    const output = webmidi.getOutputById(id);
    if(output){
        if(stop){
            output.stopNote(note, channel);
        }else{
            output.playNote(note, channel);
        }
    }
}

export { midiStart, midiControlChange, midiPlayNote }