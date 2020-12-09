const helpers = require("./helpers");

const inputs = helpers.getInputs("06.txt", "\n\n");

const removeDuplicateLetters = s => {
  return s.split("").sort((a,b) => a > b ? 1 : -1).reduce((a,b) => a[a.length-1] === b ? a : a+b);
};

const questions = "abcdefghijklmnopqrstuvwxyz";
let sum = 0;

for (let i = 0; i < inputs.length; i++) {
  const peopleCount = inputs[i].split("\n").length;
  const letters = inputs[i].split("\n").join("").split("");
  let yeses = 0;
  for (let j = 0; j < questions.length; j++) {
    let answers = letters.filter(char => char === questions[j]).length;
    if (answers === peopleCount) yeses++;
  }
  console.log(`People ${peopleCount}, Yes: ${yeses}`);
  sum += yeses;
}

console.log(sum);