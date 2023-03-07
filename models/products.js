const mongoose = require("mongoose");


exports.products = mongoose.model("products", {
    productname: { type: String },
    producttype: { type: String },
    productprice: { type: String },
    productdescription: { type: String }
});
