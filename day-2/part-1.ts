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
      const gameId = game[1];
      let sumId = false;

      const sets = gameAndSets[1].split("; ");
      for(let set of sets) {
        const roundsPerSet = set.split(", ");
        sumId = false;

        for(const round of roundsPerSet)  {
          const cubes = round.split(" ");
          const number = parseInt(cubes[0]);
          const color = cubes[1];

          if (number > MAX_AMOUNTS[color]) {
            sumId = false;
            console.log("fake");
            break;
          } else {
            sumId = true;
          }
        }

        if (!sumId) break;
      }

      if (sumId) {
        return parseInt(gameId);
      }

      return 0;
    })
    .reduce((prev, curr) => prev + curr, 0);
  console.log(res);
}

function main() {
  partOne()
}

main()