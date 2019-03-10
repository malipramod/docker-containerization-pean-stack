let fs = require('fs');

let updateFile = (fileContent, callback) => {
    try {
        fs.writeFileSync("../data/data.json", JSON.stringify(fileContent));
        console.log('success');
        callback({ status: true, err: null });
    } catch (ex) {
        console.log('err, ',ex);
        callback({ status: false, err: ex });
    }
}

module.exports = {
    updateFile: updateFile
}