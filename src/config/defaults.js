const defaultPatch = {
    osc: {
        type: 0,
        shape: 0,
        alt: 0
    },
    arp: {
        type: 0,
        scale: 0,
        length: 0,
    },
    amp: {
        type: 0,
        eg: {
            attack: 0,
            release: 0,
        },
        trem: {
            depth: 0,
            rate: 0
        },
        lfo: {
            rate: 0,
            depth: 0
        }
    },
    effects: {
        mod: {
            active: 0,
            type: 0,
            time: 0,
            depth: 0
        },
        delay: {
            active: 0,
            type:0,
            time: 0,
            depth: 0,
            mix: 0
        },
        reverb: {
            active: 0,
            type: 0,
            time: 0,
            depth: 0,
            mix: 0
        }
    },
    vcf: {
        active: 0,
        type: 0,
        filter: {
            cutoff: 0,
            res: 0
        },
        sweep: {
            depth: 0,
            rate: 0
        }
    }
};

const defaultSettings = {
    outputDevices: [],
    outputDevice: "",
    outputChannel: "all",
    inputDevices: [],
    inputDevice: "",
    inputChannel: "all",
    settings: false
}

export { defaultPatch, defaultSettings }