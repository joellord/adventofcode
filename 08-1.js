const helpers = require("./helpers");
const inputs = helpers.getInputs("08.txt");

const parseInstruction = instruction => {
  instruction = instruction.split(" ");
  return {op: instruction[0], quantifier: parseInt(instruction[1])};
}

let processedIndexes = [];
let nextInstructionIndex = 0;
let accumulator = 0;

while(processedIndexes.indexOf(nextInstructionIndex) === -1) {
  processedIndexes.push(nextInstructionIndex);
  let instruction = parseInstruction(inputs[nextInstructionIndex]);
  switch(instruction.op) {
    case "acc":
      accumulator += instruction.quantifier;
    case "nop": 
      nextInstructionIndex++;
      break;
    case "jmp":
      nextInstructionIndex += instruction.quantifier;
      break;
    default:
      console.log("ERROR: Unrecognized instruction", instruction);
  }
}

console.log(accumulator);