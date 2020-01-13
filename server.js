const express = require('express');
const app = express();

const userRoutes = require('./controllers/userRoutes');
const deviceRoutes = require('./controllers/deviceRoutes');

const port = process.env.PORT || 3000;

require('dotenv').config();
const cors = require('cors');

// MONGO 
const mongoose = require('mongoose');
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
app.use(express.json())
app.use('/user', userRoutes);
app.use('/device', deviceRoutes);

app.get("/", (req, res) => {
  res.send('hello')

});

app.listen(port, () => (
  console.log(`server listening on port: ${port} 🔥`)));