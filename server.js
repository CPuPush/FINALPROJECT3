require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }))
app.use(routes);

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});