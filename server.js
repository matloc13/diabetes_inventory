const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userRoutes = require('./controllers/userRoutes');
const deviceRoutes = require('./controllers/deviceRoutes');

const port = process.env.PORT || 3000;
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors({
  origin: "http://localhost:3001",
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true,
  preflightContinue: true
}))

// MONGO 

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL;
mongoose.connection.once('open', () => {
  console.log('mongo - connected');
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
app.use(express.urlencoded({
  extended: false
}));

app.use(express.json());
app.use(cookieParser());
app.use('/user', userRoutes);
app.use('/device', deviceRoutes);

app.get("/", (req, res) => {
  res.send('hello');

});

app.listen(port, () => (
  console.log(`server listening on port: ${port} 🔥`)));