// import { getFileByLinesSync, Coordinate } from '../shared/utils';
// import * as R from 'ramda';

// interface Path {
//   steps: {
//     letterElevation: string;
//     coordinate: string
//   }[];
//   currentLetterElevation: string;
//   currentLetterCoordinate: Coordinate; // 0,0 is top left
// }

// const START_LETTER = 'S';
// const END_LETTER = 'E';
// const LETTER_ELEVATIONS = 'abcdefghijklmnopqrstuvwxyz';

// function getShortestPath() {
//     try {
//         const lines = getFileByLinesSync('./day12/day12.txt');
//         const part1 =  getShortestPathPart1(lines)
//         const part2 = getShortestPathPart2(lines);
//         return {part1, part2}
//       } catch (err) {
//         console.error(err);
//       }
//       return {part1: {}, part2: {}};
// }

// function getHeightOf(letter: string) {
//   if(letter === START_LETTER) {
//     return LETTER_ELEVATIONS.indexOf('a');
//   }
//   if(letter === END_LETTER) {
//     return LETTER_ELEVATIONS.indexOf('z');
//   }
//   return LETTER_ELEVATIONS.indexOf(letter);
// }

// function getShortestPathPart1(lines: string[]): Path {

//   const pathsToTestQueue: Path[] = getStartingPaths(lines);
//   const visitedCoordinates: {[coordinate: string]: boolean} = {};

//   let currentPath;
//   pathsToTestQueue.forEach((path) => visitedCoordinates[path.currentLetterCoordinate.x + ',' + path.currentLetterCoordinate.y] = true);

//   // let bestPath: Path | null = null;

//   while(!currentPath || currentPath.currentLetterElevation !== END_LETTER) {
//     if(pathsToTestQueue.length > 0) {
//       currentPath = pathsToTestQueue.shift()!;
//       // if(currentPath.currentLetterElevation === END_LETTER) {
//         // if(!bestPath || currentPath.numberOfSteps < (bestPath as Path).numberOfSteps){
//         //   console.log('new best path', currentPath);
//         //   bestPath = currentPath;
//         //   break;
//         // }
//       // }
//       // console.log('CURRENT PATH', currentPath);
//       const {steps, currentLetterElevation, currentLetterCoordinate} = currentPath;
//       const {x, y} = currentLetterCoordinate;

//       // up
//       if(y > 0 && !visitedCoordinates[x + ',' + (y-1)] && getHeightOf(lines[y-1][x]) <= getHeightOf(currentLetterElevation) + 1) {
//         pathsToTestQueue.push({
//           steps: steps.concat([{
//             letterElevation: lines[y-1][x],
//             coordinate: x + ',' + (y-1),
//           }]),
//           currentLetterElevation: lines[y-1][x],
//           currentLetterCoordinate: {
//             x: x,
//             y: y-1
//           }
//         });
//         visitedCoordinates[x + ',' + (y-1)] = true;
//       } 
//       // down
//       if(y < lines.length -1  && !visitedCoordinates[x + ',' + (y+1)] && getHeightOf(lines[y+1][x]) <= getHeightOf(currentLetterElevation) + 1) {
//         pathsToTestQueue.push({
//           steps: steps.concat([{
//             letterElevation: lines[y+1][x],
//             coordinate: x + ',' + (y+1),
//           }]),
//           currentLetterElevation: lines[y+1][x],
//           currentLetterCoordinate: {
//             x: x,
//             y: y+1
//           }
//         });
//         visitedCoordinates[x + ',' + (y+1)] = true;
//       }
//       // left
//       if(x > 0 && !visitedCoordinates[(x-1) + ',' + y] &&  getHeightOf(lines[y][x-1]) <= getHeightOf(currentLetterElevation) + 1) {
//           pathsToTestQueue.push({
//             steps: steps.concat([{
//               letterElevation: lines[y][x-1],
//               coordinate: (x-1) + ',' + y,
//             }]),
//           currentLetterElevation: lines[y][x-1],
//           currentLetterCoordinate: {
//             x: x-1,
//             y: y
//           }
//         });
//         visitedCoordinates[(x-1) + ',' + y] = true;
//       }
//       // right
//       if(x < lines[0].length-1 && !visitedCoordinates[(x+1) + ',' + y] &&  getHeightOf(lines[y][x+1]) <= getHeightOf(currentLetterElevation) + 1) {
//         pathsToTestQueue.push({
//           steps: steps.concat([{
//             letterElevation: lines[y][x+1],
//             coordinate: (x+1) + ',' + y
//           }]),
//         currentLetterElevation: lines[y][x+1],
//         currentLetterCoordinate: {
//           x: x+1,
//           y: y
//         }
//         });
//         visitedCoordinates[(x+1) + ',' + y] = true;
//       }
      
//     } else {
//       console.log('NO MORE PATHS!!!');
//       return currentPath as Path;
//     }
//   }

//   return currentPath;
// }

// function getStartingPaths(lines: string[]) {
//   const paths: Path[] = [];
//   console.log('lines and lengths', lines.length, lines[0].length);
//   for(let y = 0; y < lines.length; y++) {
//     for (let x = 0; x < lines[y].length; x++) {
//       const letterElevation = lines[y][x];
//       if(letterElevation === START_LETTER || letterElevation === 'a') {
//         paths.push({
//           currentLetterElevation: letterElevation,
//           currentLetterCoordinate: {
//             x,
//             y
//           },
//           steps: []
//         });
//       }
//     }
//   }
//   return paths;

// }

// function getShortestPathPart2(lines: string[]): Path {
//   return {
//     steps: [],
//     currentLetterElevation: 'S',
//     currentLetterCoordinate: {
//       x: -1,
//       y: -1
//     }
//   };
// }


// const start = Date.now();
// console.log('start', start);
// const {part1, part2} = getShortestPath();
// const end = Date.now();
// console.log(end - start);
// // console.log(part1);
// console.log("Part 1");
// console.log(R.uniq((part1 as Path).steps.map((step) => step.coordinate)).length) // 579 too high, 200 too low

// // const sortedMonkeys = part1.sort((a, b) => b.numberInspectedItems -  a.numberInspectedItems);
// // const monkeyBusiness = sortedMonkeys[0].numberInspectedItems * sortedMonkeys[1].numberInspectedItems;
// // console.log(monkeyBusiness);

// // console.log(part2);
// // console.log("Part 2");
// // const sortedMonkeys2 = part2.sort((a, b) => b.numberInspectedItems -  a.numberInspectedItems);
// // const monkeyBusiness2 = sortedMonkeys2[0].numberInspectedItems * sortedMonkeys2[1].numberInspectedItems;
// // console.log(monkeyBusiness2);
