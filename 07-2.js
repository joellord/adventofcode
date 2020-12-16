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
      let qty = parseInt(bag[0]);
      let color = `${bag[1]} ${bag[2]}`.trim();
      return {qty, color}
    });
    bags.push({color: bagColor, inside: bagsInside});
  }

  return bags;
}

let bags = parseInputs(inputs);

const getWeight = bag => {
  return 1 + bag.inside.map(subbag => {
      const child = bags.find(ab => subbag !== null && ab.color === subbag.color);
      if (child === undefined) return 0;
      return getWeight(child) * subbag.qty;
  }).reduce((a,b) => a+b);
}

let shinyBag = bags.find(b => b.color === "shiny gold");


const wgt = getWeight(shinyBag) - 1;
console.log(wgt);



