const fs = require("fs");
const helpers = require("./helpers");

const numbers = helpers.getInputs("01.txt").map(n=>parseInt(n));
let product = 0;

for (let i = 0; i < numbers.length; i++) {
  for (let j = i; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === 2020) {
      product = numbers[i] * numbers[j];
      break;
    }
  }
  if (product) break;
}

console.log(product);