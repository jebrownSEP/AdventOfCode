import { getFileByLinesSync } from '../shared/utils';
import * as R from 'ramda';
import { join } from 'path';


function getMonkeysAttributesAfter20Rounds() {
    try {
        const lines = getFileByLinesSync('./day11/day11.txt');
        const part1 =  getMonkeysAfterXRoundsAndDivideBy3(lines, 20, true);
        const part2 = getMonkeysAfterXRoundsAndDivideBy3(lines, 10000, false);
        return {part1, part2}
      } catch (err) {
        console.error(err);
      }
      return {part1: [], part2: []};
}

interface Monkey {
  currentItems: bigint[];
  performOperation(item: bigint): bigint;
  throwItem(item: bigint): void;
  numberInspectedItems: number;
  divisibleBy: bigint;
}

function getMonkeysAfterXRoundsAndDivideBy3(lines: string[], numberOfRounds: number, divideByThree: boolean) {
  const monkeys: Monkey[] = getStartingMonkeys(lines, divideByThree);
  const LCM = monkeys.map((monkey) => monkey.divisibleBy).reduce((prev, current) => prev * current );
  // console.log('LCM', LCM);

  for(let i = 0; i < numberOfRounds; i++) {
    // console.log('round ', i+ 1);
    for(let j = 0; j < monkeys.length; j++) {
      for(let k = 0; k < monkeys[j].currentItems.length; k++) {
        const updatedItem =  monkeys[j].performOperation(monkeys[j].currentItems[k]) % LCM;
        monkeys[j].throwItem(updatedItem);
        monkeys[j].numberInspectedItems += 1;
      }
      monkeys[j].currentItems = [];
    }
  }

  return monkeys;
}

function getStartingMonkeys(lines: string[], divideByThree: boolean) {
  const monkeys: Monkey[] = [];
  let index = 0;

  while(index < lines.length) {
    const currentItemsLine = lines[index + 1];
    const currentItems = currentItemsLine.split('Starting items: ')[1].split(', ').map((item) => BigInt(item));

    const operationLine = lines[index + 2];
    const [operatorString, operandString] = operationLine.split('Operation: new = old ')[1].split(' ');
    
    let performOperation;
    if(operatorString === '+') {
      performOperation = (item: bigint) => item + BigInt(operandString);
    } else { // '*'
      if(operandString === 'old') {
        performOperation = (item: bigint) => item * item;
      } else {
        performOperation = (item: bigint) => item * BigInt(operandString);
      }
    }
    const throwItemTestLine = lines[index + 3];
    const divisibleBy = BigInt(throwItemTestLine.split('Test: divisible by ')[1]);
    const monkeyNumberTrue = parseInt(lines[index + 4].split('If true: throw to monkey ')[1]);
    const monkeyNumberFalse = parseInt(lines[index + 5].split('If false: throw to monkey ')[1]);

    const throwItem = (item: bigint) => {
      let updatedItem = item;
      if(divideByThree) {
        updatedItem = item / 3n;
      }
      if(updatedItem % divisibleBy === 0n) {
        monkeys[monkeyNumberTrue].currentItems.push(updatedItem);
      } else {
        monkeys[monkeyNumberFalse].currentItems.push(updatedItem);
      }
    };
    monkeys.push({
      currentItems,
      performOperation,
      throwItem,
      numberInspectedItems: 0,
      divisibleBy,
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
const monkeyBusiness = sortedMonkeys[0].numberInspectedItems * sortedMonkeys[1].numberInspectedItems;
console.log(monkeyBusiness);

console.log(part2);
console.log("Part 2");
const sortedMonkeys2 = part2.sort((a, b) => b.numberInspectedItems -  a.numberInspectedItems);
const monkeyBusiness2 = sortedMonkeys2[0].numberInspectedItems * sortedMonkeys2[1].numberInspectedItems;
console.log(monkeyBusiness2);
