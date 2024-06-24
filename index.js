require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { router } = require('./routers');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Your first API endpoint
app.use("/api", router);

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
