const scriptStorage = [];

module.exports.includeScript = (script) => {
    scriptStorage.push(script)
};

module.exports.ejectScript = (id) => {
    return scriptStorage.filter(s => s.id === id)
};

