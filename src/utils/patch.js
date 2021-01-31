import { synth } from '../config/midi';

const randomPatch = (userprogs) => {
    const patch = {
        osc: {
            type: Math.floor(Math.random() * userprogs.osc),
            shape: Math.floor(Math.random() * (synth.osc.shape.max + 1)),
            alt: Math.floor(Math.random() * (synth.osc.alt.max + 1)),
        },
        arp: {
            type: Math.floor(Math.random() * synth.arp.type.values.length),
            scale: Math.floor(Math.random() * synth.arp.scale.values.length),
            length: Math.floor(Math.random() * (synth.arp.length.max + 1)),
        },
        amp: {
            type: Math.floor(Math.random() * synth.amp.type.values.length),
            eg: {
                attack: Math.floor(Math.random() * (synth.amp.eg.attack.max + 1)),
                release: Math.floor(Math.random() * (synth.amp.eg.release.max + 1)),
            },
            trem: {
                depth: Math.floor(Math.random() * (synth.amp.trem.depth.max + 1)),
                rate: Math.floor(Math.random() * (synth.amp.trem.rate.max + 1)),
            },
            lfo: {
                depth: Math.floor(Math.random() * (synth.amp.lfo.depth.max + 1)),
                rate: Math.floor(Math.random() * (synth.amp.lfo.rate.max + 1)),
            }
        },
        vcf: {
            active: Math.random() < 0.5 ? 1 : 0,
            type: Math.floor(Math.random() * (synth.vcf.type.values.length - 1)),
            filter: {
                cutoff: Math.floor(Math.random() * (synth.vcf.filter.cutoff.max + 1)),
                res: Math.floor(Math.random() * (synth.vcf.filter.res.max + 1)),
            },
            sweep: {
                depth: Math.floor(Math.random() * (synth.vcf.sweep.depth.max + 1)),
                rate: Math.floor(Math.random() * (synth.vcf.sweep.rate.max + 1)),
            }
        },
        effects: {
            mod: {
                active: Math.random() < 0.5 ? 1 : 0,
                type: Math.floor(Math.random() * (userprogs.mod) + 1),
                time: Math.floor(Math.random() * (synth.effects.mod.time.max + 1)),
                depth: Math.floor(Math.random() * (synth.effects.mod.depth.max + 1)),
            },
            delay: {
                active: Math.random() < 0.5 ? 1 : 0,
                type: Math.floor(Math.random() * (userprogs.delay) + 1),
                time: Math.floor(Math.random() * (synth.effects.delay.time.max + 1)),
                depth: Math.floor(Math.random() * (synth.effects.delay.depth.max + 1)),
                mix: Math.floor(Math.random() * (synth.effects.delay.mix.max + 1)),
            },
            reverb:{
                active: Math.random() < 0.5 ? 1 : 0,
                type: Math.floor(Math.random() * (userprogs.reverb) + 1),
                time: Math.floor(Math.random() * (synth.effects.reverb.time.max + 1)),
                depth: Math.floor(Math.random() * (synth.effects.reverb.depth.max + 1)),
                mix: Math.floor(Math.random() * (synth.effects.reverb.mix.max + 1)),
            }
        }
    }

    return patch;
}

const savePatch = (patch) => {
    const filename = "patch.ntspatch";
    const contentType = "application/json;charset=utf-8;";

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(patch)))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      let a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(patch));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
}

const linkPatch = (patch) => {
    const encoded = Buffer.from(JSON.stringify(patch)).toString('base64');
    const url = window.location.protocol + '//' + window.location.host  + '?patch=' + encoded;

    navigator.clipboard.writeText(url);
}

const loadPatchFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
            resolve(JSON.parse(e.target.result));
        };
        
        reader.onerror = reject;
        
        reader.readAsText(file);
    })
}

const loadPatchLink = (link) => {
    const decoded = JSON.parse(Buffer(link, 'base64').toString('UTF-8'));
    return decoded;
}

export { randomPatch, savePatch, linkPatch, loadPatchFile, loadPatchLink };