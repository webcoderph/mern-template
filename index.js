const express = require('express');
const app = express();
const apiRoutes = require('./routes');
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
app.use(apiRoutes);

app.listen(port, () => {
  console.log('Listening....');
})
