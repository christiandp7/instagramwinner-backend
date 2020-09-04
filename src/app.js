const express = require('express');
const cors = require('cors');
const app = express();


// Middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes




module.exports = app;