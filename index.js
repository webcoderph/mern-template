const express = require('express');
const dontenv = require('dotenv').config()
const app = express();
const apiRoutes = require('./server/routes');
const cors = require('cors')
const port = process.env.PORT || 5000;
const mongoose = require('mongoose')
mongoose.connect(
  process.env.MONGODB_URL, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

app.use(express.json());
app.use(cors())
app.use(apiRoutes);

app.listen(port, () => {
  console.log('Listening....');
})
