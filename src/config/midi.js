export const synth = {
    osc: {
        type: {
            cc: 53,
            values: [
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
            ]
        },
        shape: {
            min: 0,
            max: 127,
            step: 1,
            label: "Shape",
            cc: 54
        },
        alt: {
            min: 0,
            max: 127,
            step: 1,
            label: "Alt",
            cc: 55
        }
    },
    arp: {
        type: {
            cc: 117,
            values: [
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
        scale: {
            cc: 118,
            values: [
                "Octave",
                "Major Triad",
                "Major Suspended",
                "Major Augumented",
                "Minor Triad",
                "Minor Diminished"
            ]
        },
        length: {
            min: 0,
            max: 127,
            step: 1,
            label: "Length",
            cc: 119
        }
    },
    amp: {
        type: {
            cc: 14,
            values: [{
                    value: 0,
                    label: "ADSR"
                },
                {
                    value: 31,
                    label: "AHR"
                },
                {
                    value: 62,
                    label: "AR"
                },
                {
                    value: 93,
                    label: "AR Loop"
                },
                {
                    value: 127,
                    label: "Open"
                }
            ]
        },
        eg: {
            attack: {
                min: 0,
                max: 127,
                step: 1,
                label: "Attack",
                cc: 16
            },
            release: {
                min: 0,
                max: 127,
                step: 1,
                label: "Release",
                cc: 19
            },
        },
        trem: {
            depth: {
                min: 0,
                max: 127,
                step: 1,
                label: "Depth",
                cc: 20
            },
            rate: {
                min: 0,
                max: 127,
                step: 1,
                label: "Rate",
                cc: 21
            }
        },
        lfo: {
            rate: {
                min: 0,
                max: 127,
                step: 1,
                label: "Rate",
                cc: 24
            },
            depth: {
                min: 0,
                max: 127,
                step: 1,
                label: "Depth",
                cc: 26
            }
        }
    },
    effects: {
        mod: {
            type: {
                cc: 88,
                values: [
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
                ]
            },
            time: {
                min: 0,
                max: 127,
                step: 1,
                label: "Time",
                cc: 28
            },
            depth: {
                min: 0,
                max: 127,
                step: 1,
                label: "Depth",
                cc: 29
            }
        },
        delay: {
            type: {
                cc: 89,
                values: [
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
                ]
            },
            time: {
                min: 0,
                max: 127,
                step: 1,
                label: "Time",
                cc: 30
            },
            depth: {
                min: 0,
                max: 127,
                step: 1,
                label: "Depth",
                cc: 31
            },
            mix: {
                min: 0,
                max: 127,
                step: 1,
                label: "Mix",
                cc: 33
            }
        },
        reverb: {
            type: {
                cc: 90,
                values: [
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
                ]
            },
            time: {
                min: 0,
                max: 127,
                step: 1,
                label: "Time",
                cc: 34
            },
            depth: {
                min: 0,
                max: 127,
                step: 1,
                label: "Depth",
                cc: 35
            },
            mix: {
                min: 0,
                max: 127,
                step: 1,
                label: "Mix",
                cc: 36
            }
        }
    },
    vcf: {
        type: {
            cc: 42,
            values: [{
                    value: 0,
                    label: "LowPass 2p"
                },
                {
                    value: 21,
                    label: "LowPass 4p"
                },
                {
                    value: 42,
                    label: "BandPass 2p"
                },
                {
                    value: 63,
                    label: "BandPass 4p"
                },
                {
                    value: 84,
                    label: "HighPass 2p"
                },
                {
                    value: 105,
                    label: "HighPass 4p"
                },
                {
                    value: 127,
                    label: "Off"
                }
            ]
        },
        filter: {
            cutoff: {
                min: 0,
                max: 127,
                step: 1,
                label: "Cutoff",
                cc: 43
            },
            res: {
                min: 0,
                max: 127,
                step: 1,
                label: "Resonance",
                cc: 44
            },
        },
        sweep: {
            depth: {
                min: 0,
                max: 127,
                step: 1,
                label: "Depth",
                cc: 45
            },
            rate: {
                min: 0,
                max: 127,
                step: 1,
                label: "Rate",
                cc: 46
            }
        }
    }
}

export const cc = {
    53: "osc.type",
    54: "osc.shape",
    55: "osc.alt",
    117: "arp.type",
    118: "arp.scale",
    119: "arp.lenght",
    14: "amp.type",
    16: "amp.eg.attack",
    19: "amp.eg.release",
    20: "amp.trem.depth",
    21: "amp.trem.rate",
    24: "amp.lfo.rate",
    26: "amp.lfo.depth",
    88: "effects.mod.type",
    28: "effects.mod.time",
    29: "effects.mod.depth",
    89: "effects.delay.type",
    30: "effects.delay.time",
    31: "effects.delay.depth",
    33: "effects.delay.mix",
    90: "effects.reverb.type",
    34: "effects.reverb.time",
    35: "effects.reverb.depth",
    36: "effects.reverb.mix",
    42: "vcf.type",
    43: "vcf.filter.cutoff",
    44: "vcf.filter.res",
    45: "vcf.sweep.depth",
    46: "vcf.sweep.rate",
}

export const channels = [
    "all",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16"
];

export const sysex = ["mod", "delay", "reverb", "osc"]