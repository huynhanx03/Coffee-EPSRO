function nextID(ID, key) {
    if (!ID || ID.trim() === "") {
      return `${key}0001`;
    }
  
    let newCodeString = `000${(parseInt(ID.slice(key.length)) + 1)}`;
    return `${key}${newCodeString.slice(-4)}`;
}

function convertToDateString(timeString) {
  return timeString.split(" ")[1];
}

function convertToDateTime(timeString) {
  const [time, date] = timeString.split(" ");
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds);
}

module.exports = {
  nextID,
  convertToDateString,
  convertToDateTime
};