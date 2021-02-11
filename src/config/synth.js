const controls = {
    osc: {
        label: "OSC",
        controls: [
            {
                label: "Type",
                type: "selector",
                cc: 53,
                min: 0,
                max: 4,
                step: 31
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
                step: 14
            },
            {
                label: "Scale",
                type: "selector",
                cc: 118,
                min: 0,
                max: 5,
                step: 25
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
                step: 31
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
                        max: 5,
                        step: 21
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
                        step: 21
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
                        step: 21
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
                step: 21
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

const strings = {
    53: [
        "Sawtooth",
        "Triangle",
        "Square",
        "VPN",
        "Alt",
        "User 1",
        "User 2",
        "User 3",
        "User 4 ",
        "User 5",
        "User 6",
        "User 7",
        "User 8",
        "User 9",
        "User 10",
        "User 11",
        "User 12",
        "User 13",
        "User 14",
        "User 15",
        "User 16"
    ],
    117: [
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
    ],
    118: [
        "Octave",
        "Major Triad",
        "Major Suspended",
        "Major Augumented",
        "Minor Triad",
        "Minor Diminished"
    ],
    14: [
        "ADSR",
        "AHR",
        "AR",
        "AR Loop",
        "Open"
    ],
    88: [
        "Off",
        "Chorus",
        "Ensemble",
        "Phaser",
        "Flanger",
        "Random",
        "User 1",
        "User 2",
        "User 3",
        "User 4 ",
        "User 5",
        "User 6",
        "User 7",
        "User 8",
        "User 9",
        "User 10",
        "User 11",
        "User 12",
        "User 13",
        "User 14",
        "User 15",
        "User 16"
    ],
    89: [
        "Off",
        "Stereo",
        "Mono",
        "Ping Pong",
        "High Pass",
        "Tape",
        "User 1",
        "User 2",
        "User 3",
        "User 4 ",
        "User 5",
        "User 6",
        "User 7",
        "User 8"
    ],
    90: [
        "Off",
        "Hall",
        "Plate",
        "Space",
        "Riser",
        "Submarine",
        "User 1",
        "User 2",
        "User 3",
        "User 4 ",
        "User 5",
        "User 6",
        "User 7",
        "User 8"
    ],
    42: [
        "LowPass 2p",
        "LowPass 4p",
        "BandPass 2p",
        "BandPass 4p",
        "HighPass 2p",
        "HighPass 4p",
        "Off"
    ]
}

const defaults = (config, strings) => {
    let defaultConfig = {};

    const values = (control) =>  {
        let value = {
            value:  control.min ? control.min * control.step : 0,
        }

        if(strings[control.cc]) value.svalue = strings[control.cc][control.min || 0]
        if(control.max) value.max =  control.max;
        if(control.min) value.min =  control.min;
        if(control.step) value.step =  control.step;
        if(control.switch || control.type == "switch") value.active = 0;

        return value;
    }

    Object.keys(config).forEach( k => {
        if(config[k].controls)
            config[k].controls.forEach( c => {
                defaultConfig[c.cc] = {
                    ...defaultConfig[c.cc],
                    ...values(c)
                }
            })
        
        if(config[k].sections)
            config[k].sections.forEach( s => {
                s.controls.forEach( c => {
                    defaultConfig[c.cc] = {
                        ...defaultConfig[c.cc],
                        ...values(c)
                    }
                })
            })
    })

    return defaultConfig;
}

export { controls, strings, defaults }