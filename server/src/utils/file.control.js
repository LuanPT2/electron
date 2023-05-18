
const dayjs = require('dayjs');
const {v4: uuid} = require('uuid');
var path = require('path')
const fs = require('fs')

const uploadFile = (subfolder, file) => {
  if(file == null) {
    throw new Error("File not fould exception!");
  }

  const today = dayjs(new Date()).format("YYYYMMDD");
  const pathfile = subfolder + "/" + today + "/";
  var fileName = uuid() +  path.extname(file.name);

  file.mv('/data/attach_file/'  + pathfile +  fileName);
  return pathfile + fileName;
};

const deletefile = async(filePath) => {

  if(filePath == null) {
    throw new Error("File not fould exception!");
  }
  
  //fs.unlinkSync(filePath)
  // delete file named 'sample.txt'
  if(!fs.existsSync('/data/attach_file/' + filePath)) {
    return;
  }

  fs.unlink('/data/attach_file/' + filePath, function (err) {
    if (err) throw err;
    // if no error, file has been deleted successfully
    console.log('File deleted!');
  });
};

module.exports = {
    uploadFile,
    deletefile
};