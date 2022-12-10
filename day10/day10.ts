import { getFileByLinesSync } from '../shared/utils';
import * as R from 'ramda';


function getValuesOfX() {
    try {
        const lines = getFileByLinesSync('./day10/day10.txt');
        const part1 =  populateValuesOfX(lines);
        const part2 = drawGivenValuesOfX(part1);
        return {part1, part2}
      } catch (err) {
        console.error(err);
      }
      return {part1: [], part2: ''};
}


function populateValuesOfX(lines: string[]) {
  const valuesOfXAtCycle: number[] = [];
  let x = 1;

  for(let i = 0; i < lines.length; i++) {
    if(lines[i].startsWith('addx')) {
      const valueToAdd = parseInt(lines[i].split(' ')[1]);
      valuesOfXAtCycle.push(x);
      valuesOfXAtCycle.push(x);
      x += valueToAdd;
    } else {
      // noop
      valuesOfXAtCycle.push(x);
    }
  }

  return valuesOfXAtCycle;
}

function drawGivenValuesOfX(valuesOfXAtCycle: number[]) {
  let index = 0;
  const height = 6;
  const width = 40;
  let outputString = '';
  for(let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      if(column === valuesOfXAtCycle[index] - 1 || column === valuesOfXAtCycle[index] || column ===  valuesOfXAtCycle[index] + 1) {
        outputString += '#';
      } else {
        outputString += '.';
      }
      index += 1;
    }
    outputString += '\n';
  }
  return outputString;
}



const start = Date.now();
console.log('start', start);
const {part1, part2} = getValuesOfX();
const end = Date.now();
console.log(end - start);
console.log(part1);
console.log("Part 1");
console.log(20 * part1[19] + 60 * part1[59] + 100 * part1[99] + 140 * part1[139] + 180 * part1[179] + 220 * part1[219]);

console.log("Part 2");
console.log(part2);

// console.log(R.uniq(part2).length);
