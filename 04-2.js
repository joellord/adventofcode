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

const isFieldValid = (prop, value) => {
  let val, matches;
  switch(prop) {
    case "byr": 
      val = parseInt(value);
      return val >= 1920 && val <= 2002;
    case "iyr":
      val = parseInt(value);
      return val >= 2010 && val <=2020;
    case "eyr": 
      val = parseInt(value);
      return val >= 2020 && val <= 2030;
    case "hgt": 
      matches = value.match(/([0-9]{2,3})(in|cm)/);
      if (matches === null) return false;
      let height = parseInt(matches[1]);
      let unit = matches[2];
      if (unit !== "cm" && unit !== "in") return false;
      return (unit === "cm" ? height >= 150 && height <=193 : height >= 59 && height <= 76);
    case "hcl": 
      return (value.match(/\#[0-9a-f]{6}/) !== null);
    case "ecl": 
      return (value === "amb" || value === "blu" || value === "brn" || value === "gry" || value === "grn" || value === "hzl" || value === "oth");
    case "pid": 
      if (value.length > 9) return false;
      return (value.match(/[0-9]{9}/) !== null);
    case "cid":
      return true;
  }
  return false;
}

const isPassportValid = passport => {
  for (let i = 0; i < requiredFields.length; i++) {
    let prop = requiredFields[i];
    if (!passport[prop]) return false;
    let val = passport[prop];
    if (!isFieldValid(prop, val)) {
      if(prop === "pid") console.log(`${prop} invalid with value ${val}`)
      return false;
    }
  }
  return true;
}

let passports = input.map(i => convertToObject(i));
let validPassports = passports.filter(isPassportValid);
console.log(validPassports.length);