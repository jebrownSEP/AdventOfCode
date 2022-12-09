import { getFileByLinesSync } from '../shared/utils';
import * as R from 'ramda';

interface TreeVisibility {
  isVisible?: boolean;
  isLeftVisible?: boolean;
  isUpVisible?: boolean;
  isRightVisible?: boolean;
  isDownVisible?: boolean;
  leftView?: number;
  upView?: number;
  rightView?: number;
  downView?:number;
  totalScenicScore?: number;
  height: number;
}

interface TreeVisibilityGrid {[name: string]: TreeVisibility };

function getTreeVisibilityGrid() {
    try {
        const lines = getFileByLinesSync('./day8/day8.txt');
        return populateTreeVisibilityGrid(lines);
        
      } catch (err) {
        console.error(err);
      }
      return {treeVisibilityGrid: {}, countOfVisible: 0, maxScenicScore: 0};
}




function populateTreeVisibilityGrid(lines: string[]) {
// 0,0 is top left
// x, y
  const treeVisibilityGrid: TreeVisibilityGrid = {};
  let countOfVisible = 0;
  let maxScenicScore = 0;
  
  // top left to bottom right
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      const height =  parseInt(lines[y][x]);

      let leftVisible = false;
      if(isTallerThanTreesOnLeft(treeVisibilityGrid, lines, height, x, y)) {
        leftVisible = true;
      }
      let leftView = getLeftViewingDistance(treeVisibilityGrid, lines, height, x, y);


      let upVisible = false;
      if(isTallerThanTreesOnUp(treeVisibilityGrid, lines, height, x, y)) {
        upVisible = true;
      }
      let upView = getUpViewingDistance(treeVisibilityGrid, lines, height, x, y);

      treeVisibilityGrid[x + ',' + y] = {
        height,
        isLeftVisible: leftVisible,
        isUpVisible: upVisible,
        leftView,
        upView
      };
    }
  }
 
  // bottom right to top left
  for (let y = lines.length - 1; y >= 0; y--) {
    for (let x = lines[0].length -1; x >= 0; x--) {
      const height =  parseInt(lines[y][x]);

      let rightVisible = false;
      if(isTallerThanTreesOnRight(treeVisibilityGrid, lines, height, x, y)) {
        rightVisible = true;
      }
      let rightView = getRightViewingDistance(treeVisibilityGrid, lines, height, x, y);

      let downVisible = false;
      if(isTallerThanTreesOnDown(treeVisibilityGrid, lines, height, x, y)) {
        downVisible = true;
      }
      let downView = getDownViewingDistance(treeVisibilityGrid, lines, height, x, y);


      treeVisibilityGrid[x + ',' + y].isRightVisible = rightVisible;
      treeVisibilityGrid[x + ',' + y].isDownVisible = downVisible;
      treeVisibilityGrid[x + ',' + y].isVisible =  treeVisibilityGrid[x + ',' + y].isLeftVisible || treeVisibilityGrid[x + ',' + y].isUpVisible || 
          treeVisibilityGrid[x + ',' + y].isRightVisible || treeVisibilityGrid[x + ',' + y].isDownVisible; 
      treeVisibilityGrid[x + ',' + y].rightView = rightView;
      treeVisibilityGrid[x + ',' + y].downView = downView;
      treeVisibilityGrid[x + ',' + y].totalScenicScore = treeVisibilityGrid[x + ',' + y].leftView! * treeVisibilityGrid[x + ',' + y].upView! * treeVisibilityGrid[x + ',' + y].rightView! * treeVisibilityGrid[x + ',' + y].downView!;
      
      if(treeVisibilityGrid[x + ',' + y].isVisible) {
        countOfVisible += 1;
      }

      if((treeVisibilityGrid[x + ',' + y].totalScenicScore as number )> maxScenicScore) {
        maxScenicScore = treeVisibilityGrid[x + ',' + y].totalScenicScore as number;
        console.log('new scenic score x y', x, y, treeVisibilityGrid[x + ',' + y]);
      }
    }
  }

  return {treeVisibilityGrid, countOfVisible, maxScenicScore} ;
} 


function isTallerThanTreesOnLeft(treeVisibilityGrid: TreeVisibilityGrid, lines: string[], heightToCompare: number, x: number, y: number) {
  for (let i = x - 1; i >= 0; i--) {
    const treeOnLeftHeight = parseInt(lines[y][i]);
    if(heightToCompare <= treeOnLeftHeight) {
      return false;
    } else if(treeVisibilityGrid[i + ',' + y].isLeftVisible) {
      return true;
    }
  }
  return true;
}

function isTallerThanTreesOnRight(treeVisibilityGrid: TreeVisibilityGrid, lines: string[], heightToCompare: number, x: number, y: number) {
  for (let i = x + 1; i < lines[0].length; i++) {
    const treeoOnRightHeight = parseInt(lines[y][i]);
    if(heightToCompare <= treeoOnRightHeight) {
      return false;
    } else if(treeVisibilityGrid[i + ',' + y].isRightVisible) {
      return true;
    }
  }
  return true;
}

function isTallerThanTreesOnUp(treeVisibilityGrid: TreeVisibilityGrid, lines: string[], heightToCompare: number, x: number, y: number) {
  for (let j = y -1; j >= 0; j--) {
    const treeOnUpHeight = parseInt(lines[j][x]);
    if(heightToCompare <= treeOnUpHeight) {
      return false;
    } else if(treeVisibilityGrid[x + ',' + j].isUpVisible) {
      return true;
    }
  }
  return true;
}


function isTallerThanTreesOnDown(treeVisibilityGrid: TreeVisibilityGrid, lines: string[], heightToCompare: number, x: number, y: number) {
  for (let j = y + 1; j < lines.length; j++) {
    const treeOnDownHeight = parseInt(lines[j][x]);
    if(heightToCompare <= treeOnDownHeight) {
      return false;
    } else if(treeVisibilityGrid[x + ',' + j].isDownVisible) {
      return true;
    }
  }
  return true;
}

// TODO: JEB check the logic on these are correct! Then run against examples
function getLeftViewingDistance(treeVisibilityGrid: TreeVisibilityGrid, lines: string[], heightToCompare: number, x: number, y: number) {
  let leftViewingDistance = 0;
  for (let i = x - 1; i >= 0; i--) {
    leftViewingDistance += 1;
    const treeOnLeftHeight = parseInt(lines[y][i]);
    if(heightToCompare <= treeOnLeftHeight) {
      return leftViewingDistance;
    }
  }
  return leftViewingDistance;
}

function getRightViewingDistance(treeVisibilityGrid: TreeVisibilityGrid, lines: string[], heightToCompare: number, x: number, y: number) {
  let rightViewingDistance = 0;
  for (let i = x + 1; i < lines[0].length; i++) {
    rightViewingDistance += 1;
    const treeoOnRightHeight = parseInt(lines[y][i]);
    if(heightToCompare <= treeoOnRightHeight) {
      return rightViewingDistance;
    }
  }
  return rightViewingDistance;
}


function getUpViewingDistance(treeVisibilityGrid: TreeVisibilityGrid, lines: string[], heightToCompare: number, x: number, y: number) {
  let upViewingDistance = 0;
  for (let j = y -1; j >= 0; j--) {
    upViewingDistance += 1;
    const treeOnUpHeight = parseInt(lines[j][x]);
    if(heightToCompare <= treeOnUpHeight) {
      return upViewingDistance;
    }
  }
  return upViewingDistance;
}

function getDownViewingDistance(treeVisibilityGrid: TreeVisibilityGrid, lines: string[], heightToCompare: number, x: number, y: number) {
  let downViewingDistance = 0;
  for (let j = y + 1; j < lines.length; j++) {
    downViewingDistance += 1;
    const treeOndownHeight = parseInt(lines[j][x]);
    if(heightToCompare <= treeOndownHeight) {
      return downViewingDistance;
    }
  }
  return downViewingDistance;
}

const start = Date.now();
console.log('start', start);
const {treeVisibilityGrid, countOfVisible, maxScenicScore } = getTreeVisibilityGrid();
const end = Date.now();
// console.log(treeVisibilityGrid);
console.log(end - start);

console.log("Part 1");
console.log(countOfVisible);

console.log("Part 2");
console.log(maxScenicScore); // 5000 too low