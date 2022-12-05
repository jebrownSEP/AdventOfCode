const utils = require('../shared/utils')
const R = require('ramda');

function getAssignmentPairs() {
    try {
        const lines = utils.getFileByLinesSync('./day4/day4.txt')
        const assignments = lines.map((line) => line.split(','));
        
        return assignments.map((assignment) => {
          return {
            assignmentPair: assignment,
            isFullyContained: isAssignmentFullyContained(assignment),
            isPartiallyContained: isAssignmentPartiallyContained(assignment)
          }
        });

      } catch (err) {
        console.error(err);
      }
}

function isAssignmentFullyContained(assignmentPair) {
  const assignment1 = assignmentPair[0];
  const assignment2 = assignmentPair[1];

  return isFirstAssignmentFullyContainedInSecond(assignment1, assignment2) || isFirstAssignmentFullyContainedInSecond(assignment2, assignment1);
}

function isFirstAssignmentFullyContainedInSecond(first, second) {
  return isFirstLowerBoundGreaterThanOrEqualToSecondLowerBound(first, second) && isFirstUpperBoundLessThanOrEqualToSecondUpperBound(first, second);
}

function isFirstLowerBoundGreaterThanOrEqualToSecondLowerBound(first, second) {
  const firstLowerBound = parseInt(first.split('-')[0]);
  const secondLowerBound = parseInt(second.split('-')[0]);

  return firstLowerBound >= secondLowerBound;
}


function isFirstUpperBoundLessThanOrEqualToSecondUpperBound(first, second) {
  const firstUpperBound = parseInt(first.split('-')[1]);
  const secondUpperBound = parseInt(second.split('-')[1]);

  return firstUpperBound <= secondUpperBound;
}

function isAssignmentPartiallyContained(assignmentPair) {
  const assignment1 = assignmentPair[0];
  const assignment2 = assignmentPair[1];

  return isFirstAssignmentPartiallyContainedInSecond(assignment1, assignment2) || isFirstAssignmentPartiallyContainedInSecond(assignment2, assignment1);
}

function isFirstAssignmentPartiallyContainedInSecond(first, second) {
  return !(isFirstLowerBoundGreaterThanSecondUpperBound(first, second) || isFirstUpperBoundIsLessThanSecondLowerBound(first, second));
}

function isFirstLowerBoundGreaterThanSecondUpperBound(first, second) {
  const firstLowerBound = parseInt(first.split('-')[0]);
  const secondUpperBound = parseInt(second.split('-')[1]);

  return firstLowerBound > secondUpperBound;
}

function isFirstUpperBoundIsLessThanSecondLowerBound(first, second) {
  const firstUpperBound = parseInt(first.split('-')[1]);
  const secondLowerBound = parseInt(second.split('-')[0]);

  return firstUpperBound < secondLowerBound;
}

const assignmentPairs = getAssignmentPairs();
// console.log(assignmentPairs);
const totalNumberFullyContained = assignmentPairs.filter((assignmentPair) => assignmentPair.isFullyContained).length;
console.log("Part 1");
console.log(totalNumberFullyContained);


const totalNumberPartiallyContained = assignmentPairs.filter((assignmentPair) => assignmentPair.isPartiallyContained).length;
console.log("Part 2")
console.log(totalNumberPartiallyContained);



