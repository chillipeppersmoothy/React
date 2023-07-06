const isArrayEmpty = (arr) => {
    if(arr !== undefined && arr !== null && arr.length > 0) {
        return false;
    }
    return true;
}

const dumpLogs = (log) => {
    console.log(log);
}

export {isArrayEmpty, dumpLogs}