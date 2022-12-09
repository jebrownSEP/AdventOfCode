import { getFileByLinesSync } from '../shared/utils';
import * as R from 'ramda';



interface Knot{
  x: number;
  y: number;
}
// 0,0 is center
// + x is right
// + y is up
const part1Knots: Knot[] = [
  {x: 0, y: 0},
  {x: 0, y: 0}
];

const part2Knots: Knot[] = [
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0}
];

function getTailVisitedLocations() {
    try {
        const lines = getFileByLinesSync('./day9/day9.txt');
        const part1 =  populateTailVisitedLocations(part1Knots, lines);
        const part2 = populateTailVisitedLocations(part2Knots, lines);
        return {part1, part2};
      } catch (err) {
        console.error(err);
      }
      return {part1: [], part2: []};
}



function populateTailVisitedLocations(knots: Knot[], lines: string[]) {
  let tailVisitedLocations: string[] = ['0,0'];
  for (let i = 0; i< lines.length; i++) {
    const command = lines[i].split(' ');
    const direction = command[0];
    let distance = parseInt(command[1]);

    while(distance > 0) {
      console.log('knots', knots);

      // Move head
      moveKnot(knots[0], direction);

      for (let j = 1; j < knots.length; j++) {
        if(!areKnotsTouching(knots[j-1], knots[j])) {
          moveTailTowardsHead(knots[j], knots[j-1]);
          if(j == knots.length -1) {
            // this is the actual tail
            tailVisitedLocations.push(knots[j].x + ',' + knots[j].y);
          }
        } else {
          break; // don't need to check the other knots
        }
      }

      distance -=1;
    }
  }
  return tailVisitedLocations;
}

function moveKnot(knot: Knot, direction: string) {
  switch(direction) {
    case 'L':
      knot.x -= 1;
      return;
    case 'R':
      knot.x += 1;
      return;
    case 'D':   
      knot.y -= 1;
      return;
    case 'U':
      knot.y += 1;
      return;
    default:
      console.log('unexpected direction', direction);
  }
}

function areKnotsTouching(knot1: Knot, knot2: Knot): boolean {
  const xDiff = Math.abs(knot1.x - knot2.x);
  const yDiff = Math.abs(knot1.y - knot2.y);
  
  return xDiff <= 1 && yDiff <= 1;
}

function moveTailTowardsHead(tail: Knot, head: Knot) {
  const xDistance = head.x - tail.x;
  const yDistance = head.y - tail.y;

  console.log('distances', xDistance, yDistance);
  // 2 to the right
  if(xDistance == 2 && yDistance == 0) {
    moveKnot(tail, 'R');
  // 2 to the left
  } else if (xDistance == -2 && yDistance == 0) {
    moveKnot(tail, 'L');
  // 2 up
  } else if (yDistance == 2 && xDistance == 0) {
    moveKnot(tail, 'U');
  // 2 down
  } else if (yDistance == -2 && xDistance == 0) {
    moveKnot(tail, 'D');
  } else if(xDistance > 0 && yDistance > 0) {
    moveKnot(tail, 'R');
    moveKnot(tail, 'U');
  } else if(xDistance > 0 && yDistance < 0) {
    moveKnot(tail, 'R');
    moveKnot(tail, 'D');
  } else if(xDistance < 0 && yDistance > 0) {
    moveKnot(tail, 'L');
    moveKnot(tail, 'U');
  } else if(xDistance < 0 && yDistance < 0) {
    moveKnot(tail, 'L');
    moveKnot(tail, 'D');
  }
}



const start = Date.now();
console.log('start', start);
const {part1, part2} = getTailVisitedLocations();
const end = Date.now();
console.log(end - start);
console.log(part1);
console.log("Part 1");
console.log(R.uniq(part1).length); // 6212

console.log(part2);
console.log("Part 2");
console.log(R.uniq(part2).length);
