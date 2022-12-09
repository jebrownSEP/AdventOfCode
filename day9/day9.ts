import { getFileByLinesSync } from '../shared/utils';
import * as R from 'ramda';




function getTailVisitedLocations() {
    try {
        const lines = getFileByLinesSync('./day9/day9.txt');
        return populateTailVisitedLocations(lines)
        
      } catch (err) {
        console.error(err);
      }
      return [];
}
interface Knot{
  x: number;
  y: number;
}
// 0,0 is center
// + x is right
// + y is up
let head: Knot = {
  x: 0,
  y: 0
};

let tail: Knot = {
  x: 0,
  y: 0
};


function populateTailVisitedLocations(lines: string[]) {
  let tailVisitedLocations: string[] = ['0,0'];
  for (let i = 0; i< lines.length; i++) {
    const command = lines[i].split(' ');
    const direction = command[0];
    let distance = parseInt(command[1]);

    while(distance > 0) {
      console.log('head', head);
      console.log('tail', tail);

      moveKnot(head, direction);

      if(!isTailTouchingHead()) {
        moveTailTowardHead();
        tailVisitedLocations.push(tail.x + ',' + tail.y);
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

function isTailTouchingHead(): boolean {
  const xDiff = Math.abs(head.x - tail.x);
  const yDiff = Math.abs(head.y - tail.y);
  
  return xDiff <= 1 && yDiff <= 1;
}

function moveTailTowardHead() {
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
const tailPositions = getTailVisitedLocations();
const end = Date.now();
// console.log(treeVisibilityGrid);
console.log(end - start);
console.log(tailPositions);
console.log("Part 1");
console.log(R.uniq(tailPositions).length);

console.log("Part 2");
// console.log(maxScenicScore); 