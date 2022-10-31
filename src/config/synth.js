const controls = {
    osc: {
        label: "OSC",
        controls: [
            {
                label: "Type",
                type: "selector",
                cc: 53,
                min: 0,
                max: 3,
                step: 42,
                options: [
                    { label: "Sawtooth", value: 0 },
                    { label: "Triangle", value: 0 },
                    { label: "Square", value: 0 },
                    { label: "VPN", value: 0 }
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
                min: 0,
                max: 9,
                step: 14,
                options: [
                    { label: "Up", value: 0 },
                    { label: "Down", value: 0 },
                    { label: "Up-Down", value: 0 },
                    { label: "Down-Up", value: 0 },
                    { label: "Converge", value: 0 },
                    { label: "Diverge", value: 0 },
                    { label: "Conv.-Div.", value: 0 },
                    { label: "Div.-Conv.", value: 0 },
                    { label: "Random", value: 0 },
                    { label: "Stchastic", value: 0 }
                ]
            },
            {
                label: "Scale",
                type: "selector",
                cc: 118,
                min: 0,
                max: 5,
                step: 25,
                options: [
                    { label: "Octave", value: 0 },
                    { label: "Major Triad", value: 0 },
                    { label: "Major Suspended", value: 0 },
                    { label: "Major Augumented", value: 0 },
                    { label: "Minor Triad", value: 0 },
                    { label: "Minor Diminished", value: 0 }
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
                min: 0,
                max: 4,
                step: 31,
                options: [
                    { label: "ADSR", value: 0 },
                    { label: "AHR", value: 0 },
                    { label: "AR", value: 0 },
                    { label: "AR Loop", value: 0 },
                    { label: "Open", value: 0 }
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
                        min: 1,
                        max: 4,
                        step: 42,
                        options: [
                            { label: "Off", value: 0 },
                            { label: "Chorus", value: 0 },
                            { label: "Ensemble", value: 0 },
                            { label: "Phaser", value: 0 },
                            { label: "Flanger", value: 0 }
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
                        min: 1,
                        max: 5,
                        step: 31,
                        options: [
                            { label: "Off", value: 0 },
                            { label: "Stereo", value: 0 },
                            { label: "Mono", value: 0 },
                            { label: "Ping Pong", value: 0 },
                            { label: "High Pass", value: 0 },
                            { label: "Tape", value: 0 }
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
                        min: 1,
                        max: 5,
                        step: 31,
                        options: [
                            { label: "Off", value: 0 },
                            { label: "Hall", value: 0 },
                            { label: "Plate", value: 0 },
                            { label: "Space", value: 0 },
                            { label: "Riser", value: 0 },
                            { label: "Submarine", value: 0 }
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
                min: 0,
                max: 5,
                step: 21,
                options: [
                    { label: "LowPass 2p", values: 0 },
                    { label: "LowPass 4p", values: 0 },
                    { label: "BandPass 2p", values: 0 },
                    { label: "BandPass 4p", values: 0 },
                    { label: "HighPass 2p", values: 0 },
                    { label: "HighPass 4p", values: 0 },
                    { label: "Off", values: 0 }
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

const defaults = (controls, random = false) => {
    const values = {};

    const getRandom = (control) => {
        if(control.min && control.max) return Math.floor(Math.random() * (control.max - control.min + 1) + control.min);
        if(control.options) return Math.floor(Math.random() * (control.options.length + 1));
        if(control.type === "switch") return Math.round(Math.random());
        else return Math.floor(Math.random() * 255);
    }

    Object.keys(controls).forEach(key => {
        const current = controls[key];

        current.controls.forEach( control => {            
            values[control.cc] = random ? getRandom(control) : control.min ? control.min : 0;
        })
    
        current.sections && current.sections.forEach( section => {
            section.controls.forEach( control => {            
                values[control.cc] = random ? getRandom(control) : control.min ? control.min : 0;
            })
        })
    });

    return values;
}

export { controls, octaveLimits, sysex, defaults }