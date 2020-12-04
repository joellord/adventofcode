const fs = require("fs");

const getInputs = (filename, lineSeparator = "\n") => {
  let input = fs.readFileSync(filename).toString();
  input = input.split(lineSeparator);
  return input;
}

module.exports = {
  getInputs
}