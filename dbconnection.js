
const connect = require("connect");
const mongoose = require("mongoose");
const express = require("express");
const app = require('./app');
const url = "mongodb://localhost:27017/employee";

mongoose.connect(url, (err) => {
    if (!err) {
        // console.log("Mongoose connected successfully");
    } else {
        console.log("Error in connection");
    }
});

const port = 3000;
app.listen(port,()=>{
    console.log("Port running in " + port);
})

module.exports = app;
