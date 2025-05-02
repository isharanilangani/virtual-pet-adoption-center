const express = require('express');
const cors = require('cors');
const petRoutes = require('./routes/petRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', petRoutes);

module.exports = app;
