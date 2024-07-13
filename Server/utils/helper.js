function nextID(ID, key) {
    if (!ID || ID.trim() === "") {
      return `${key}0001`;
    }
  
    let newCodeString = `000${(parseInt(ID.slice(key.length)) + 1)}`;
    return `${key}${newCodeString.slice(-4)}`;
}

module.exports = {
  nextID
};