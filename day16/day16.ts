import { getFileByLinesSync, Coordinate } from '../shared/utils';
import * as R from 'ramda';



function getOptimalPath() {
    try {
        const lines = getFileByLinesSync('./day16/day16.txt');
        const part1 =  getOptimalPathAfterXMinutes(lines, 30);
        const part2 = getOptimalPathAfterXMinutes(lines, 1);
        return {part1, part2}
      } catch (err) {
        console.error(err);
      }
      return {part1: {}, part2: {}};
}

// const valueOfValveAtCurrentPosition: number[];

function getOptimalPathAfterXMinutes(lines: string[], minutes: number) {
  const grid = createGrid(lines);

  return grid;
}

interface Valve {
  label: string;
  rate: number;
  connectedValves?: Valve[];
  connectedValveLabels: string[];
}

let valves: Valve[] = [];

const visitedValves = new Set<string>();

function createGrid(lines: string[]) {

  for(const line of lines) {
    const splitString = line.split('=');
    const valveLabel = splitString[0].split(' ')[1];
    const rate = parseIntUpToChar(splitString[1], ';');
    let connectedValvesString = splitString[1].split('tunnels lead to valves ')[1];
    if(!connectedValvesString) {
      connectedValvesString = splitString[1].split('tunnel leads to valve ')[1];
    }
    if(!connectedValvesString) {
      connectedValvesString = splitString[1].split('tunnels lead to valve ')[1];
    }
    if(!connectedValvesString) {
      connectedValvesString = splitString[1].split('tunnel leads to valves ')[1];
    }
    const connectedValveLabels = connectedValvesString.replace(/,/g, '').split(' ');
    valves.push({
      label: valveLabel,
      rate,
      connectedValveLabels
    });
  }


  const startValve = connectValveWithLabel('AA');
  // const currentValve = startValve;

  // while(visitedValves.size < valves.length) {
  //   visitedValves.add(currentValve.label);
  //   currentValve.connectedValves = currentValve.connectedValveLabels.map((label) => connectValveWithLabel(valves, label));
  // }

  return startValve;
}

function findValveWithLabel(label: string) {
  return valves.find((valve) => valve.label === label)!;
}


function connectValveWithLabel(label: string) {
  const unconnectedValve = findValveWithLabel(label);
  // visitedValves.add(unconnectedValve.label);

  // TODO: still need the visited valves likely...
  if(!unconnectedValve.connectedValves) {
    unconnectedValve.connectedValves = [];
    unconnectedValve.connectedValveLabels.map((innerLabel) => connectValveWithLabel(innerLabel));
  }
  return unconnectedValve;
}


export function parseIntUpToChar(stringToParse: string, characterToStopAt: string) {
  if(characterToStopAt === '') {
    return parseInt(stringToParse);
  }
  const indexOfChar = stringToParse.indexOf(characterToStopAt);
  return parseInt(stringToParse.substring(0, indexOfChar));
}

const start = Date.now();
console.log('start', start);
const {part1, part2} = getOptimalPath();
const end = Date.now();
console.log(end - start);
console.log(part1);
console.log("Part 1");

// const sortedMonkeys = part1.sort((a, b) => b.numberInspectedItems -  a.numberInspectedItems);
// const monkeyBusiness = sortedMonkeys[0].numberInspectedItems * sortedMonkeys[1].numberInspectedItems;
// console.log(monkeyBusiness);

// console.log(part2);
// console.log("Part 2");
// const sortedMonkeys2 = part2.sort((a, b) => b.numberInspectedItems -  a.numberInspectedItems);
// const monkeyBusiness2 = sortedMonkeys2[0].numberInspectedItems * sortedMonkeys2[1].numberInspectedItems;
// console.log(monkeyBusiness2);
