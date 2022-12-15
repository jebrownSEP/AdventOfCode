import { getFileByLinesSync, Coordinate } from '../shared/utils';
import * as R from 'ramda';




function getBeaconNotPresentPositions() {
    try {
        const lines = getFileByLinesSync('./day15/day15.txt');
        const part1 =  getBeaconNotPresentPositionsInRowY(lines, 10);
        const part2 = getBeaconNotPresentPositionsInRowY(lines, 10);
        return {part1, part2}
      } catch (err) {
        console.error(err);
      }
      return {part1: new Set(), part2: new Set()};
}

function getBeaconNotPresentPositionsInRowY(lines: string[], rowY: number) {
  // key is row (y), value is array of x coordinates where a beacon cannot be present
  // using Set to avoid pushing duplicates
  const grid: {[y: number]: Set<number>} = {};
  // Likely do NOT need to track sensors or beacons as there won't be overlap
  // be sure to include sensor's position in the set (as no beacon is there)
  // For future reference: you can technically do this with a normal array as well, doesn't have to be an object/map
  grid[rowY] = new Set();
  for (const line of lines) {
    const splitString = line.split('=');
    const sensorCoordinate: Coordinate = {
      x: parseIntUpToChar(splitString[1], ','),
      y: parseIntUpToChar(splitString[2], ':'),
    };
    const beaconCoordinate: Coordinate = {
      x: parseIntUpToChar(splitString[3], ','),
      y: parseIntUpToChar(splitString[4], '')
    };

    getPositionsBeaconCannotBe(sensorCoordinate, beaconCoordinate);
  }

}

function parseIntUpToChar(stringToParse: string, characterToStopAt: string) {
  if(characterToStopAt === '') {
    return parseInt(stringToParse);
  }
  const indexOfChar = stringToParse.indexOf(characterToStopAt);
  return parseInt(stringToParse.substring(0, indexOfChar));
}

function getPositionsBeaconCannotBe(sensorCoord: Coordinate, beaconCoord: Coordinate): {[y: number]: Set<number>}{
  const totalManhattanDistance = Math.abs(sensorCoord.x - beaconCoord.x) + Math.abs(sensorCoord.y - beaconCoord.y);
  let coordinatesBeaconCannotBe = {};
  
  coordinatesBeaconCannotBe.add(sensorCoord);
  
  for (let i = 0; i < totalManhattanDistance; i++) {
    // add coordinates i distance away
    const coordinatesIAway = getCoordinatesAtXDistance(sensorCoord, i);
    coordinatesBeaconCannotBe = new Set([...coordinatesBeaconCannotBe, ...coordinatesIAway]);
  }
 
  return coordinatesBeaconCannotBe;
}

function getCoordinatesAtXDistance(coordinate: Coordinate, distance: number) {
  return new Set<Coordinate>([
    // up 
    {
      x: coordinate.x,
      y: coordinate.y - distance
    },
    // down
    {
      x: coordinate.x,
      y: coordinate.y + distance
    },
    // left
    {
      x: coordinate.x - distance,
      y: coordinate.y
    },
    // right
    {
      x: coordinate.x + distance,
      y: coordinate.y
    },
  ]);
}

const start = Date.now();
console.log('start', start);
const {part1, part2} = getBeaconNotPresentPositions();
const end = Date.now();
console.log(end - start);
console.log(part1);
console.log("Part 1");
