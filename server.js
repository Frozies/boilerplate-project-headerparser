// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/whoami', (req, res) => {
  //get ipaddress v6
  //get language en-us
  //get software mozilla

  /*req.ip -> doesnt work
  * req.connection.remoteAddress -> doesnt work
  * req.socket.address().address - > doesnt work
  * req.header('ipaddress') -> doesnt work
  * */


  res.json({
    'ipaddress': req.header('X-Forwarded-For'),
    'language': req.header('accept-language'),
    'software': req.header('user-agent')});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;