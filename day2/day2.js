const utils = require('../shared/utils')



function getMatches() {
    try {
        const lines = utils.getFileByLinesSync('./day2/day2.txt')

        const matches = lines.map((line) => {
          const hands = line.split(' ');
          const opponentHand = getHandShape(hands[0]);
          const myHand = getHandShape(hands[1]);
          return {
            opponent: {
              handShape: opponentHand,
              points: getPointsForFirstPlayer(opponentHand, myHand)
            },
            myself: {
              handShape: myHand,
              points: getPointsForFirstPlayer(myHand, opponentHand)
            },
          }
        });
        
        return matches;

      } catch (err) {
        console.error(err);
      }
}

const HandShape  = {
  Rock: 1,
  Paper: 2,
  Scissors: 3
}

const Outcome = {
  Loss: 0,
  Tie: 3,
  Win: 6
}

function getHandShape(character) {
  switch (character) {
    case 'A':
    case 'X':
      return HandShape.Rock;
    case 'B':
    case 'Y':
      return HandShape.Paper;
    case 'C':
    case 'Z':
      return HandShape.Scissors;
  }
}

function getPointsForFirstPlayer(firstHand, secondHand) {
  return getPointsForHandShape(firstHand) + getPointsForScoreForFirstPlayer(firstHand, secondHand);
}

function getPointsForHandShape(hand) {
  return hand;
}

function getPointsForScoreForFirstPlayer(firstHand, secondHand) {
  if (firstHand === secondHand) {
    return Outcome.Tie;
  } else if (firstHand === HandShape.Rock) {
    if(secondHand === HandShape.Paper) {
      // Rock loses to paper
      return Outcome.Loss;
    } else {
      // Rock beats Scissors
      return Outcome.Win;
    }
  } else if (firstHand === HandShape.Paper) {
    if(secondHand === HandShape.Rock) {
      // Paper beats rock
      return Outcome.Win;
    } else {
      // Paper loses to scissors
      return Outcome.Loss;
    }
  } else { // Scissors
    if(secondHand === HandShape.Rock) {
      // Scissors loses to rock
      return Outcome.Loss;
    } else {
      // Scissors beats paper
      return Outcome.Win;
    }
  }
}

function getMatchesPart2() {
  try {
      const lines = utils.getFileByLinesSync('./day2/day2.txt')

      const matches = lines.map((line) => {
        const hands = line.split(' ');
        const opponentHand = getHandShape(hands[0]);
        const myHand = getHandShapeForOutcome(opponentHand, getOutcome(hands[1]));
        return {
          opponent: {
            handShape: opponentHand,
            points: getPointsForFirstPlayer(opponentHand, myHand)
          },
          myself: {
            handShape: myHand,
            points: getPointsForFirstPlayer(myHand, opponentHand)
          },
        }
      });
      
      return matches;

    } catch (err) {
      console.error(err);
    }
}


const OutcomeCharacter  = {
  'X': Outcome.Loss,
  'Y': Outcome.Tie,
  'Z': Outcome.Win
}

function getOutcome(outcomeCharacter) {
  return OutcomeCharacter[outcomeCharacter];
}

function getHandShapeForOutcome(opponentHand, outcome) {
  switch(outcome) {
    case Outcome.Loss:
      if (opponentHand === HandShape.Rock) {
        return HandShape.Scissors;
      } else if (opponentHand === HandShape.Paper) {
        return HandShape.Rock;
      } else {
        return HandShape.Paper;
      }
    case Outcome.Tie:
      return opponentHand;
    case Outcome.Win:
      if (opponentHand === HandShape.Rock) {
        return HandShape.Paper;
      } else if (opponentHand === HandShape.Paper) {
        return HandShape.Scissors;
      } else {
        return HandShape.Rock;
      }
  }
}


const matches = getMatches();
// console.log(matches);
const totalScore = matches.map((match) => match.myself.points).reduce((prev, current) => current + prev);

console.log("Part 1");
console.log(totalScore);

console.log("Part 2")
const matches2 = getMatchesPart2();
const totalScore2 = matches2.map((match) => match.myself.points).reduce((prev, current) => current + prev);
console.log(totalScore2);




