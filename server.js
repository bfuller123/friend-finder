const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
})

app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
})
