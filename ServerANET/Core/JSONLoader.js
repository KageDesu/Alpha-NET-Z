function LoadFromFile(filename) {

    console.log("Try load " + filename);

    const fs = require('fs');

    let rawdata = fs.readFileSync(filename);
    let data = JSON.parse(rawdata);
    return data;
}

module.exports.LoadFromFile = LoadFromFile;
