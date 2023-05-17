const path = require('path');
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const upload = require('./utils/upload');


require('dotenv').config({ path: path.join(__dirname, '../.env') });

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/upload-avatar', async (req, res) => {
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
          let files = req.files.files;
        for(const file of  files ) {
            upload("/avatar", file);
        }
      }
      res.status(500).send("Okie");
  } catch (err) {
      res.status(500).send(err);
  }
});
const port = process.env.PORT;
app.listen(port, () => console.log(`App is running in PORT: ${port}`));
