const {readdirSync} = require('fs');
const path = require('path');
const express = require('express');
require('dotenv').config({path: "./config.env"});
const app = express();
const port = process.env.PORT || 8000;
const databaseUrl = process.env.DATA_BASE_URL;

// Created files
const router = require('./routes/router')

// Middlewares
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const helmet = require("helmet");
const cors = require('cors');

// Using middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));



// Simple Home page
app.get('/', (req, res, next) => {
    res.status(200).json({msg: "Home Page"})
})

// All Todo routes
app.use('/todo', router);

// Connect Mongoose AND Listen the server
mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=> {
        app.listen(port, ()=> {
            console.log(`server running at http://localhost:${port} and Data Connected at ${databaseUrl}`)
        })
    })
    .catch((err) => {console.log(err)})
