import webmidi from 'webmidi';

const midiStart = () => {
    return new Promise((resolve, reject) => {
        webmidi.enable( (err) => {
            if (err) reject(err);

            const devices = {
                inputDevices: webmidi.inputs.filter(d => d.name.includes("NTS")).map( d => { return {id: d.id, name: d.name } }),
                outputDevices: webmidi.outputs.filter(d => d.name.includes("NTS")).map( d => { return {id: d.id, name: d.name } }),
                passthroughDevices: webmidi.outputs.filter(d => !d.name.includes("NTS")).map( d => { return {id: d.id, name: d.name } }),
            }

            resolve({
                ...devices,
                inputDevice: devices.inputDevices?.length > 0 ? devices.inputDevices[0].id : "",
                outputDevice: devices.outputDevices?.length > 0 ? devices.outputDevices[0].id : "",
                passthorughDevice: devices.passthorughDevices?.length > 0 ? devices.outputDevices[0].id : ""
            })
        }, true);
    })
}

const midiListenPassthrough = (passDevice, passChannel, outputDevice, outputChannel) => {
    if(!webmidi.enabled) return;
    const passthrough = webmidi.getInputById(passDevice);

    const sendNote = (e) => midiPlayNote(e.value, outputDevice, outputChannel, e.type == "noteon" ? true : false, e.velocity);
    const sendPitchBend = (e) => midiSendPitchBend(e.value, outputDevice, outputChannel);

    if(passthrough){
        if(passthrough.hasListener('noteon', passChannel, sendNote)) passthrough.removeListener('noteon', passChannel, sendNote)
        else passthrough.addListener('noteon', passChannel, sendNote);
        if(passthrough.hasListener('noteoff', passChannel, sendNote)) passthrough.removeListener('noteoff', passChannel, sendNote)
        else passthrough.addListener('noteoff', passChannel, sendNote);
        if(passthrough.hasListener('pitchbend', passChannel, sendPitchBend)) passthrough.removeListener('pitchbend', passChannel, sendPitchBend)
        else passthrough.addListener('pitchbend', passChannel, sendPitchBend);
    }
}

const midiListenControlChange = (inputDevice, inputChannel, cb) => {
    if(!webmidi.enabled) return;
    const input = webmidi.getInputById(inputDevice);
    
    if(input){
        if(input.hasListener('controlchange', inputChannel, cb)) input.removeListener('controlchange', inputChannel, cb)
        else input.addListener('controlchange', inputChannel, cb);
    }
}


const midiPlayNote = (note, id, channel, play, velocity = false, duration = false) => {
    if(!webmidi.enabled) return;

    const output = webmidi.getOutputById(id);
    let options = {}
    if(velocity) options.velocity = velocity;
    if(duration) options.duration = duration*1000;

    if(output){
        if(play) output.playNote(note, channel, options);
        else output.stopNote(note, channel, options);
    }
}

const midiControlChange = (cc, value, id, channel) => {
    if(!webmidi.enabled) return;
    const output = webmidi.getOutputById(id);
    if(output) output.sendControlChange(cc, value, channel);
}

const midiSendPitchBend = (value, id, channel) => {
    if(!webmidi.enabled) return;

    const output = webmidi.getOutputById(id);        
    if(output) output.sendPitchBend(value, channel);
}

const midiGetUserPrograms = (inputId, outputId, inputChannel, vendor, device, channel) => {
    const index = [88, 89, 90, 53]
    let count = { 88: 0, 89: 0, 90: 0, 53: 0 };
    let type = 0;

    return new Promise((resolve, reject) => { 
        if(!webmidi.enabled || !inputId) reject(false);
        
        const input = webmidi.getInputById(inputId);
        const output = webmidi.getOutputById(outputId);
        const doCount = (e) => {
            if (e.data.length === 53)  count[index[type]]++
        }
        
        if(input.hasListener("sysex", inputChannel, doCount)) input.removeListener("sysex", inputChannel, doCount);
        else input.addListener("sysex", inputChannel, doCount);

        for(let t=1; t<5; t++){
            type = t;
            for(let b=0; b<16; b++)
                output.sendSysex(vendor, [48 + channel, 0, 1, device, 25, t, b]);
        }
        
        resolve(count);
    })
}

export { midiStart, midiListenPassthrough, midiListenControlChange, midiSendPitchBend, midiGetUserPrograms, midiControlChange, midiPlayNote }