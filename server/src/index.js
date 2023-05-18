const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');



// enable files upload
app.use(fileUpload({createParentPath: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ROUTERS
app.get('/', (req, res) => res.send());
app.use('/api', require('./routers/api.router'));

const port = process.env.PORT;
app.listen(port, () => console.log(`App is running in PORT: ${port}`));
