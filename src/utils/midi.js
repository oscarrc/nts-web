import webmidi from 'webmidi';

const midiStart = () => {
    webmidi.disable();
    return new Promise((resolve, reject) => {
        webmidi.enable( (err) => {
            if (err) reject(err);
            const devices = {
                inputDevices: webmidi.inputs.filter(d => d.name.includes("NTS")).map( d => { return {id: d.id, name: d.name } }),
                outputDevices: webmidi.outputs.filter(d => d.name.includes("NTS")).map( d => { return {id: d.id, name: d.name } }),
                passthroughDevices: webmidi.inputs.filter(d => !d.name.includes("NTS")).map( d => { return {id: d.id, name: d.name } }),
            }
            
            resolve({
                ...devices,
                inputDevice: devices.inputDevices?.length > 0 ? devices.inputDevices[0].id : "",
                outputDevice: devices.outputDevices?.length > 0 ? devices.outputDevices[0].id : "",
                passthroughDevice: devices.passthroughDevices?.length > 0 ? devices.passthroughDevices[0].id : ""
            })
        }, true);
    })
}

const midiDeviceDetection = (cb) => {
    if(!webmidi.enabled) return;
    if(webmidi.hasListener("connected", cb)) webmidi.removeListener("connected", cb);
    if(webmidi.hasListener("disconnected", cb)) webmidi.removeListener("disconnected", cb);
    webmidi.addListener("connected", cb);
    webmidi.addListener("disconnected", cb);
}

const midiListenPassthrough = (passDevice, passChannel, outputDevice, outputChannel) => { 
    if(!webmidi.enabled) return;
    const passthrough = webmidi.getInputById(passDevice);
    
    const sendNote = (e) => midiPlayNote(e.note.number, outputDevice, outputChannel, e.type === "noteon" ? true : false, e.velocity);
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
    let strings = { 88: [], 89: [], 90: [], 53: [] }

    return new Promise((resolve, reject) => { 
        if(!webmidi.enabled || !inputId) reject(!inputId ? "nodevice" : "error");
        
        const input = webmidi.getInputById(inputId);
        const output = webmidi.getOutputById(outputId);
        let type = 1;
        let bank = 0;

        const decodeName = (data) => {
            let name = data.slice(30, data.length -1 );
            let decoded = "";
            name.forEach(e => { if(e) decoded = decoded + String.fromCharCode(e) });
            return decoded.replace(/[^a-zA-Z0-9 -]/g, "")
        }

        const doCount = (e) => {
            if (e.data.length === 53) {
                count[index[type - 1]] = count[index[type - 1]] + 1
                strings[index[type - 1]].push(decodeName(e.data))
            }
            
            if(bank < 16){
                bank++
                output.sendSysex(vendor, [48 + channel, 0, 1, device, 25, type, bank]);
            }else if(type < 5){
                bank = 0;
                type ++
                output.sendSysex(vendor, [48 + channel, 0, 1, device, 25, type, bank]);
            }else{
                setTimeout(()=> {
                    input.removeListener("sysex", inputChannel, doCount);
                    resolve({count, strings})
                }, 250)
            }
        }

        input.addListener("sysex", inputChannel, doCount);
        output.sendSysex(vendor, [80, 0, 2]);
        output.sendSysex(vendor, [48 + channel, 0, 1, device, 25, 1, 0]);
    })
}

export { midiStart, midiDeviceDetection, midiListenPassthrough, midiListenControlChange, midiSendPitchBend, midiGetUserPrograms, midiControlChange, midiPlayNote }
