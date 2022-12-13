import { getFileByLinesSync, Coordinate } from '../shared/utils';
import * as R from 'ramda';

interface PacketPair {
  packet1: Packet;
  packet2: Packet;
}

interface Packet {
  items: (Packet | number)[];
}

function getPairsOfPackets() {
    try {
        const lines = getFileByLinesSync('./day13/day13.txt');
        const part1 =  getPairsOfPacketsPart1(lines)
        const part2 = getPairsOfPacketsPart2(lines);
        return {part1, part2}
      } catch (err) {
        console.error(err);
      }
      return {part1: [], part2: []};
}

function getPairsOfPacketsPart1(lines: string[]) {
  const packetPairs: PacketPair[] = [];
  for(let i = 0; i< lines.length; i+=3) { 
    const packet1 = {items: parsePacketItems(lines[i].substring(1, lines[i].length-1))}
    const packet2 = {items: parsePacketItems(lines[i+1].substring(1, lines[i+1].length-1))}
    packetPairs.push({packet1, packet2});
  }

  return packetPairs;
}

function getPairsOfPacketsPart2(lines: string[]) {
  return [];
}

function parsePacketItems(line: string): (Packet | number)[] {
  let items: (Packet | number)[] = [];
  if(line.length === 0) {
    return items;
  }
  for(let i = 0; i < line.length; i++) {
    if(line[i] === '[') {
      const matchingBraceIndex = findMatchingBraceIndex(line, i);
      items.push(parsePacketItems(line.substring(i + 1, matchingBraceIndex));
    } else if(line[i] === ']') {
      console.log('ERROR reached end brace ] ');
    } else if(line[i] === ',') {
      // ignore?
    } else {
      // number
      const number = getFullNumber(line, i);
      items.push(number);
    }
  }
  return items;
}

function findMatchingBraceIndex(line: string, indexOfStartBrace: number) {
  const index = indexOfStartBrace + 1;
  while(index < line.length) {
    if(line[index] === ']') {
      return index;
    }
  }
  console.log('ERRROR NO END BRACE FOUND');
  return -1;
}

// function findLastBraceIndex(line: string) {
//   return line.lastIndexOf(']');
// }

// Simplified since largest number is 2 digits
function getFullNumber(line: string, index: number): number {
  if(((index + 1) < line.length ) && line[index + 1] >= '0' || line[index + 1] <= '9') {
    // another number character
    return parseInt(line[index] + '' + line[index + 1]);
  } else {
    return parseInt(line[index]);
  }
}

const start = Date.now();
console.log('start', start);
const {part1, part2} = getPairsOfPackets();
const end = Date.now();
console.log(end - start);
console.log(JSON.stringify(part1));
console.log("Part 1");
