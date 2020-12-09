const helpers = require("./helpers");

const inputs = helpers.getInputs("06.txt", "\n\n");

const removeDuplicateLetters = s => {
  return s.split("").sort((a,b) => a > b ? 1 : -1).reduce((a,b) => a[a.length-1] === b ? a : a+b);
};

let sum = 0;

for (let i = 0; i < inputs.length; i++) {
  const lines = inputs[i].split("\n").join("");
  let yeses = removeDuplicateLetters(lines).split("").length;
  sum += yeses;
}

console.log(sum);