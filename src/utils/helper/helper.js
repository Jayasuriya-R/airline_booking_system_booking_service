// Returns true if time1 is later than time2
function compareTime(time1, time2) {
  return new Date(time1).getTime() > new Date(time2).getTime();
}

module.exports = {
  compareTime,
};
