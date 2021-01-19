export const osc = {
    type: {
        cc: 53,
        values: [
            {
                value: 0,
                label: "Sawtooth"
            },
            {
                value: 31,
                label: "Triangle"
            },
            {
                value: 62,
                label: "Square"
            },
            {
                value: 93,
                label: "VPN"
            },
            {
                value: 127,
                label: "Alt"
            }
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
};

export const arp = {
    type: {
        cc: 117,
        values: [
            {
                value: 0,
                label: "Up"
            },
            {
                value: 14,
                label: "Down"
            },
            {
                value: 28,
                label: "Up-Down"
            },
            {
                value: 42,
                label: "Down-Up"
            },
            {
                value: 56,
                label: "Converge"
            },
            {
                value: 70,
                label: "Diverge"
            },
            {
                value: 84,
                label: "Conv.-Div."
            },
            {
                value: 98,
                label: "Div.-Conv."
            },
            {
                value: 112,
                label: "Random"
            },
            {
                value: 127,
                label: "Stchastic"
            }
        ]
    },
    scale: {
        cc: 118,
        values: [
            {
                value: 0,
                label: "Octave"
            },
            {
                value: 25,
                label: "Major Triad"
            },
            {
                value: 50,
                label: "Major Suspended"
            },
            {
                value: 75,
                label: "Major Augumented"
            },
            {
                value: 100,
                label: "Minor Triad"
            },
            {
                value: 127,
                label: "Minor Diminished"
            }
        ]
    },
    length: {
        min: 0,
        max: 127,
        step: 1,
        label: "Length",
        cc: 119
    }
};

export const amp = {
    type: {
        cc: 14,
        values: [
            {
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
}

export const effects = {
    mod: {
        type: {
            cc: 88,
            values: [
                {
                    value: 0,
                    label: "Off"
                },
                {
                    value: 25,
                    label: "Chorus"
                },
                {
                    value: 50,
                    label: "Ensemble"
                },
                {
                    value: 75,
                    label: "Phaser"
                },
                {
                    value: 100,
                    label: "Flanger"
                },
                {
                    value: 127,
                    label: "Random"
                }
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
                {
                    value: 0,
                    label: "Off"
                },
                {
                    value: 25,
                    label: "Stereo"
                },
                {
                    value: 50,
                    label: "Mono"
                },
                {
                    value: 75,
                    label: "Ping Pong"
                },
                {
                    value: 100,
                    label: "Hight Pass"
                },
                {
                    value: 127,
                    label: "Tape"
                }
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
                {
                    value: 0,
                    label: "Off"
                },
                {
                    value: 25,
                    label: "Hall"
                },
                {
                    value: 50,
                    label: "Plate"
                },
                {
                    value: 75,
                    label: "Space"
                },
                {
                    value: 100,
                    label: "Riser"
                },
                {
                    value: 127,
                    label: "Submarine"
                }
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
};

export const vcf = {
    type: {
        cc: 42,
        values: [
            {
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
};

export const channels = [
    "0",
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