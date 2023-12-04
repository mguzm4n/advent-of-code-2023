import { readFile } from "fs/promises";

const MAX_AMOUNTS: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

async function partOne() {
  const inputString = await readFile("../day-2/input1.txt", { encoding: 'utf8' });
  const splittedGames = inputString
    .split("\n");
    
  const res = splittedGames
    .map(line => { // every line is a game with sets
      const gameAndSets = line.split(": ");
      const game = gameAndSets[0].split(" ");
      const sets = gameAndSets[1].split("; ");

      const colorsCount: Record<string, number[]> = {
        red: [],
        green: [],
        blue: [],
      };

      const minAmounts: Record<string, number> = {
        red: 0,
        green: 0,
        blue: 0,
      }

      for(let set of sets) {
        const roundsPerSet = set.split(", ");
        for(const round of roundsPerSet)  {
          const cubes = round.split(" ");
          const number = parseInt(cubes[0]);
          const color = cubes[1].trim();
          colorsCount[color].push(number);
        }
      }

      for(const color of Object.keys(MAX_AMOUNTS)){
        minAmounts[color] = Math.max(...colorsCount[color]);
      }

      return minAmounts.red * minAmounts.green * minAmounts.blue;
    })
    .reduce((prev, curr) => prev + curr, 0);
  console.log(res);
}

function main() {
  partOne()
}

main()