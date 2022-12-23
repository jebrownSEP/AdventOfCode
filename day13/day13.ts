import { getFileByLinesSync, Coordinate } from '../shared/utils';
import * as R from 'ramda';

interface PacketPair {
  packet1: any[];
  packet2: any[];
}

// interface Packet {
//   items: (Packet | number)[];
// }

function getPairsOfPacketsInRightOrder() {
    try {
        const lines = getFileByLinesSync('./day13/day13.txt');
        const packets1 =  getPairsOfPacketsPart1(lines);
        const part1 = getIndicesOfRightOrderPackets(packets1);
        const part2 = getPairsOfPacketsPart2(lines);
        return {part1, part2, packets1}
      } catch (err) {
        console.error(err);
      }
      return {part1: [], part2: []};
}

function getIndicesOfRightOrderPackets(packetPairs: PacketPair[]) {
  const indices: number[] = [];
  packetPairs.forEach((packetPair, index) => {
    const rightOrder = isInRightOrder(packetPair);
    if(rightOrder === null) {
      console.log('NULL', index + 1, packetPair);
    }
    else if(rightOrder === true) {
      indices.push(index + 1);
    }
  });
  return indices;
}

function isInRightOrder(packetPair: PacketPair): boolean|null {
  const {packet1, packet2} = packetPair;

  let index1 = 0;
  let index2 = 0;
  let element1 = packet1[index1];
  let element2 = packet2[index2];
  if(element1 == null && element2 != null) {
    return true;
  } else if(element1!= null && element2 == null) {
    return false;
  } else if(element1 == null && element2 == null) {
    return null;
  }
  while(true) {
    // Both numbers
    if(!Array.isArray(element1) && !Array.isArray(element2) && element1 !== element2) {
      return element1 < element2;
    } else if(Array.isArray(element1) && Array.isArray(element2)) { // both lists
      const rightOrder =  isInRightOrder({packet1: element1, packet2: element2});
      if(rightOrder !== null) {
        return rightOrder;
      } else {
        index1 +=1;
        index2 +=1;
        element1 = packet1[index1];
        element2 = packet2[index2];
        if(element1 == null && element2 != null) {
          return true;
        } else if(element1!= null && element2 == null) {
          return false;
        } else if(element1 == null && element2 == null) {
          return null;
        }
      }
    } else if(Array.isArray(element1) && !Array.isArray(element2)) {
      element2 = [element2];
    } else if(!Array.isArray(element1) && Array.isArray(element2)) {
      element1 = [element1];
    } else {
      index1 +=1;
      index2 +=1;
      element1 = packet1[index1];
      element2 = packet2[index2];
      if(element1 == null && element2 != null) {
        return true;
      } else if(element1!= null && element2 == null) {
        return false;
      } else if(element1 == null && element2 == null) {
        return null;
      }
    }
  }
  return null;
}

function getPairsOfPacketsPart1(lines: string[]) {
  const packetPairs: PacketPair[] = [];
  for(let i = 0; i< lines.length; i+=3) { 
    const packet1 = parsePacketItems(lines[i].substring(1, lines[i].length-1))
    const packet2 = parsePacketItems(lines[i+1].substring(1, lines[i+1].length-1))
    packetPairs.push({packet1, packet2});
  }

  return packetPairs;
}

function getPairsOfPacketsPart2(lines: string[]) {
  return [];
}

function parsePacketItems(line: string): any[] {
  let items: any[] = [];
  if(line.length === 0) {
    return items;
  }
  let lineModified = line + '';
  let modifiedIndex = 0;
  while (modifiedIndex < lineModified.length && lineModified.length > 0) {
    if(lineModified[modifiedIndex] === '[') {
      const matchingBraceIndex = findMatchingBraceIndex(lineModified, modifiedIndex);
      const newPacketString = lineModified.substring(modifiedIndex + 1, matchingBraceIndex); // TODO: HERE Bug: getting '' sometimes... tho is that ok?...
      // console.log('newpacketString', newPacketString);
      items.push(parsePacketItems(newPacketString));
      // lineModified = lineModified.substring(matchingBraceIndex + 1);
      lineModified = replaceFromIndexes(lineModified, modifiedIndex , matchingBraceIndex + 1);

      // console.log('new lineModified', lineModified);
      modifiedIndex = 0;
    } else if(lineModified[modifiedIndex] === ']') {
      // console.log('ERROR reached end brace ] ');
    } else if(lineModified[modifiedIndex] === ',') {
      // ignore?
    } else {
      // number
      const endIndex = getEndNumberIndex(lineModified, modifiedIndex);
      items.push(parseInt(lineModified.substring(modifiedIndex, endIndex + 1)));
      if(endIndex > modifiedIndex) {
        modifiedIndex +=1;
      }
    }
    modifiedIndex += 1;
  }
  return items;
}

function replaceFromIndexes(stringToModify: string, startIndex: number, endIndex: number) {
  return stringToModify.substring(0, startIndex) + stringToModify.substring(endIndex);
}

function findMatchingBraceIndex(line: string, indexOfStartBrace: number) {
  let bracesToSkip = 0;
  let index = indexOfStartBrace + 1;
  while(index < line.length) {
    if(line[index] === ']') {
      if(bracesToSkip === 0) {
        return index;
      } else {
        bracesToSkip -= 1;
      }
    } else if(line[index] === '[') {
      bracesToSkip += 1;
    }
    index += 1;
  }
  console.log('ERRROR NO END BRACE FOUND');
  return -1;
}

// function findLastBraceIndex(line: string) {
//   return line.lastIndexOf(']');
// }

// Simplified since largest number is 2 digits
function getEndNumberIndex(line: string, index: number): number {
  if(((index + 1) < line.length ) && line[index + 1] >= '0' || line[index + 1] <= '9') {
    // another number character
    return index + 1;
  } else {
    return index;
  }
}

const start = Date.now();
console.log('start', start);
const {part1, part2} = getPairsOfPacketsInRightOrder();
const end = Date.now();
console.log(end - start);
console.log(JSON.stringify(part1));
console.log("Part 1");
console.log(R.sum(part1));
// 5189 too low
// 5346 too high

// 37 and 122 null