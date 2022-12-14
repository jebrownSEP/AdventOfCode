import { getFileByLinesSync, Coordinate } from '../shared/utils';
import * as R from 'ramda';


enum RockPattern {
  HORIZONTAL,
  T,
  L,
  VERTICAL,
  SQUARE
}

interface Rock {
  rockCoordinates: Coordinate[];
}

const jetPattern = '><<<>><<<>>><<<>>>><>>><>>>><<>><<>><>>>><<>>><<>><<>>>><<>>><<>><<<<><<<<><><<>><<<<>>>><<><<<>>><>>><<<>>><>><<<<><<<><<>><<<<>>><<<>>><<<>>><<<<><<<>>>><<<<>><<<<>>><<><><>>>><<<>>>><><<<<><<<><>>>><<<>><<>><<>><><<<<><<<<>>><>>>><<>>><><<>><<><<<<>><<>><<>>>><<<<>><<><<><<<<>><<>>><<<<>>><<>><<><<<>>>><<<>><<<>>><>><<><<<<>><<<<><><<<<>>><<<>>><<<>>>><<<<>>><<>>><<<<>>><<<><<><>><>><<<>>><<<<>>>><<>>>><<<<>>><<>>><>><<<>>><<<<>><<<<><>>>><>><>>><<<<>>>><<>>><<<<>><>>>><<<<>><><<<><>>><>>>><>><<<>><<><<<><<<<>>>><>><><<<<><<<>>>><<<<>>>><<<<>><<>><<>>><<<>>>><>>>><<<><<<>>><>><<<<>>><<<>><<<>>>><<>>>><<<>>><<><<><<<<>><<>>><>>>><<>>>><<><<<<>>><<<<><<<<>>><<>>><>>><<>>>><<<<>>>><<><>>><<<<>><<><<>><<<<>><<<<>>><<<>><><<<><<<<>>>><<>>><><<>><<<>><<>>><<<<>><>><<<>><<<>>><>>><>>>><<<><>><<>>>><<<<>><<><<<<>><<<>><<>><<<>>>><><<<>>><>><<<><<<>>><<<><<<<>>><<>>><<<>>>><<<>><<>>><<>><<>>>><<>>>><>>>><<<<>><>>><<<><<<><<><<<<>>>><<>>><<<<><<<<>><>><<>><<<><<>>><>>>><>>>><<<<>>>><>>>><<<>><<<<>>><<<>>><>>><<><<>>>><<<><>>><<>>>><<<<><>>>><><<<<>>><<<>><>>><><<>>>><<<<>>><<<<><<>>><<>>>><>><<<<><<<><<<>>>><<><<<<>>>><<<>>><<<>><<>>><>>>><<<<>>>><<<<>><>><><<<><>>><>><>>>><<<<>>><<<<>><<<>><<<<>>>><<<><>>><<><<<>><<<>>>><<<>><>>>><<<<>>>><>>><<>>><<<>>><<<><>>>><>><<<<>>><>><<<><<<<>>><><<<<>>><<<<><<>>>><<<<>>><<<>><<<><><<>>>><>><<>>><>><<>>><<<<>><<<<><>><<<<>><<<><<>><>>>><<<>>>><<<<>>><<<<>>><>>><>>><<>>><<<<><<<<>><><<<>>><<>><<>>><>>><<<<>>><<<<>>><<<>>><<<<>>><<<<>>>><<>>><<<>><<<<><<><<>><>>>><<<<>>><<>><<>>><<<>>>><<<<>>><<<<><>>>><<<<>>>><<<><>><<<<>>><><<<><>>><<<<><<<<><>>><<<<>>><>>>><>>>><<>>>><<<>>><<>><<<<><<<>>>><<<<>>><<<<><<<<>><<<>><<>>><<<<>><>>>><<<<>><<>>><<<><<>>><<>><<>>>><<<<>>><<<<>>><<<<>>><>>>><>>><<><>><<<<>>>><>>><<>>><<<>><<<><<><<<>><<<>>>><>>><<>><<>>><<<<><<<>>><<<<>>>><<<>>><>>><<>>><<<<>>>><<><<>><>>><<>>>><>>>><>><<<>>>><<>>>><<<<>>><>>><<>>>><<<<>>>><><<<<>>>><<><<<<>>><<<<>>>><<>><>><<<<>>><<><<<>>>><<<>>><<<>>><<<<>>><<>><>>><<<>>>><>>>><<><>>><<<>>><>>><<<><<<><<>>><>>><<>>>><<><<<<>>>><<>><<<<>><<<<>>>><<<><>>><<><<<<>>>><<<>><<<>><>><>>>><>><><<>><<>><<<<><<><<>>>><>>><<<<><<>>>><<><<>>><<<<>><<<<><<<><>>><<>>>><<<<><<<<>>><<<>><<<<><<<<>>>><<>>>><<<<>>><<<><<<><<><<<<>>>><<<>>>><<<>>><<<<>><<<>>>><>>><<<<>><<>>>><<<>>>><>><<<<>>><<<<>>><<><<>>>><<<><<<<>>>><<<>><<>>>><<<>>>><<<><<<<>>><<<>>>><>><<<<>>><<>>>><><<<<>>>><<>><<<>><<<>><<<<>>>><<<<>>>><<<>>><<>>>><<<<><<<<>>><<<>>>><<<<>>><<<<>>><>>><<<<>><<>><>>>><<<><<<>>>><<<>>>><>>><<><><<<>>>><>>>><<<>>>><<>>>><><<<<>><>>><>>>><><<>>>><>>><<>>>><<<>><<>>>><<><<><<>><<<<>>><<<>>>><<>>><<<>>>><>><<<<>>><<>>><<<>>><<<>>>><<><>>><>>>><>>>><<<<>><<>>><><<>>><<>>><<>>><<>><><<<><<<<>>><<<<><<<<><<<<>><<<<><<<><<<<>>><<<<>>>><><<<>><>>><>>><>><<<>>>><<<>>>><<>>><<><>><<<>>><<<><>>><<<>>><<>><<>><<>>>><<<<>>><<<>>>><>><<>>>><<<<><<<>>><<>><<<><<<>>><>>>><<<<><<<>><>><<<>><>>>><<<<><>><<<<>><<>><>>>><<>><<<<>>>><>><>>>><<><<>><>>>><<<>>>><<<<>><>>><<>><<<<>><<<<><<<<>>>><>><<>><<<<><<<>>>><<<>><<>>>><<<>>>><>>>><<<>><<<>><<<><<>>><<>>>><<>>><<<>><<<>><<<>>><<>>><>><<><<<>><<><>><>><<<>>><<<<><<<><>>>><<<><>>><<<>>><<<<>>><<>>><<<<>>>><<>><<<>>>><<><<<><>>><<<>>><<<>><<<<>>><<>>><>><<<>><<>>><>>><<<>>><<<>>>><<<>>>><>>><<<<><>>>><><>>>><>><>>><>><<>><<<<>>>><><<<<>>><>>>><<>>><<<><<<>><<>><<<>>>><<>>>><><<<>>><<<<>><<<<><<>><>>><>><<<>>>><<<<>><<<>>>><<<<><<<>>><<>>>><<>><<<<>>>><<<<>>><<<>>><<>><<<>><>>>><<<>>>><<<<><>>><<><<<>>>><>>>><<>>>><>><<<><<>>><<<>>><<<<>>>><<<<>>><>><<>>><<<<>>>><<<<><<>><<>>><<<<>><<<<>><<><>>>><>>>><<>>>><<>>>><>><<<>>><<<>><<<<>>><<<>>><>><<>><<>><<<>><<<<><<<<><>>><<>>>><>>>><<<>>>><<<>><<><<><<<<>>>><<<<><<<>><<<><>>><<<<>><>><<><<<>><>>><<>>>><<><<>><<>><<<<><<>>><<<<>>><<<><<<<>><<<>>>><><<>>>><<>>>><<<>><<<<>>><<<<><><><<<>><<<<>>><<<<>>>><>>><<<>>>><<<<>><>><<<<>><<>><<<>><<<><<<><<<<>>>><><<>>>><>>><<>>>><>>>><<<<>>><<<>>><<<<><>>><><<<<>><<<<>>><<<<>>>><>>>><<<>>><<<<>>>><<<<>>><>>><<>><<>>>><<<<><<<<>><<>>><<><><<><<<<><<><<<><>>>><<<<>><<>>><>>><<><<>><<>>>><<<<><<<>>>><<>>>><<<><<<><>>><<<>>>><><<<>>>><><>>><<>>>><<<<>>><<<>>>><<<<>><<<>><<<<><<<><<>>>><>>><<<>>>><>>>><<<><<>>>><<<<>>>><>>><<<>><<>><<<<>>><<<>><>>>><<<<>>>><<><<<>>><<<<>><<<>>><><<<<>><<<<>><<><<>><>><><<<<><<>>><<<<>>><<>>><<<<>><<<<>><<><<<<>>><<>><<>>><><<<>>>><>>><<>>>><<<<>><<<<><<>>>><>>>><>>><<<<>>><>><>><<<<>><>>><<<>>>><<<><<<>><<<>>>><<>>><<<>>>><><>>>><<>><<<<>><<<<>>><<>><<>>><>><<<>><<<>>><<<<>>>><<<<>>>><>><<<<>>>><<><<<<>>><>>>><>>><<>>>><<<>>>><>>>><><<<><<>>>><><><<<<>>><<<<>><<<<><<><<<<>>><<<<>><<>>><<<>>><<<<>>><<<<><<<<>>>><<<<>>>><<<>><<>>><<<<><>>>><<>>>><<<<><<<><>>><<<>>>><>>><<<>><<<>><<<>>>><<>>><<><>><>>>><<<>>><<><<<>><<<<><>>><><<<<>><<<>><<<>>>><<><<<<>>><<<<>><<<>><<<>>><<>>>><>>><<>>><<<<><><<<>><<<><>><<>><<<<>>><<<>>>><<<<>>><<><<<<>>><<<>><<<>>>><<<<><><<>>><<<><<<>>><<<<>>>><>>>><<><<<><<<<>>>><<<><>>><<<<><<<<>><<>>>><<>><>>><>>><<>>><><><<<>>>><><>>><>>>><<<><<<<>><<<>>><<<<>><>>>><<><<><<<<>><><><<<>><<<<>>><<<<>>>><>><<<<>><>>>><>>><<<<><<<>>><<<<>><<<<>>>><<>>><<>><<<<>>>><<>>>><<<<>><><<<>>>><><<<<>><>>><<<<>><<<><<<<>>><<>>><<>>><<<>>>><>>>><>>><<>>>><<<<><><>>>><<<><><>>><>>>><<<<><<<<>>><<>>><<<<>>><>>>><<<<>>><<<>><<><>><<<<>>><<>>><<<>><><<<<>>>><<>>>><<<>>>><<>><<<>>>><<<>><<<<>>><>>>><<>>><<<<>><<<>>>><<<<>>>><<>><<<>>><<>><<><><>><<<<><<>><<<<>><<><<<>>>><<>>>><<<><>>>><><<>><<<<>>><<<>>><<<<>>><>>><<<>>><><>>>><<>>>><<<<><<><<>>>><<<>>>><<><<<<>>><<<<>>><<>><<<<><<<>>>><<<>>>><<<<>>>><<<<>>><<>><><>>>><<>><<<>>>><<<<>><<<<>>><<<<>>><><<<>>>><<<<>>><<>><<<><<<<>>><>>>><>>><<>>><<>><<<<>>><<<<>>><<<>><>>><<<>>><<>>>><<>>><<<><<<>><<><<<<>>>><>>>><>>><<>>><<<>>>><<>>>><<><<<>>>><<><<<>><>><<>><<<<>><<>><<<<><<<<><<>>><<<>>>><><<>>>><<<><<>>>><<<<><>><<>><<<>>><<<<>><>><<<<>><<<<>><<>>><<<<><<>>>><>>>><<>>>><>>><>>><<<<>>><><><>>><<<>><<<>><>>><><>><<<<>>>><<>>>><<<>><>>><>><<>>>><<<<>>>><<<>><<<>>><>><<<>>><<<<>><<<<>><<>>>><>><><<<>>><<<>>><><><<<>>>><<<<>><<<><<<<>>>><<<<>>><>><>>>><<<>><<<<><<<<>>>><<>><<<<>>><<><<>>>><<>>><<<>>>><<>>>><<>><<>>>><<<<>>>><<<>>><<>><<<>>><<>>>><<<<>>>><>>><<<<>>><<>>>><<<<><<<>>>><<>><>><<<>>><<<<>><>>>><<<<>>>><>>><<<<>>><>>>><<><<>>><<>><<<<>>>><<<>><<<>>><<<<>><<<>>><<<>><<<><<>><<>>>><<<<>><<<>>><<>><<<>>>><<>>>><<<<>>>><<<>>><<<<>>><<>>><<>>>><<<<><<<<>>>><<<<>><>><<<<>><<><<<<>>>><<>><<<<>>><<<><<<><><<<>>><<<<><>><<<>><<>>>><<>><><<><<>>><<<>><>>><<<<>><>>><><<<>>>><<<<>>>><<>><<>><<<<>>>><<>>>><<<<>><>><<>>><<<>><>><<><<>>>><<<<>><>>>><<<<>>><><>>><>><<<<><<<><<<<>>><<<<>><<<<>>>><>><>>>><<<<>>><>>><<<<>>><<<<>>><<>><<><<<>>><><<<>><>>>><>><>>>><<<<>>><<<<>>><><<<<>>><<>>>><<<<>>>><<<>>><<<>><<<<>><<<>>><<<<><><<<<><><<<>><<>>>><<<<>>><<<<>>>><<<><<<>>>><<>>>><<<<>>>><<>>><<>><<>><<<>>><><<<><<<<><>>><<<<>>>><<<<>>>><<>>><<<<>><<<>>><<>>>><><>>>><<<<>><<<><><<<<><>>><<>>><>><>>><<<>>>><<<>>><>>>><<>>><><<<><<<<><<>>>><>>>><<<<>>>><<<<>>>><<>>><>>><>><<>>><><<><<><<<>><>><><<><<>><<>>><<<>>><<<<>>>><><<><<><<>>><<<>>>><<><<<<>>>><<<>>><<>><><>>>><<<>>>><<>>>><<<>><<<><<>><<<<>>>><<<<>>>><<>>>><<<<>>><<>>><<>>>><<>><>><<<<>><<<<>>><>>>><<>><<>><>><>>>><<<<>>>><<<<>>><>>>><<>><<<><><<<><<<<>>><<<<>>><<<<>>><>>><><><>>>><>>>><<<<>>>><<<<>>>><<>>>><<<<>>>><<>><<<>>><<>>>><<><><>>>><>><<>><<<>>><<<<>>>><>>>><<>>>><><><<<<>>><<<>>>><<>>>><<>>><<>><<><>><<<>>><<<<>>><<<<>>><<>>><<<<>><<<<>><<<<>>><<<>><<<>>>><<<><><<>><>><<>><<<<>>><<<<><><<<>>>><<<<><<>>><<<>>><<<><<<<>><<><<<<>>>><<<<>>><<<<>>><<<<>><<><<>><<<>>><<<<>>>><>><>>><<<><<<<>>>><<<>>><<>><<>><<<<>>><<<>><<>>>><<>><><>>><<>>><<>><<><<<<>>>><>>><<><<>>>><<<>>><<>>><<>>><<<>>><<>>><<><<>>>><<<<>>>><<<>><<<>>><<>><<<>>>><<<<>>>><<<<><>>>><<<<>><>><<>>><>>><>>><<<<>>><<>><>><<>>><>><<>><><<<>>><<<><<<<>>><<<<>>>><<<<>>><<><<>>><<<<>><<<>><<<<>>><<<>><>>><<>>>><<<>>><<><<>><<>><<<>>>><><<<<>><<<>><<<><<<>>>><>>><<<>>>><<<><<>>><<<>>>><>>>><<<<>><<>>>><>>><<<<>>>><<<<>>><>><<<>><<>><<<><<<<>>><>>><<<>>>><><>>><<<<>>><>>>><<<>><<<<>><>>>><><<<>>>><><<<<>>><<>>>><>>><<<>>><<<><<<<>>><<<<><<<<>>>><<<<>><<>>>><<<<>>><>>>><<<>><<<><<<<><<<<>>>><<<>>><<<><>>>><<<>><<<>>><<<<>>>><<<>>>><<<>><<<>>><<>>>><<<<>>><<<><>>><>>>><>><<<>><<>><><<<<><<<>>><<<>><<<<>>>><<<>>>><<>>><<<<>>>><<<>>>><<<>>><<<>>>><>><>>>><<<>>>><<<<>>><<<<>><<<>><<<>>>><<>>><><<>><<<<>><<>>><<<<>>>><<<<>><<<<>>><>><<<>>><<>><<<<>><<<>>><<<><<>>>><<>>><><<<<><>>><<>>><<<<><<<<><>>><<>>>><<<>>>><<>>><<<<><<>>><<>>>><<<<>><<<>>><<<>><<<<>>><<<>><<<<>>><<>>>><>><<<<>>><<<>>>><<<<>><<<>>><<<<>><<><<><>>>><<<><>>>><<<>>><>>><>>>><<<>><<<<>><>><<<>>><<<<><>>>><<<<><<<<>>><<><<<>>>><<<><<><<<<>>>><<><<><<>><<<<>>>><<>>><>>><<<<>>>><<<<><<>><<<>>><<<<>>>><<<>>><>>>><<<<>>><<<>><<<>><<<>>>><<<>><<<<>>><><><<>>>><>>><<>>><<<>><<>>>><>>>><<<><>>>><>>>><<<>>>><<<>><<<<>>>><<<<><<<<>>><<>><<<>>><<<<>>>><>>>><<><<<<><<><>><<<>>><<<><<<<><<<<>>><<<<>>>><<<<>><<<<>>>><<>>><<<>>><<<>>>><<<>><<<>>>><<<<>>>><>>>><<><<>><<<<>><<>><<<<>>><>>>><<<<>><<>>><<>>>><<<><>><><<<<>>><<<><<>>>><<>>><<<<>>><<<>>><>>>><<>>><<<>>><<>><>><>>>><<><<<><<<<>>>><<<<><>>><>><<>>><<<><>>><<<<><>><<<<><<<<><<<<><>>>><<<>>><<<<>><<<<>>><<>>>><<>>>><>>>><<<>><<<<>><>>><<<><<>><><<>>><<<<>>><><<<<>>><>>><<>>><<>>>><><<<>>>><<>>><>>>><>>>><<<<>>><<>>>><<>>>><>><><<<<>>><<><<>>><<<<>>><<<<><<<<><<>>>><>>>><<<<>>>><<<<><<<<>>><<>>><<<><>>><<><<<>>>><<><>>>><><<>><<>>>><<>><<<><<<>>>><>>>><<<><>>><<>>><<<>>><<<<>>>><<<>><<<<><<<>>><<<<>><>>><<>>><<<<>><>><<<>>><><>><<<>>>><<>>>><<<><<<<>><<<<>>>><>><<><<>>>><<<>><>><<<<><>>><><<<<>>><><<<>>><<><<<>>>><><<>>><<><<>>><<<><<<<><<>><<<>>>><<<<>>>><<>>><<<><<<>>><>><<<<>><<>>><<<>><>>><<<><>><<>><<<>><<>><<>>><<<<>>>><>><<><<<<><>>><<<>>><<<<>><>><<>>>><<><<>><<>>><>>><<<>>><<><<<<><><<>>><<>>><<<><><<>>>><<<>><<<<>><<<>>><<<><>>><<>>><<>>>><><<>>><<>><>>>><<>><<<><>><<<>>><<<<>>><<>><<<>>>><<<>>><<>>><<<<>>>><<<>>>><<<>>>><>>>><<>>>><<<>>><<>>>><<>><<>>>><<<><><><<>>><<<>><<<><>>>><>>><<>><<<<>>><<<<>><<<>><>><<<<>><<<<><<<><<<<>><<<>>>><>>>><<>><<><<<>>><<<><<<>>><<>>>><<<>>>><>>>><<<><>>><<>>><<<<>>><<<<>>>><>>';
const rockPattern = [RockPattern.HORIZONTAL, RockPattern.T, RockPattern.L, RockPattern.VERTICAL, RockPattern.SQUARE];

// [y][x]
// 0,0 is bottom left
const WIDTH = 7;

let chamber: Set<number>[] = [];

function getOptimalPath() {
    try {
        // const part1 =  getHeightOfRocksAfterXRocks(2022);
        const part2 = getHeightOfRocksAfterXRocks(1000000000000);  // 1000000000000 is 1 million * 1 million
        // 10000 completes in 1.2 s
        return {part: 0, part2}
      } catch (err) {
        console.error(err);
      }
      return {part1: 0, part2: 0};
}

// TODO: optimize by looking for cycles...
function getHeightOfRocksAfterXRocks(totalRocksToWaitFor: number) {
  let rockIndex = 0;
  let numberOfRocksResting = 0;
  let jetIndex = 0;
  let height = 0;
  let repeatPattern: Set<number>[] = [];
  repeatPattern[RockPattern.HORIZONTAL] = new Set<number>();
  repeatPattern[RockPattern.T] = new Set<number>();
  repeatPattern[RockPattern.L] = new Set<number>();
  repeatPattern[RockPattern.VERTICAL] = new Set<number>();
  repeatPattern[RockPattern.SQUARE] = new Set<number>();

  // while(numberOfRocksResting < totalRocksToWaitFor) {
    while(true) {
    if(numberOfRocksResting % 1000000 === 0) {
      // console.log('rocks remaining', totalRocksToWaitFor - numberOfRocksResting);
      // console.log('taken time in minutes', (Date.now() - start)/ 1000 / 60);
      reassignChamber(100);
    }

    if(rockIndex === rockPattern.length) {
      rockIndex = 0;
    }

    let currentRock = getRock(rockPattern[rockIndex], height);
    if(jetIndex === jetPattern.length) {
      jetIndex = 0;
    }
    // if(rockIndex === 3 && jetIndex === 1039) {
    //   console.log("CHECKING REPEAT", numberOfRocksResting, height);
    // }

    //  Pattern for 2755, 4500, 6245
    if(numberOfRocksResting === 2755 || numberOfRocksResting === 4500 || numberOfRocksResting === 6245) {
        console.log("CHECKING REPEAT", rockIndex, jetIndex, numberOfRocksResting, height);
    }
    // 4374 - 3053 = 1321
    // AND
    // 7152 - 5831 = 1321
    // AND ...
    


    // 1745 differences
    // CHECKING REPEAT 1923 3053
    // CHECKING REPEAT 3668 5831
    // CHECKING REPEAT 5413 8609
    // CHECKING REPEAT 7158 11387
    // CHECKING REPEAT 8903 14165
    // CHECKING REPEAT 10648 16943
    // CHECKING REPEAT 12393 19721
    // CHECKING REPEAT 14138 22499
    
    //                            Rock,JET,resting,height
    // Repeat found at REPEAT FOUND 3 1039 1923 3053
    // original is at 173
    // diff 1750 for rocks
    // 1745 for ALL except first?...

    // height difference
    // 2778 for all except first


    // 1000000000000 - 1923 = 999999998077
    // 999999998077 / 1745 = 573065901.476790830945559
    // 1745 * 573065901 + 1923 = 999999999168 
              // we can accurately predict height of this
              // height at 999999999168 rocks = 3053 + (2778 * 573065901) = 1591977076031

    // 1000000000000 - 999999999168 = 832
    // With that rock difference, we get 1321 height difference so total is 
    // 1591977076031 + 1321 = 1591977077352
    //  Rock,JET,resting,height
    
    
    // if(!repeatPattern[rockPattern[rockIndex]].has(jetIndex)) {
    //   repeatPattern[rockPattern[rockIndex]].add(jetIndex);
    // } else {
    //   console.log('REPEAT FOUND', rockIndex, jetIndex, numberOfRocksResting);
    //   return height;
    // }

    while(true) {
      if(jetIndex === jetPattern.length) {
        jetIndex = 0;
      }
      const movedRock = moveRock(currentRock, jetPattern[jetIndex]);

      if(!isOverlapping(movedRock)) {
        currentRock = movedRock;
      }
      const droppedRock = moveRockDown(currentRock);
      jetIndex += 1;

      if(!isOverlapping(droppedRock))  {
        currentRock = droppedRock;
      } else {
        // current rock is resting
        height = updateChamber(currentRock, height);
        numberOfRocksResting += 1;
        break;
      }
    }
    rockIndex += 1;
  }
  return height;
}

function getRock(rockPattern: RockPattern, currentTowerHeight: number): Rock {
  // left edge appears at x = 2 (0-indexed), bottom appears at y = height + 3
  const bottomY = currentTowerHeight + 3;
  const leftX = 2;

  switch(rockPattern) {
    case RockPattern.HORIZONTAL:
      return {
        rockCoordinates: [
          {
            x: leftX,
            y: bottomY
          },
          {
            x: leftX + 1,
            y: bottomY
          },
          {
            x: leftX + 2,
            y: bottomY
          },
          {
            x: leftX + 3,
            y: bottomY
          },
        ],
      };
    case RockPattern.T:
      return {
        rockCoordinates: [
          // bottom
          {
            x: leftX + 1,
            y: bottomY
          },
          // middle
          {
            x: leftX + 1,
            y: bottomY + 1
          },
          // left
          {
            x: leftX,
            y: bottomY + 1
          },
          // right
          {
            x: leftX + 2,
            y: bottomY + 1
          },
          // top
          {
            x: leftX + 1,
            y: bottomY + 2
          },
        ],
      };
    case RockPattern.L:
      return {
        rockCoordinates: [
          {
            x: leftX,
            y: bottomY
          },
          {
            x: leftX + 1,
            y: bottomY
          },
          {
            x: leftX + 2,
            y: bottomY
          },
          {
            x: leftX + 2,
            y: bottomY + 1
          },
          {
            x: leftX + 2,
            y: bottomY + 2
          },
        ],
      };
    case RockPattern.VERTICAL:
       return {
         rockCoordinates: [
          {
            x: leftX,
            y: bottomY
          },
          {
            x: leftX,
            y: bottomY + 1
          },
          {
            x: leftX,
            y: bottomY + 2
          },
          {
            x: leftX,
            y: bottomY + 3
          },
        ],
      };
    case RockPattern.SQUARE:
      return {
        rockCoordinates: [
          // bottom left
          {
            x: leftX,
            y: bottomY
          },
          // bottom right
          {
            x: leftX + 1,
            y: bottomY
          },
          // top left
          {
            x: leftX,
            y: bottomY + 1
          },
          // top right
          {
            x: leftX + 1,
            y: bottomY + 1
          },
        ],
      };
  }
}


function moveRock(rock: Rock, jet: string) {
  if(jet === '<') {
    return moveRockLeft(rock);
  } else {
    return moveRockRight(rock);
  }
}

function moveRockLeft(rock: Rock): Rock {
  return {
    rockCoordinates: rock.rockCoordinates.map((coord) => {return {x: coord.x - 1, y: coord.y}})
  };
}

function moveRockRight(rock: Rock): Rock {
  return {
    rockCoordinates: rock.rockCoordinates.map((coord) => {return {x: coord.x + 1, y: coord.y}})
  };
}

function moveRockDown(rock: Rock): Rock {
  return {
    rockCoordinates: rock.rockCoordinates.map((coord) => {return {x: coord.x, y: coord.y - 1}})
  };
}

function isOverlapping(rock: Rock): boolean {
  // check bounds of y >= 0
  // and x between 0 and 7
  // and check if hitting other rocks
  return rock.rockCoordinates.some((coord) => coord.x  < 0  || coord.x >= WIDTH || coord.y < 0 || chamber[coord.y]?.has(coord.x));
}

function updateChamber(rock: Rock, height: number) {
  let newHeight = height;
  rock.rockCoordinates.forEach((coord) => {
    if(chamber[coord.y]) {
      chamber[coord.y].add(coord.x);
    } else {
      chamber[coord.y] = new Set<number>([coord.x]);
    }
    if(coord.y + 1 > newHeight) {
      newHeight = coord.y + 1;
    }
  })
  return newHeight;
}

function reassignChamber(x: number) {
  let newChamber: Set<number>[] = [];
  const lastX = chamber.slice(-x);

  for(let i = 0; i < x; i++) {
    newChamber[(chamber.length - x) + i] = lastX[i];
  }

  chamber = newChamber;
}

const start = Date.now();
console.log('start', start);
const {part1, part2} = getOptimalPath();
const end = Date.now();
console.log("Total time (ms): ", end - start);
// console.log(chamber);
// console.log("Part 1");
// console.log(part1);
console.log("Part 2");
console.log(part2);

// jet length: 10091
// shape length: 5
// 16046 for jetLength
// 80295 for jet * pattern
// 160624 for ^ * 2