const saveSequenceFile = (seq) => {
    const filename = "sequence.ntsseq";
    const contentType = "text/plain;charset=utf-8;";

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(seq)))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      let a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(seq);
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
}

const loadSequenceFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
            resolve(e.target.result);
        };
        
        reader.onerror = reject;
        
        reader.readAsText(file);
    })
}

export { saveSequenceFile, loadSequenceFile };