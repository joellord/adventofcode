const helpers = require("./helpers");

const inputs = helpers.getInputs("02.txt");

const valid = inputs.filter(input => {
  const line = input.split(": ");
  const policy = line[0].split(" ");
  const range = policy[0].split("-");
  const char = policy[1];
  const password = line[1];
  
  const replaceRegEx = new RegExp(`[^${char}]`, "g");
  const policyCharOnly = password.replace(replaceRegEx, "");
  const charCount = policyCharOnly.length;
  return (charCount >= range[0] && charCount <= range[1]);
});

console.log(valid.length);
