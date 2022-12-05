const utils = require('../shared/utils')
const R = require('ramda');

// Impl of stack here has first element of the string be top of stacks
// To not waste time with painful text manipulation (for now), I'll just assign the stacks
// [S]                 [T] [Q]        
// [L]             [B] [M] [P]     [T]
// [F]     [S]     [Z] [N] [S]     [R]
// [Z] [R] [N]     [R] [D] [F]     [V]
// [D] [Z] [H] [J] [W] [G] [W]     [G]
// [B] [M] [C] [F] [H] [Z] [N] [R] [L]
// [R] [B] [L] [C] [G] [J] [L] [Z] [C]
// [H] [T] [Z] [S] [P] [V] [G] [M] [M]
//  1   2   3   4   5   6   7   8   9 

const stacks = [
  'SLFZDBRH',
  'RZMBT',
  'SNHCLZ',
  'JFCS',
  'BZRWHGP',
  'TMNDGZJV',
  'QPSFWNLG',
  'RZM',
  'TRVGLCM'
];

const stacks2 = [
  'SLFZDBRH',
  'RZMBT',
  'SNHCLZ',
  'JFCS',
  'BZRWHGP',
  'TMNDGZJV',
  'QPSFWNLG',
  'RZM',
  'TRVGLCM'
];

function executeMovementsOnStacks() {
    try {
        const lines = utils.getFileByLinesSync('./day5/day5.txt');

         // skip the initial stacks
        const instructions = lines.slice(10).map((instr) => {
          const pieces = instr.split(' ');

          return {
            numberToMove: parseInt(pieces[1]),
            // converting these to indexes in our array by subtracting 1
            fromStackIndex: parseInt(pieces[3]) - 1,
            toStackIndex: parseInt(pieces[5]) - 1  
          }
        });
        executeInstructionsOnStacks(instructions);
        executInstructionsOnStacksPart2(instructions);
      } catch (err) {
        console.error(err);
      }
}

function executeInstructionsOnStacks(instructions) {
  for (let i = 0; i < instructions.length; i++) {
    executeInstruction(instructions[i]);
  }
}

function executeInstruction(instruction) {
  let numberToMove = instruction.numberToMove;
  const fromStackIndex = instruction.fromStackIndex;
  const toStackIndex = instruction.toStackIndex;

  while (numberToMove > 0) {
    const crateToMoveChar = stacks[fromStackIndex][0];
    
    // remove it from fromStack
    stacks[fromStackIndex] = stacks[fromStackIndex].slice(1);

    // add it to toStack
    stacks[toStackIndex] = crateToMoveChar + stacks[toStackIndex];

    numberToMove -= 1;
  }

  return;
}

function executInstructionsOnStacksPart2(instructions) {
  for (let i = 0; i < instructions.length; i++) {
    executeInstructionPart2(instructions[i]);
  }
}

function executeInstructionPart2(instruction) {
  const numberToMove = instruction.numberToMove;
  const fromStackIndex = instruction.fromStackIndex;
  const toStackIndex = instruction.toStackIndex;

  const cratesToMoveString = stacks2[fromStackIndex].slice(0, numberToMove);
  
  // remove it from fromStack
  stacks2[fromStackIndex] = stacks2[fromStackIndex].slice(numberToMove);

  // add it to toStack
  stacks2[toStackIndex] = cratesToMoveString + stacks2[toStackIndex];

  return;
}


executeMovementsOnStacks();
console.log(stacks);

const topOfEachStack = stacks.map((stack) => stack[0]).join('');
console.log("Part 1");
console.log(topOfEachStack);

console.log(stacks2);

const topOfEachStack2 = stacks2.map((stack) => stack[0]).join('');
console.log("Part 2");
console.log(topOfEachStack2);


