export const defaultPath = {
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
            active: false,
            type: 0,
            time: 0,
            depth: 0
        },
        delay: {
            active: false,
            type:0,
            time: 0,
            depth: 0,
            mix: 0
        },
        reverb: {
            active: false,
            type: 0,
            time: 0,
            depth: 0,
            mix: 0
        }
    },
    vcf: {
        active: false,
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