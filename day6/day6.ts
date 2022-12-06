import { getFileByLinesSync } from '../shared/utils';
import * as R from 'ramda';


function getIndexOfPacketAndMessageMarker(): {packetMarker: number, messageMarker: number} {
    try {
        const lines = getFileByLinesSync('./day6/day6.txt');

        return {
          packetMarker: getIndexOfFirstXCharacters(lines[0], 4),
          messageMarker: getIndexOfFirstXCharacters(lines[0], 14)
        };
        
      } catch (err) {
        console.error(err);
      }
      return {packetMarker: -1, messageMarker: -1};
}

function getIndexOfFirstXCharacters(stringToParse: string, numberOfCharacters: number): number {
  let foundUnique = false;
  let endIndex = numberOfCharacters - 1; // This is already 1 indexed because of the way slice works

  while (!foundUnique) {
    endIndex += 1;
    const packet = getXCharactersBeforeIndex(stringToParse, numberOfCharacters, endIndex);
    if(hasAllUniqueCharacters(packet)) {
      foundUnique = true;
    }
  }

  return endIndex;
}

function getXCharactersBeforeIndex(stringToParse: string, numberOfCharacters: number, endIndex: number): string {
  return stringToParse.slice(endIndex - numberOfCharacters, endIndex);
}

function hasAllUniqueCharacters(substring: string): boolean {
  return substring.length === R.uniq(substring.split('')).length
}


const markers = getIndexOfPacketAndMessageMarker();

console.log("Part 1");
console.log(markers.packetMarker);

// TODO: add timing stuff?
console.log("Part 2");
console.log(markers.messageMarker);
