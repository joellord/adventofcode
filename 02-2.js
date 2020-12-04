const helpers = require("./helpers");

const inputs = helpers.getInputs("02.txt");

const valid = inputs.filter(input => {
  const line = input.split(": ");
  const policy = line[0].split(" ");
  const range = policy[0].split("-");
  const char = policy[1];
  const password = line[1];
  const charPos1 = password[range[0]-1];
  const charPos2 = password[range[1]-1];
  return !!(charPos1 === char ^ charPos2 === char)
});

console.log(valid.length);
