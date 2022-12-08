import { getFileByLinesSync } from '../shared/utils';
import * as R from 'ramda';
import { Dir } from 'fs';


interface Directory {
  isDirectory: true;
  size?: number;
  parent?: Directory;
  children: (Directory|File)[];
  name: string;
  // getSize(): number {
  //   return R.sum(this.children.map((child) => child.getSize()));
  // }
}

interface File {
  name: string;
  size: number;
  parent: Directory;
  // getSize(): number {
  //   return this.size;
  // }

}

// interface FileStructure { [name: string]: Directory|File };

function getFileStructure(): Directory {
    try {
        const lines = getFileByLinesSync('./day7/day7.txt');
        return populateFileStructure(lines);
        
      } catch (err) {
        console.error(err);
      }
      return {} as Directory;
}

function populateFileStructure(lines: string[]): Directory {
  const topDirectory: Directory = {
    isDirectory: true,
    name: '/',
    children: []
  };

  let currentDirectory: Directory = topDirectory;

  // const directories: Directory[] = [topDirectory];
  
  let index = 0;

  while (index < lines.length) {
    const currentLine = lines[index];

    if(currentLine.startsWith('$ cd')) {
      if(currentLine === '$ cd /') {
        currentDirectory = topDirectory;
      } else if (currentLine === '$ cd ..') {
        currentDirectory = currentDirectory.parent as Directory;
      } else {
        // changing into "new" directory
        const name = currentLine.split(' ')[2];
        const tempDirectory = currentDirectory.children.find((dir) => dir.name === name) as Directory;
        // // Already exists, make sure we have the same versions
        // if(directoryDictionary[tempDirectory.name]) {
        //   console.log('ALREADY EXISTS in dictionary');
        //   console.log(tempDirectory);
        //   console.log(directoryDictionary[tempDirectory.name]);
        // } else {
        currentDirectory = tempDirectory;
        // }
      }
    } else if (currentLine.startsWith('$ ls')) {
      // do nothing
    } else if (currentLine.startsWith('dir ')) {
      const name = currentLine.split(' ')[1];
      const tempDirectory: Directory = {
        isDirectory: true,
        name,
        parent: currentDirectory,
        children: []
      };
      // Already exists, make sure we have the same versions
      // if(directoryDictionary[tempDirectory.name]) {
      //   console.log('ALREADY EXISTS in dictionary');
      //   console.log(tempDirectory);
      //   console.log(directoryDictionary[tempDirectory.name]);
      // } else {
        currentDirectory.children.push(tempDirectory);
      // }
    } else {
      const [size, name] = currentLine.split(' ');
      const tempFile: File = {
        name,
        size: parseInt(size),
        parent: currentDirectory
      };
        currentDirectory.children.push(tempFile);
    }
    index += 1;
  }

  return topDirectory;
}



function getAndSetSizeOfDirectoriesAndFiles(object: File | Directory): number {
  if (object.size) {
    return object.size;
  } else {
    object.size = R.sum((object as Directory).children.map((child) => getAndSetSizeOfDirectoriesAndFiles(child)));
    return object.size;
  }
}

function getSumOfDirectoriesLessThan100000(object: File | Directory): number {
  if(!(object as Directory).isDirectory) {
    return 0;
  } else {
    const dir: Directory = object as Directory;
    const childrenSum = R.sum(dir.children.map((child) => getSumOfDirectoriesLessThan100000(child)));
    if(dir.size as number <= 100000) {
      return childrenSum + (dir.size as number);
    } else {
      return childrenSum;
    }
  }
}


const structure = getFileStructure();
getAndSetSizeOfDirectoriesAndFiles(structure);
// console.log(structure);
const sum = getSumOfDirectoriesLessThan100000(structure);

console.log("Part 1");
console.log(sum);
