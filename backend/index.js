// Setting up our dependencies
const express = require("express");
const app = express();
const port = 3400;
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
const Product = require("./models/product.js");

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



// =================================
//            GET METHOD
// =================================

// here we are setting up the /allProduct route
app.get('/allProduct', (req, res) => {
    // .then is method in which we can chain functions on
    // chaining means that once something has run, then we can
    // run another thing
    // the result variable is being returned by the .find() then we ran earlier
    Product.find().then(result => {
        // send back the result of the search to whoever asked for it
        // send back the result to the front end. I.E the go the button
        res.send(result)
    })
})