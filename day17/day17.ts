import { getFileByLinesSync, Coordinate } from '../shared/utils';
import * as R from 'ramda';

interface SetGrid {[y: number]: Set<number>};

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

const jetPattern = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>';
const rockPattern = [RockPattern.HORIZONTAL, RockPattern.T, RockPattern.L, RockPattern.VERTICAL, RockPattern.SQUARE];

// [y][x]
// 0,0 is bottom left
const WIDTH = 7;

const chamber: SetGrid = {};

function getOptimalPath() {
    try {
        const part1 =  getHeightOfRocksAfterXRocks(2022);
        // const part2 = getHeightOfRocksAfterXRocks(1);
        return {part1, part2: 0}
      } catch (err) {
        console.error(err);
      }
      return {part1: 0, part2: 0};
}

function getHeightOfRocksAfterXRocks(totalRocksToWaitFor: number) {
  let rockIndex = 0;
  let numberOfRocksResting = 0;
  let jetIndex = 0;
  let height = 0;

  while(numberOfRocksResting < totalRocksToWaitFor) {
    if(rockIndex === rockPattern.length) {
      rockIndex = 0;
    }

    let currentRock = getRock(rockPattern[rockIndex], height);
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
        updateChamber(currentRock);
        height = Object.keys(chamber).length;
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
  return rock.rockCoordinates.some((coord) => coord.x  < 0  || coord.x >= WIDTH || coord.y < 0 || chamber[coord.y]?.has(coord.x));    // TODO: if need, optimize here? or when moving
}

function updateChamber(rock: Rock) {
  rock.rockCoordinates.forEach((coord) => {
    if(chamber[coord.y]) {
      chamber[coord.y].add(coord.x);
    } else {
      chamber[coord.y] = new Set<number>([coord.x]);
    }
  })
}

const start = Date.now();
console.log('start', start);
const {part1, part2} = getOptimalPath();
const end = Date.now();
console.log("Total time (ms): ", end - start);
console.log(chamber);
console.log("Part 1");
console.log(part1);

