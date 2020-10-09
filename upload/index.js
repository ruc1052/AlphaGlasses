const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const indexFormat = require('../front/indexFormat');
const userFormat = require('../front/userFormat');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('users'));

app.get('/', (req, res) => {
  res.send(indexFormat.HTML());
});

app.get('/user/:userName', (req, res) => { 
  res.send(userFormat.HTML(req.params.userName));
});


app.post('/api/user/:userName/info', (req, res) => {
  let userName = req.params.userName;
  let dir = `./users/${userName}/info.txt`;
  let newInfo = req.body.info;
  fs.writeFile(dir, newInfo, (err) => {
    if(err) console.log(err);
    res.redirect('/');
  });
});

app.post('/api/user/:userName/upload', (req, res) => {
  var fileName = 1;
  let userName = req.params.userName;
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./users/${userName}/img`);
    },
    filename: (req, file, cb) => {
      cb(null, `${fileName++}` + path.extname(file.originalname));
    }
  });
  let upload = multer({storage}).array('profile', 200);

  upload(req, res, (err) => {
    if(err) console.log(err);
    res.redirect('/');
  });
});

app.post('/api/addUser', (req, res) => {
  let name = req.body.name;
  let dir = `./users/${name}`;

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    fs.mkdirSync(`${dir}/img`);
    fs.writeFile(`${dir}/info.txt`, "", (err) => {
      if(err) console.log(err);
    });
    fs.appendFile(`./users/list`, `${encodeURIComponent(name)}\n`, (err) => {
      if(err) console.log(err);
      res.redirect('/');
    });
  }
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname + "/front/html/inputs.html"));
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});