const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(__dirname + '/data'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/routing'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.get('/survey', function(req, res) {
  res.sendFile(path.join(__dirname, "/public/survey.html"));
})

app.post('/api/friends', function(req, res){
  var user = req.body;
  console.log(user);
  res.send('Sending through best match!');
})

//Start Server
app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
})
