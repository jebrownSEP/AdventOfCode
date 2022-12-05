const fs = require('fs');


function getFileByLinesSync(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n');
}

module.exports =  {getFileByLinesSync}