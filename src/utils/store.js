const stringToPath = ( path ) => {
    if (typeof path !== 'string') return path;

    let output = [];

    path.split('.').forEach(function (item, index) {
        item.split(/\[([^}]+)\]/g).forEach(function (key) {
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

//TODO fix deeply nested objects
const combinePayload = (obj, state) => {
    Object.keys(obj).forEach( control => {
        obj[control] = { ...state[control], ...obj[control] }
    })

    return obj;
}

export { pathToStore, combinePayload }