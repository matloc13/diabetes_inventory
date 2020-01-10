const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

require('dotenv').config();
const cors = require('cors');

// MONGO 
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL;
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.get("/", (req, res) => {
  res.send('hello')
  
});

app.listen(port, () => `Server running on port ${port} 🔥`);