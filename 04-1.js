const { Hash } = require("crypto");
const helpers = require("./helpers");

const input = helpers.getInputs("04.txt", "\n\n");

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const convertToObject = item => {
  let object = {};
  fields = item.split(/[ \n]/);
  fields.map(field => {
    field = field.split(":");
    object[field[0]] = field[1];
  });
  return object;
}

const isPassportValid = passport => {
  for (let i = 0; i < requiredFields.length; i++) {
    if (!passport[requiredFields[i]]) return false;
  }
  return true;
}

let passports = input.map(i => convertToObject(i));
let validPassports = passports.filter(isPassportValid);
console.log(validPassports.length);