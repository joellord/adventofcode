const helpers = require("./helpers");

const input = helpers.getInputs("03.txt");
const forest = input.map(line => line.split(""));

let path = "";
let count = 0;
let lineLength = forest[0].length;

for (let i = 0; i < forest.length; i++) {
  path += forest[i][count];
  count += 3;
  if (count >= lineLength) count -= lineLength;
}

console.log(path.replace(/\./g, "").length);