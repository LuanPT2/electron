
const dayjs = require('dayjs');
var uuidv4 = require('uuid/v4');

const upload = (subfolder, file) => {
  if(file == null) {
    throw new Error("File not fould exception!");
  }

  const today = dayjs(new Date()).format("YYYYMMDD");
  var fileName = uuidv4() + ".";

  file.mv('/data/attach_file/' + subfolder + "/" + today + "/" +  fileName);
}


module.exports = upload;