const mongoose = require("mongoose");


exports.carts = mongoose.model('carts', new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    cartItems: [
        {
            productid: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
            quantity: { type: Number },
            price: { type: Number }
        }
    ]

}, { timestamps: true }));