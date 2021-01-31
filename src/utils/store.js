const stringToPath = ( path ) => {
    if (typeof path !== 'string') return path;

    let output = [];

    path.split('.').forEach( (item, index) => {
        item.split(/\[([^}]+)\]/g).forEach( (key) => {
            if (key.length > 0) {
                output.push(key);
            }
        });
    });
    
    return output;
}

const pathToStore = (obj, path, val) => {    
    path = stringToPath(path);
    const length = path.length;
    let current = obj;

    path.forEach( (key, index) => {
        if(index === length - 1){
            current[key] = val;
        }else{
            if(!current[key]) current[key] = {};
            current = current[key];
        }
    });

    return obj;
}

export { pathToStore }