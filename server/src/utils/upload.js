
const dayjs = require('dayjs');
const {v4: uuid} = require('uuid');
var path = require('path')

const upload = (subfolder, file) => {
  if(file == null) {
    throw new Error("File not fould exception!");
  }

  const today = dayjs(new Date()).format("YYYYMMDD");
  const pathfile = subfolder + "/" + today + "/";
  var fileName = uuid() +  path.extname(file.name);

  file.mv('/data/attach_file/'  + pathfile +  fileName);
  return pathfile + fileName;
}

module.exports = upload;