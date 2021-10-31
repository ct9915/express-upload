const cors = require("cors");
const express = require("express");
const https = require('https');
const fs = require('fs');

global.__basedir = __dirname;
global.upfile_basedir="/uploads/";
global.listenPort ="6899"

var key =  fs.readFileSync(__dirname + '/certs/server.key');
var cert = fs.readFileSync(__dirname + '/certs/server.crt');
var options = {
  key:  key,
  cert: cert
};
const app = express();
var corsOptions = {
  origin: "http://localhost:6900"
};

app.use(cors(corsOptions));

const initRoutes = require("./routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

let port = 6899;
var server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});

