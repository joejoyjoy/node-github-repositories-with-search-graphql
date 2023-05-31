const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use('/v1', userRoutes)

module.exports = app