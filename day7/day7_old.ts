import { getFileByLinesSync } from '../shared/utils';
import * as R from 'ramda';


class Directory {
  parent?: Directory;
  // children: FileStructure;
  name: string;
  getSize(): number {
    return this.children
  }
  // totalChildrenSize: number;
}

interface File {
  name: string;
  size: number;
  parent: Directory;
}

interface FileStructure { [name: string]: Directory|File };

function getFileStructure(): FileStructure {
    try {
        const lines = getFileByLinesSync('./day7/day7.txt');
        return populateFileStructure(lines);
        
      } catch (err) {
        console.error(err);
      }
      return {};
}

function populateFileStructure(lines: string[]): FileStructure {
  const topDirectory: Directory = {
    name: '/',
    children: {}
  };

  let currentDirectory: Directory = topDirectory;


  const directoryDictionary: FileStructure = {};
  directoryDictionary['/'] = topDirectory;

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
        const tempDirectory: Directory = {
          name,
          parent: currentDirectory,
          children: {}
        };
        // // Already exists, make sure we have the same versions
        // if(directoryDictionary[tempDirectory.name]) {
        //   console.log('ALREADY EXISTS in dictionary');
        //   console.log(tempDirectory);
        //   console.log(directoryDictionary[tempDirectory.name]);
        // } else {
          directoryDictionary[tempDirectory.name] = tempDirectory;
          currentDirectory = tempDirectory;
        // }
      }
    } else if (currentLine.startsWith('$ ls')) {
      // do nothing
    } else if (currentLine.startsWith('dir ')) {
      const name = currentLine.split(' ')[1];
      const tempDirectory: Directory = {
        name,
        parent: currentDirectory,
        children: {}
      };
      // Already exists, make sure we have the same versions
      // if(directoryDictionary[tempDirectory.name]) {
      //   console.log('ALREADY EXISTS in dictionary');
      //   console.log(tempDirectory);
      //   console.log(directoryDictionary[tempDirectory.name]);
      // } else {
        directoryDictionary[tempDirectory.name] = tempDirectory;
        currentDirectory.children[tempDirectory.name] = tempDirectory;
      // }
    } else {
      const [size, name] = currentLine.split(' ');
      const tempFile: File = {
        name,
        size: parseInt(size),
        parent: currentDirectory
      };
        currentDirectory.children[tempFile.name] = tempFile;
    }
    index += 1;
  }

  return directoryDictionary;
}


const structure = getFileStructure();
console.log(structure);



console.log("Part 1");

// // TODO: add timing stuff?
// console.log("Part 2");
// console.log(markers.messageMarker);
