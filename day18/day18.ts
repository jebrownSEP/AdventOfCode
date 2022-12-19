// import { getFileByLinesSync, ThreeDCoordinate } from '../shared/utils';
// import * as R from 'ramda';

// interface Cube {
//   coordinate: ThreeDCoordinate;
//   shownSides: number;
// }

// function getCubes() {
//     try {
//         const lines = getFileByLinesSync('./day18/day18.txt');
//         const part1 =  getCubesPart1(lines)
//         // const part2 = getCubesPart2(lines);
//         return {part1, part2: []}
//       } catch (err) {
//         console.error(err);
//       }
//       return {part1: [], part2: []};
// }

// const cubes: Cube[] = [];

// function getCubesPart1(lines: string[]) {

//   for(const line of lines) {
//     const xyz = line.split(',');
//     const coordinate: ThreeDCoordinate = {
//       x: parseInt(xyz[0]),
//       y: parseInt(xyz[1]),
//       z: parseInt(xyz[2]),
//     };
//     const shownSides = getAndAdjustShownSides(coordinate);
//     const cube: Cube = {
//       coordinate,
//       shownSides,
//     };
//     cubes.push(cube);
//   }

//   return cubes;
// }

// function getAndAdjustShownSides(coordinate: ThreeDCoordinate) {
//   if(cubes.length === 0) {
//     return 6;
//   }

//   const adjCubes = getAdjacentCubes(coordinate);

  
// }


// const start = Date.now();
// console.log('start', start);
// const {part1, part2} = getCubes();
// const end = Date.now();
// console.log(end - start);
// console.log(part1);
// console.log("Part 1");
