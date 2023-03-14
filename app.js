
const express = require("express");
const cors = require('cors');
const app = express();


const userController = require("./controllers/userController");
const productsController = require("./controllers/productsController")
const cartController = require("./controllers/cartController")
const userSchema  = require("./models/user")
app.use(express.json())

// const jwt = require('jsonwebtoken');

// const user = { id: 12345, name: 'John Doe' };
// const secret = 'my_secret_key';

// const token = jwt.sign(user, secret);

// console.log("token",token);

app.use(cors());
app.use("/api/v1/users", userController);
app.use("/api/v1/products", productsController);
app.use("/api/v1/cart", cartController);

app.get('/test',(req, res) => {
    res.send({
        status :200,
        meaasge : "success"
    })
}) 


module.exports = app;