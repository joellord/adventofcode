const { setUncaughtExceptionCaptureCallback } = require("process");

const upperHalf = (range) => {
  let middle = range[1] - range[0];
  let half = Math.ceil(middle/2) + range[0];
  return [half, range[1]];
}

const lowerHalf = (range) => {
  let middle = range[1] - range[0];
  let half = Math.floor(middle/2) + range[0];
  return [range[0], half];
}

const getSeat = (boardingPass) => {
  boardingPass = boardingPass.split("");
  let row = [0, 127];
  let seat = [0, 7];

  while(boardingPass.length > 3) {
    let action = boardingPass[0];
    boardingPass = boardingPass.slice(1);
    if (action === "F") row = lowerHalf(row);
    if (action === "B") row = upperHalf(row);
  }

  while(boardingPass.length) {
    let action = boardingPass[0];
    boardingPass = boardingPass.slice(1);
    if (action === "L") seat = lowerHalf(seat);
    if (action === "R") seat = upperHalf(seat);
  }

  row = row[0];
  seat = seat[0];
  let id = row * 8 + seat;

  return {row, seat, id};
}

const helpers = require("./helpers");

let input = helpers.getInputs("05.txt");
let seatMap = [...Array(956).keys()];
for (let i = 0; i < input.length; i++) {
  let id = getSeat(input[i]).id;
  let index = seatMap.indexOf(id);
  if (index > -1) seatMap.splice(index, 1);
}

console.log(seatMap);
