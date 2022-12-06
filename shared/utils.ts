import * as fs from 'fs';


export function getFileByLinesSync(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n');
}