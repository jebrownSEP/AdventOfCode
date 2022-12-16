import { getFileByLinesSync, Coordinate, parseIntUpToChar } from '../shared/utils';
import * as R from 'ramda';

interface SetGrid {[y: number]: Set<number>};


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

const grid: SetGrid = {};

function getBeaconNotPresentPositionsInRowY(lines: string[], rowY: number) {
  // key is row (y), value is array of x coordinates where a beacon cannot be present
  // using Set to avoid pushing duplicates
  // Likely do NOT need to track sensors or beacons as there won't be overlap
  // be sure to include sensor's position in the set (as no beacon is there)
  // For future reference: you can technically do this with a normal array as well, doesn't have to be an object/map

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

    addPositionsBeaconCannotBeToGrid(sensorCoordinate, beaconCoordinate);
  }
  console.log('grid', grid);

  return grid[rowY];
}



function addPositionsBeaconCannotBeToGrid(sensorCoord: Coordinate, beaconCoord: Coordinate) {
  const totalManhattanDistance = Math.abs(sensorCoord.x - beaconCoord.x) + Math.abs(sensorCoord.y - beaconCoord.y);
  
  
  for (let i = 0; i <= totalManhattanDistance; i++) {
    // add coordinates i distance away
    addCoordinatesAtXDistanceToGrid(sensorCoord, i);
  }
}

function addCoordinatesAtXDistanceToGrid(coordinate: Coordinate, distance: number) {
  const surroundingCoordinates = getCoordinatesAtXDistanceAround(coordinate, distance);

  for (const coord of surroundingCoordinates) {
    if(grid[coord.y] !== undefined) {
      grid[coord.y].add(coord.x);
    } else {
      grid[coord.y] = new Set([coord.x]);
    }
  }
}

const start = Date.now();
console.log('start', start);
const {part1, part2} = getBeaconNotPresentPositions();
const end = Date.now();
console.log(end - start);
console.log(part1);
console.log("Part 1");

// TODO: (now) figure out why this isn't getting all the points
// TODO: (future) figure out why can't put this in utils...
function getCoordinatesAtXDistanceAround(coordinate: Coordinate, distance: number): Coordinate[] {
  if(distance === 0) {
    return [coordinate];
  }
  const upCoordinate = {
      x: coordinate.x,
      y: coordinate.y - distance
    };
  
    const downCoordinate =     {
      x: coordinate.x,
      y: coordinate.y + distance
    };
  
    const leftCoordinate =     {
      x: coordinate.x - distance,
      y: coordinate.y
    };
  
    const rightCoordinate =     {
      x: coordinate.x + distance,
      y: coordinate.y
    };

    return [...getCoordinatesAtXDistanceAround(upCoordinate, distance -1), ...getCoordinatesAtXDistanceAround(downCoordinate, distance -1), 
      ...getCoordinatesAtXDistanceAround(leftCoordinate, distance -1), ...getCoordinatesAtXDistanceAround(rightCoordinate, distance -1)]
}


export function parseIntUpToChar(stringToParse: string, characterToStopAt: string) {
  if(characterToStopAt === '') {
    return parseInt(stringToParse);
  }
  const indexOfChar = stringToParse.indexOf(characterToStopAt);
  return parseInt(stringToParse.substring(0, indexOfChar));
}