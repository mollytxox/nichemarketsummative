// Setting up our dependencies
const express = require("express");
const app = express();
const port = 3100;
const cors = require("cors");
// passes information from the frontend to the backend
const bodyParser = require("body-parser");
// This is our middleware for talking to mongoDB
const mongoose = require("mongoose");
// bcrypt for encrypting data (passwrords)
const bcrypt = require('bcryptjs');
// grab our config file
const config = require('./config.json')
console.log(config)

// Schemas
// every schema needs a capital letter
// const Coffee = require("./models/coffee.js");
// const User = require("./models/user.js");
// const Review = require("./models/review.js");

// start our dependencies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

// Start our server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// let's connect to mongoDB 
mongoose.connect(
    `mongodb+srv://${config.username}:${config.password}@cluster0.xgykp3b.mongodb.net/?retryWrites=true&w=majority`,
    // .then is a chaining method used with promises
    // in simple terms, it will run something depending on the function before it
).then(() => {
    console.log(`You've connected to MongoDB!`)
    // .catch is a method to catch any errors that might happen in a promise
}).catch((err) => {
    console.log(`DB connection error ${err.message}`)
})