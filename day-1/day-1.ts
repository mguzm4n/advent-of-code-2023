import { readFile } from "fs/promises";

const DIGITS_STRING: Record<string, string> = {
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9",
}

function fromLineToNumbers(line: string) {
  //console.log(line);
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
}

async function firstPart() { 
  const inputString = await readFile("../day-1/input.txt", { encoding: 'utf8' });
  const finalRes = inputString
    .split("\n")
    .map(fromLineToNumbers)
    .reduce((prev, curr)  => prev + curr, 0);

  console.log(finalRes);
  return;
}


async function secondPart() {
  const inputString = await readFile("../day-1/input.txt", { encoding: 'utf8' });
  const finalRes = inputString
    .split("\n")
    .map(line => {
      let wholeNumber = '';
      // console.log(`linea = ${line}`);
      for (let i = 0; i < line.length; i++) {
        for (let j = i; j <= line.length; j++) {

          const substring = line.substring(i, j);
          // console.log({
          //   i,
          //   j,
          //   substring
          // });
          
          if (substring.length == 1) {
            const realNum = parseInt(substring);
            if (realNum) {
              wholeNumber += realNum;
            }
          }

          const digitStringNum = DIGITS_STRING[substring.trim()];
          if (digitStringNum) {
            wholeNumber += digitStringNum;
            i = j - 1;
          }
        }
      }
      return wholeNumber;
  })
    .map(fromLineToNumbers)
    .reduce((prev, curr)  => prev + curr, 0);

  console.log(finalRes);
  return;
}

async function main() {
  //firstPart();
  secondPart();
}

main()        