import { osc, arp, amp, vcf, effects } from '../config/midi';

const randomPatch = () => {
    const patch = {
        osc: {
            type: Math.floor(Math.random() * osc.type.values.length),
            shape: Math.floor(Math.random() * (osc.shape.max + 1)),
            alt: Math.floor(Math.random() * (osc.alt.max + 1)),
        },
        arp: {
            type: Math.floor(Math.random() * arp.type.values.length),
            scale: Math.floor(Math.random() * arp.type.values.length),
            length: Math.floor(Math.random() * (arp.length.max + 1)),
        },
        amp: {
            type: Math.floor(Math.random() * amp.type.values.length),
            eg: {
                attack: Math.floor(Math.random() * (amp.eg.attack.max + 1)),
                release: Math.floor(Math.random() * (amp.eg.release.max + 1)),
            },
            trem: {
                depth: Math.floor(Math.random() * (amp.trem.depth.max + 1)),
                rate: Math.floor(Math.random() * (amp.trem.rate.max + 1)),
            },
            lfo: {
                depth: Math.floor(Math.random() * (amp.lfo.depth.max + 1)),
                rate: Math.floor(Math.random() * (amp.lfo.rate.max + 1)),
            }
        },
        vcf: {
            active: Math.random() < 0.5,
            type: Math.floor(Math.random() * (vcf.type.values.length - 1)),
            filter: {
                cutoff: Math.floor(Math.random() * (vcf.filter.cutoff.max + 1)),
                res: Math.floor(Math.random() * (vcf.filter.res.max + 1)),
            },
            sweep: {
                depth: Math.floor(Math.random() * (vcf.sweep.depth.max + 1)),
                rate: Math.floor(Math.random() * (vcf.sweep.rate.max + 1)),
            }
        },
        effects: {
            mod: {
                active: Math.random() < 0.5,
                type: Math.floor(Math.random() * (effects.mod.type.values.length - 1) + 1),
                time: Math.floor(Math.random() * (effects.mod.time.max + 1)),
                depth: Math.floor(Math.random() * (effects.mod.depth.max + 1)),
            },
            delay: {
                active: Math.random() < 0.5,
                type: Math.floor(Math.random() * (effects.delay.type.values.length - 1) + 1),
                time: Math.floor(Math.random() * (effects.delay.time.max + 1)),
                depth: Math.floor(Math.random() * (effects.delay.depth.max + 1)),
                mix: Math.floor(Math.random() * (effects.delay.mix.max + 1)),
            },
            reverb:{
                active: Math.random() < 0.5,
                type: Math.floor(Math.random() * (effects.reverb.type.values.length - 1) + 1),
                time: Math.floor(Math.random() * (effects.reverb.time.max + 1)),
                depth: Math.floor(Math.random() * (effects.reverb.depth.max + 1)),
                mix: Math.floor(Math.random() * (effects.reverb.mix.max + 1)),
            }
        }
    }

    return patch;
}

export { randomPatch };