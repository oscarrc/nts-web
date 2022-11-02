const controls = {    
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
        cc: 119
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
        label: "Type",
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
        label: "Type",
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
        label: "Type",
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

const layout = {
    osc: {
        label: "OSC",
        controls: [53, 54, 55]
    },
    arp: {
        label: "ARP",
        controls: [117, 118, 119]
    },
    amp: {
        label: "AMP",
        controls: [14],
        sections: [
            {
                label: "EG",
                controls: [16, 19]
            },
            {
                label: "Tremolo",
                controls: [20, 21]
            },
            {
                label: "LFO",
                controls: [24, 26]
            }
        ]
    },
    effects: {
        label: "EFFECTS",
        controls: [88, 89, 90],
        sections: [
            {
                label: "Mod",
                controls: [88, 28, 29, 0]
            },
            {
                label: "Delay",
                controls: [89, 30, 31, 33]
            },
            {
                label: "Reverb",
                controls: [90, 34, 35, 36]
            }
        ]
    },
    vcf: {
        label: "VCF",
        controls: [42],
        sections:  [
            {
                label: "Filter",
                controls: [43, 44]
            },
            {
                label: "Sweep",
                controls: [45, 46]
            }
        ]
    }
}


const defaultControls = {
    osc: {
        label: "OSC",
        controls: [
            {
                label: "Type",
                type: "selector",
                cc: 53,
                options: [
                    "Sawtooth",
                    "Triangle",
                    "Square",
                    "VPN"
                ]
            },
            {        
                label: "Shape",
                type: "knob",
                cc: 54
            },
            {
                label: "Alt",
                type: "knob",
                cc: 55
            }
        ]
    },
    arp: {
        label: "ARP",
        controls: [
            {
                label: "Type",
                type: "selector",
                cc: 117,
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
            {
                label: "Scale",
                type: "selector",
                cc: 118,
                options: [
                    "Octave",
                    "Major Triad",
                    "Major Suspended",
                    "Major Augumented",
                    "Minor Triad",
                    "Minor Diminished"
                ]
            },
            {
                label: "Length",            
                type: "knob",
                cc: 119
            }
        ]
    },
    amp: {
        label: "AMP",
        controls: [
            {
                label: "Type",
                type: "dropdown",
                cc: 14,
                options: [
                    "ADSR",
                    "AHR",
                    "AR",
                    "AR Loop",
                    "Open"
                ]
            }
        ],
        sections: [
            {
                label: "EG",
                controls: [
                    {
                        label: "Attack",
                        type: "knob",
                        cc: 16
                    },
                    {
                        label: "Release",
                        type: "knob",
                        cc: 19
                    }
                ]
            },
            {
                label: "Tremolo",
                controls: [
                    {
                        label: "Depth",
                        type: "knob",
                        cc: 20
                    },
                    {
                        label: "Rate",
                        type: "knob",
                        cc: 21
                    }
                ]
            },
            {
                label: "LFO",
                controls: [
                    {
                        label: "Rate",
                        type: "knob",
                        cc: 24
                    },
                    {
                        label: "Depth",
                        type: "knob",
                        cc: 26
                    }
                ]
            }
        ]
    },
    effects: {
        label: "EFFECTS",
        controls: [
            {
                label: "Mod",
                type: "switch",
                cc: 88,
                switch: 0
            },
            {
                label: "Delay",
                type: "switch",
                cc: 89,
                switch: 0
            },
            {
                label: "Reverb",
                type: "switch",
                cc: 90,
                switch: 0
            }
        ],
        sections: [
            {
                label: "Mod",
                controls: [
                    {
                        label: "Type",
                        type: "selector",
                        cc: 88,
                        switch: 0,
                        options: [
                            // { label: "Off", value: 0 },
                            "Chorus",
                            "Ensemble",
                            "Phaser",
                            "Flanger"
                        ]
                    },
                    {
                        label: "Time",
                        type: "knob",
                        cc: 28
                    },
                    {
                        label: "Depth",
                        type: "knob",
                        cc: 29
                    },
                    {
                        label: "Dummy",
                        type: "dummy",
                        cc: 0,
                    }
                ]
            },
            {
                label: "Delay",
                controls: [
                    {
                        label: "Type",
                        type: "selector",
                        cc: 89,
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
                    {
                        label: "Time",
                        type: "knob",
                        cc: 30
                    },
                    {
                        label: "Depth",
                        type: "knob",
                        cc: 31
                    },
                    {
                        label: "Mix",
                        type: "knob",
                        cc: 33
                    }
                ]
            },
            {
                label: "Reverb",
                controls: [
                    {
                        label: "Type",
                        type: "selector",
                        cc: 90,
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
                    {
                        label: "Time",
                        type: "knob",
                        cc: 34
                    },
                    {
                        label: "Depth",
                        type: "knob",
                        cc: 35
                    },
                    {
                        label: "Mix",
                        type: "knob",
                        cc: 36
                    }
                ]
            }
        ]
    },
    vcf: {
        label: "VCF",
        controls: [
            {
                label: "Type",
                type: "dropdown",
                cc: 42,
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
            }
        ],
        sections: [
            {
                label: "Filter",
                controls: [
                    {
                        label: "Cutoff",
                        type: "knob",
                        cc: 43
                    },
                    {
                        label: "Resonance",
                        type: "knob",
                        cc: 44
                    }
                ]
            },
            {
                label: "Sweep",
                controls: [
                    {
                        label: "Depth",
                        type: "knob",
                        cc: 45
                    },
                    {
                        label: "Rate",
                        type: "knob",
                        cc: 46
                    }
                ]
            }
        ]
    }
}


const octaveLimits = {
    'xs': 1,
    'sm': 1,
    'md': 1,
    'lg': 2,
    'xl': 3,
    '2xl': 3
}


const sysex = {
    vendor: 66,
    channel: 0,
    device: 87
}

const defaultValues = (controls, random = false) => {
    const values = {};

    const getRandom = (control) => {
        if(control.min && control.max) return Math.floor(Math.random() * (control.max - control.min + 1) + control.min);
        if(control.options) return Math.floor(Math.random() * (control.options.length));
        if(control.type === "switch") return Math.random() < .5;
        else return Math.floor(Math.random() * 255);
    }

    const setValue = (control) => {
        if( control.type === "switch" ){
            values[control.cc] = {
                ...(values[control.cc] || {}), 
                active: random ? getRandom(control) : false
            }
        }else if (control.switch !== undefined ){
            values[control.cc] = {
                ...(values[control.cc] || {}), 
                ...(control.type === "dropdown" && { active: Math.random() < .5 }),
                value: random ? getRandom(control) : control.min ? control.min : 0
            }
        }else{
            values[control.cc] = random ? getRandom(control) : control.min ? control.min : 0;
        }
    }

    Object.keys(controls).forEach(key => {
        const current = controls[key];

        current.controls.forEach( control => setValue(control))
    
        current.sections && current.sections.forEach( section => {
            section.controls.forEach( control => setValue(control) )
        })
    });

    return values;
}

const getControlByCC = (cc, controls) => {
    const synth = Object.keys(controls);
    let found;

    synth.forEach( key => {
        controls[key].controls.forEach( c => {
            if( c.cc === cc && c.type !== "switch") found = c;
            else if( c.sections?.length ){
                c.sections.forEach( s => {
                    s.controls.forEach( c => {
                        if(c.cc === cc ) found = c;
                    })
                })
            }
        })
    })

    return found;
}

export { defaultControls, octaveLimits, sysex, defaultValues, getControlByCC }