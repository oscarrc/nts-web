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

export { exportData, importData }

