const helpers = require("./helpers");

const input = helpers.getInputs("03.txt");
const forest = input.map(line => line.split(""));

const getPath = (down, right) => {
  let path = "";
  let count = 0;
  let lineLength = forest[0].length;

  for (let i = 0; i < forest.length; i = i + down) {
    path += forest[i][count];
    count += right;
    if (count >= lineLength) count -= lineLength;
  }

  return path;
}

const countTrees = path => {
  return path.replace(/\./g, "").length;
}

let trees = [];
trees.push(countTrees(getPath(1, 1)));
trees.push(countTrees(getPath(1, 3)));
trees.push(countTrees(getPath(1, 5)));
trees.push(countTrees(getPath(1, 7)));
trees.push(countTrees(getPath(2, 1)));
console.log(trees);
console.log(trees.reduce((a,b) => a*b));
