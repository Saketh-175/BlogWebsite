const dotenv = require("dotenv");
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Middleware
app.use(cors());

dotenv.config({ path: './config.env' });

require('./db/conn');
// const User=require('./model/userSchema');
app.use(express.json())
//linking router file
app.use(require('./router/auth'));
app.use(require('./router/blogrout'));

const PORT = process.env.PORT;

//Middleware

const middleware = (req, res, next) => {
    console.log("middleware");
    next();
}

app.get('/', (req, res) => {
    res.send("hello world from server");
});
app.get('/about', middleware, (req, res) => {
    res.send("hello world from about");
});
app.get('/contact', (req, res) => {
    res.send("hello world from contact");
});
app.get('/signup', (req, res) => {
    res.send("hello world from signup");
});

app.listen(PORT, () => {
    console.log("server is runing")
})