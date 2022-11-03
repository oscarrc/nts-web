const defaultLayout = {
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
        type: "switch",
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


const octaveLayout = {
    'xs': 1,
    'sm': 1,
    'md': 1,
    'lg': 2,
    'xl': 3,
    '2xl': 3
}

export { defaultLayout, octaveLayout }