import { strings } from '../config/synth';

const exportData = (data, filename) => {
  const contentType = "application/json;charset=utf-8;";

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data)))], { type: contentType });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    let a = document.createElement('a');
    a.download = filename;
    a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(data));
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

const importData = (file) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
          resolve(JSON.parse(e.target.result));
      };      
      reader.onerror = reject;    
      reader.readAsText(file);
  })
}


const convertPatch = (patch) => {
  return {
    53:{ 
      value: patch.osc.type,      
      svalue: strings[53][patch.osc.type]
    },
    54:{ value: patch.osc.shape },
    55:{ value: patch.osc.alt },
    117:{ 
      value: patch.arp.type,
      svalue: strings[117][patch.arp.type]
    },
    118:{ 
      value: patch.arp.scale,
      svalue: strings[118][patch.arp.scale]
    },
    119:{ value: patch.arp.length },
    14:{ 
      value: patch.amp.type,
      svalue: strings[14][patch.amp.type]
    },
    16:{ value: patch.amp.eg.attack },
    19:{ value: patch.amp.eg.release },
    20:{ value: patch.amp.trem.depth },
    21:{ value: patch.amp.trem.rate },
    24:{ value: patch.amp.lfo.rate },
    26:{ value: patch.amp.lfo.depth },
    88:{ 
      value: patch.effects.mod.type,
      active: patch.effects.mod.active,
      svalue: strings[88][patch.effects.mod.type]
    },
    28:{ value: patch.effects.mod.time },
    29:{ value: patch.effects.mod.depth },
    89:{ 
      value: patch.effects.delay.type,
      active: patch.effects.delay.active,      
      svalue: strings[89][patch.effects.delay.type]
    },
    30:{ value: patch.effects.delay.time },
    31:{ value: patch.effects.delay.depth },
    33:{ value: patch.effects.delay.mix },
    90:{ 
      value: patch.effects.reverb.type,
      active: patch.effects.reverb.active,
      svalue: strings[90][patch.effects.reverb.type]
    },
    34:{ value: patch.effects.reverb.time },
    35:{ value: patch.effects.reverb.depth },
    36:{ value: patch.effects.reverb.mix },
    42:{ 
      value: patch.vcf.type,
      active: patch.vcf.active,
      svalue: strings[42][patch.vcf.type]
    },
    43:{ value: patch.vcf.filter.cutoff },
    44:{ value: patch.vcf.filter.res },
    45:{ value: patch.vcf.sweep.depth },
    46:{ value: patch.vcf.sweep.rate }
  }
}

export { exportData, importData, convertPatch }

