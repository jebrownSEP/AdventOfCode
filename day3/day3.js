const utils = require('../shared/utils')
const R = require('ramda');

function getRucksacks() {
    try {
        const lines = utils.getFileByLinesSync('./day3/day3.txt')

        const rucksacks = lines.map((line) => {
          const characterArray = line.split('');
          const numberOfItems = characterArray.length;
          const compartments = [characterArray.slice(0, numberOfItems / 2), characterArray.slice(numberOfItems / 2)];
          const sharedItem = R.intersection(compartments[0], compartments[1])[0]; // We know there is always one
          return {
            combinedItems: characterArray,
            compartments,
            sharedItem,
            sharedItemPriority: getPriorityOfCharacter(sharedItem)
          }
        });
        
        return rucksacks;

      } catch (err) {
        console.error(err);
      }
}

const priorityString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getPriorityOfCharacter(character) {
  return priorityString.indexOf(character) + 1;
}

function getGroupsOfRucksacks() {
  const groups =  R.splitEvery(3, getRucksacks());
  return groups.map((group) => {
    const sharedItem = R.intersection(R.intersection(group[0].combinedItems, group[1].combinedItems), group[2].combinedItems)[0];
    return {
      group,
      sharedItem,
      sharedItemPriority: getPriorityOfCharacter(sharedItem)
    }
  });
}

const rucksacks = getRucksacks();
// console.log(rucksacks);
const totalPriority = rucksacks.map((rucksack) => rucksack.sharedItemPriority).reduce((prev, current) => prev + current);

console.log("Part 1");
console.log(totalPriority);

console.log("Part 2")
const groups = getGroupsOfRucksacks();
// console.log(groups);
const totalPriorityOfGroups = R.sum(R.map((group) => group.sharedItemPriority, groups))
console.log(totalPriorityOfGroups);



