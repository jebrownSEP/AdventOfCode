import { getFileByLinesSync } from '../shared/utils';
import * as R from 'ramda';
import { join } from 'path';


function getMonkeysAttributesAfter20Rounds() {
    try {
        const lines = getFileByLinesSync('./day11/day11.txt');
        const part1 =  getMonkeysAfter20Rounds(lines);
        const part2: number[] = [];
        return {part1, part2}
      } catch (err) {
        console.error(err);
      }
      return {part1: [], part2: []};
}

interface Monkey {
  currentItems: number[];
  performOperation(item: number): number;
  throwItem(item: number): void;
  numberInspectedItems: number;
}

function getMonkeysAfter20Rounds(lines: string[]) {
  const monkeys: Monkey[] = getStartingMonkeys(lines);

  for(let i = 0; i < 20; i++) {
    for(let j = 0; j < monkeys.length; j++) {
      for(let k = 0; k < monkeys[j].currentItems.length; k++) {
        const updatedItem =  monkeys[j].performOperation(monkeys[j].currentItems[k]);
        monkeys[j].throwItem(updatedItem);
        monkeys[j].numberInspectedItems += 1;
      }
      monkeys[j].currentItems = [];
    }
  }

  return monkeys;
}

function getStartingMonkeys(lines: string[]) {
  const monkeys: Monkey[] = [];
  let index = 0;

  while(index < lines.length) {
    const currentItemsLine = lines[index + 1];
    const currentItems = currentItemsLine.split('Starting items: ')[1].split(', ').map((item) => parseInt(item));

    const operationLine = lines[index + 2];
    const [operatorString, operandString] = operationLine.split('Operation: new = old ')[1].split(' ');
    
    let performOperation;
    if(operatorString === '+') {
      performOperation = (item: number) => item + parseInt(operandString);
    } else { // '*'
      if(operandString === 'old') {
        performOperation = (item: number) => item * item;
      } else {
        performOperation = (item: number) => item * parseInt(operandString);
      }
    }
    const throwItemTestLine = lines[index + 3];
    const divisibleBy = parseInt(throwItemTestLine.split('Test: divisible by ')[1]);
    const monkeyNumberTrue = parseInt(lines[index + 4].split('If true: throw to monkey ')[1]);
    const monkeyNumberFalse = parseInt(lines[index + 5].split('If false: throw to monkey ')[1]);

    const throwItem = (item: number) => {
      const updatedItem = Math.floor(item / 3);
      if(updatedItem % divisibleBy === 0) {
        monkeys[monkeyNumberTrue].currentItems.push(updatedItem);
      } else {
        monkeys[monkeyNumberFalse].currentItems.push(updatedItem);
      }
    };
    monkeys.push({
      currentItems,
      performOperation,
      throwItem,
      numberInspectedItems: 0
    });

    index += 7;
  }
  return monkeys;
}



const start = Date.now();
console.log('start', start);
const {part1, part2} = getMonkeysAttributesAfter20Rounds();
const end = Date.now();
console.log(end - start);
console.log(part1);
console.log("Part 1");
const sortedMonkeys = part1.sort((a, b) => b.numberInspectedItems -  a.numberInspectedItems);
const moknkeyBusiness = sortedMonkeys[0].numberInspectedItems * sortedMonkeys[1].numberInspectedItems;
console.log(moknkeyBusiness);

// console.log("Part 2");
// console.log(part2);

