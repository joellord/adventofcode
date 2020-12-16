const helpers = require("./helpers");
const inputs = helpers.getInputs("08.txt");

const parseInstruction = instruction => {
  instruction = instruction.split(" ");
  return {op: instruction[0], quantifier: parseInt(instruction[1])};
}

const parseBootSequence = instructions => {
  let processedIndexes = [];
  let nextInstructionIndex = 0;
  let accumulator = 0;

  while(processedIndexes.indexOf(nextInstructionIndex) === -1) {
    processedIndexes.push(nextInstructionIndex);
    let instruction = parseInstruction(instructions[nextInstructionIndex]);
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
    if (nextInstructionIndex == instructions.length) return accumulator;
  }

  return false;
}

for (let i = 0; i < inputs.length; i++) {
  let newInputs = Object.assign([], inputs);
  let currentInstruction = parseInstruction(newInputs[i]);
  if (currentInstruction.op == "acc") continue;
  newInputs[i] = `${currentInstruction.op == "nop" ? "jmp" : "nop"} ${currentInstruction.quantifier > 0 ? "+" : "-"}${Math.abs(currentInstruction.quantifier)}`;
  let result = parseBootSequence(newInputs);
  if (result) {
    console.log(result);
    break;
  }
}