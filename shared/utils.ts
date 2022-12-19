import * as fs from 'fs';


export function getFileByLinesSync(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n');
}

export function parseIntUpToChar(stringToParse: string, characterToStopAt: string) {
    if(characterToStopAt === '') {
      return parseInt(stringToParse);
    }
    const indexOfChar = stringToParse.indexOf(characterToStopAt);
    return parseInt(stringToParse.substring(0, indexOfChar));
}

export interface Coordinate {
    x: number;
    y: number;
}

export interface ThreeDCoordinate {
    x: number;
    y: number;
    z: number;
}


