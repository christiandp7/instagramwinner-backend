const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const boolParser = require('express-query-boolean')
const mongoose = require('mongoose');
const app = express();


// Middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(boolParser());

app.use(morgan('dev'))

// Routes
app.use(require('./routes/usuarios.route'))


// Connect to DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})


module.exports = app;