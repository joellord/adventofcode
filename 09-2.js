const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const helpers = require("./helpers");
let inputs = helpers.getInputs("09.txt");
inputs = inputs.map( i => parseInt(i) );

const PREAMBLE_LENGTH = 25;

const canSumUpTo = (preamble, sum) => {
  for (let i = 0; i < preamble.length; i++) {
    for (let j = i + 1; j < preamble.length; j++) {
      if (preamble[i] + preamble[j] === sum) return true;
    }
  }
  return false;
}

let invalid;

for (let i = PREAMBLE_LENGTH; i < inputs.length; i++) {
  let preamble = inputs.slice(i - PREAMBLE_LENGTH, i);
  if (!canSumUpTo(preamble, inputs[i])) {
    invalid = inputs[i];
    break;
  }
}

const contiguousSum = (inputs, target) => {
  let start = 0;
  while(start < inputs.length) {
    let numbers = [];
    let sum = 0;
    for (let i = start; i < inputs.length; i++) {
      numbers.push(inputs[i]);
      sum = numbers.reduce((a,b) => a+b);
      if (sum === target) return numbers;
      if (sum > target) {
        break;
      }
    }
    start++;
  }
}


let arr = contiguousSum(inputs, invalid);
let max = Math.max(...arr);
let min = Math.min(...arr);
let answer = max+min;
console.log(answer);