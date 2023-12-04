import { readFile } from "fs/promises";

const DIGITS_STRING = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9
}


async function firstPart() { 
  const inputString = await readFile("../day-1/input.txt", { encoding: 'utf8' });
  const finalRes = inputString
    .split("\n")
    .map(line => {
      let wholeNumber = '';
      for (let char of line) {
        const possibleNumber = parseInt(char);
        if (!Number.isNaN(possibleNumber)) {
          wholeNumber += char;
        }
      }

      const totalDigits = wholeNumber.length;

      if (totalDigits == 0) return 0;
      if (totalDigits == 1) { 
        return parseInt(`${wholeNumber}${wholeNumber}`);
      }

      return parseInt(`${wholeNumber[0]}${wholeNumber[totalDigits - 1]}`);
    })
    .reduce((prev, curr)  => prev + curr, 0);

  console.log(finalRes);
  return;
}

function possibleDigitEqualsDigit(possibleDigit: string) {
  for (let digitString of Object.keys(DIGITS_STRING)) {
    if (possibleDigit == digitString) return true;
  }
  return false;
}
// for (let digitAsString of Object.keys(DIGITS_STRING)) {
  //   if (possibleNumberString == digitAsString) {
  //     return true;
  //   }
  // }

async function secondPart() {
  const inputString = await readFile("../day-1/input1.txt", { encoding: 'utf8' });
  const finalRes = inputString
    .split("\n")
    .map(line => {
      let wholeNumber = '';
      let ptr = 0;

      console.log(`linea = ${line}`);
      for (let i = 1; i < line.length; i++) {
        for (let j = i + 1; j < line.length; j++) {
          if (j == line.length - 1) {
            j += 1;
          }
          const substring = line.substring(i - 1, j);
          // console.log({
          //   i,
          //   j,
          //   substring
          // });
          if (possibleDigitEqualsDigit(substring)) {
            wholeNumber += substring;
            i = j;
          }
        }
      }
      return wholeNumber;
  })
  console.log(finalRes);
  return;
}

async function main() {
  //firstPart();
  secondPart();
}

main()        