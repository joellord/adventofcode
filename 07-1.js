const helpers = require("./helpers");
const inputs = helpers.getInputs("07.txt");

const parseInputs = (rules) => {
  let bags = [];

  while(rules.length) {
    let rule = rules.shift();
    rule = rule.split("bags contain");
    let bagColor = rule[0].trim();
    let bagsInside = rule[1].substr(1).split(", ");
    bagsInside = bagsInside.map(bag => {
      if (bag === "no other bags.") {
        return null;
      }
      bag = bag.split(" ");
      let qty = bag[0];
      let color = `${bag[1]} ${bag[2]}`.trim();
      return {qty, color}
    });
    bags.push({name: bagColor, inside: bagsInside});
  }

  return bags;
}

let bags = parseInputs(inputs);

let bagContains = (targetColor, bag) => {
  if (bag.inside[0] === null) return false;
  for (let i = 0; i < bag.inside.length; i++) {
    if (bag.inside[i].color === targetColor) return true;
  }
  return false;
}

let nextColors = ["shiny gold"];
let colors = [];

while(nextColors.length) {
  let newNext = [];
  for (let i = 0; i < nextColors.length; i++) {
    let containsMatchingColor = bags.filter(bag => bagContains(nextColors[i], bag));

    containsMatchingColor.map(c=>{
      if (colors.indexOf(c.name) === -1) {
        newNext.push(c.name);
        colors.push(c.name);
      }
    });
  }
  nextColors = newNext;
}

console.log(colors.length)


