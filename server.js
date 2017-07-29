const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
})
