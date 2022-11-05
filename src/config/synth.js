const defaultControls = {    
    0: {
        label: "Dummy",
        type: "dummy"
    },
    53: {
        label: "Type",
        type: "selector",
        options: [
            "Sawtooth",
            "Triangle",
            "Square",
            "VPN"
        ]
    },
    54: {        
        label: "Shape",
        type: "knob"
    },
    55: {
        label: "Alt",
        type: "knob"
    },
    117: {
        label: "Type",
        type: "selector",
        options: [
            "Up",
            "Down",
            "Up-Down",
            "Down-Up",
            "Converge",
            "Diverge",
            "Conv.-Div.",
            "Div.-Conv.",
            "Random",
            "Stchastic"
        ]
    },
    118: {
        label: "Scale",
        type: "selector",
        options: [
            "Octave",
            "Major Triad",
            "Major Suspended",
            "Major Augumented",
            "Minor Triad",
            "Minor Diminished"
        ]
    },
    119: {
        label: "Length",            
        type: "knob",
        min: 1,
        max: 24
    },
    14:{
        label: "Type",
        type: "dropdown",
        options: [
            "ADSR",
            "AHR",
            "AR",
            "AR Loop",
            "Open"
        ]
    },
    16: {
        label: "Attack",
        type: "knob"
    },
    19: {
        label: "Release",
        type: "knob"
    },
    20: {
        label: "Depth",
        type: "knob"
    },
    21: {
        label: "Rate",
        type: "knob"
    },
    24: {
        label: "Rate",
        type: "knob"
    },
    26: {
        label: "Depth",
        type: "knob"
    },
    88: {
        label: "Mod",
        type: "selector",
        switch: 0,
        options: [
            // { label: "Off", value: 0 },
            "Chorus",
            "Ensemble",
            "Phaser",
            "Flanger"
        ]
    },
    28: {
        label: "Time",
        type: "knob"
    },
    29: {
        label: "Depth",
        type: "knob"
    },
    89: {
        label: "Delay",
        type: "selector",
        switch: 0,
        options: [
            // { label: "Off", value: 0 },
            "Stereo",
            "Mono",
            "Ping Pong",
            "High Pass",
            "Tape"
        ]
    },
    30: {
        label: "Time",
        type: "knob"
    },
    31: {
        label: "Depth",
        type: "knob"
    },
    33: {
        label: "Mix",
        type: "knob"
    },
    90: {
        label: "Reverb",
        type: "selector",
        switch: 0,
        options: [
            // { label: "Off", value: 0 },
            "Hall",
            "Plate",
            "Space",
            "Riser",
            "Submarine"
        ]
    },
    34: {
        label: "Time",
        type: "knob"
    },
    35: {
        label: "Depth",
        type: "knob"
    },
    36: {
        label: "Mix",
        type: "knob"
    },
    42:  {
        label: "Type",
        type: "dropdown",
        switch: 127,
        options: [
            "LowPass 2p",
            "LowPass 4p",
            "BandPass 2p",
            "BandPass 4p",
            "HighPass 2p",
            "HighPass 4p"
            // { label: "Off", value: 0 }
        ]
    },    
    43: {
        label: "Cutoff",
        type: "knob"
    },
    44: {
        label: "Resonance",
        type: "knob"
    },    
    45: {
        label: "Depth",
        type: "knob"
    },
    46: {
        label: "Rate",
        type: "knob"
    }
}

const sysex = {
    vendor: 66,
    channel: 0,
    device: 87
}

const defaultValues = (controls, random = false) => {
    let values = {};

    Object.keys(controls).forEach(cc => {
        let value;
        const control = controls[cc];
        const { min = 0, max = 127} = control;

        if(control.options) {
            value = random ? Math.floor(Math.random() * (control.options.length)) : min;
            if(control.switch !== undefined) value = { value: value, active: random ? Math.random() < .5 : false }    
        }    
        else value = random ? Math.floor(Math.random() * (max - min + 1) + min) : min;

        values[cc] = value;
    })

    return values;
}

export { defaultControls, sysex, defaultValues }