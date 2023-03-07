

const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const { products } = require("../models/products");
// const { userSchema } = require("../models/user");
const app = require("../app");
// const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require('jsonwebtoken');



// To add Products 
module.exports.create =  (req, res) =>{
    let body = req.body;

    products.findOne({ productname: req.body.productname }, (err, doc) => {
               
       
        if (!err & (doc !== null) && !req.body.productname == '') {
              res.status(409).send({
                status: 409, 
                message: "Products alreday Exists",
            });

        }
         else if (req.body.productname == '' || req.body.productname == null ){
            res.status(406).send({
                status: 406,
                message: "Product name is mandatory",
            });
        } 
        else {
             products.insertMany(body).then((result) => {
                if (result) {
                    res.status(200).send({
                        status: 200,
                        meaasge: "Products added Successfully"
                    })
                }
                else {
                    res.status(404).send({
                        status: 404,
                        meaasge: "Failed to add Products"
                    })
                }

            })
                .catch((err) => {
                    res.status(404).send({
                        status: 404,
                        meaasge: "Failed to add Products",
                    })
                })

        }
    });
}

// TO DISPLAY THE LIST OF PRODUCTS

module.exports.list = async (req, res) => {
    let body = req.body;

    await products.find({}).then((result) => {
        if (result.length > 0) {
            res.status(200).send({
                status: 200,
                message: "Data available",
                length: result.length,
                data: result
            })
        }
        else {
            res.send({
                status: 201,
                meaasge: "Data not available",
                data: {}
            })
        }

    }).catch((err) => {
        res.send({
            status: 404,
            meaasge: "failed",
            data: result
        })
    })
};


// TO DELETE THE PRODUCT BY ID
module.exports.delete = async (req, res) => {
    let body = req.body;
    // console.log('======',res);

    const id = req.params.id;
    console.log("reuest", id);

    await products.deleteOne({ _id: id }).then((result) => {
        console.log("result", result);
        res.send({
            status: 200,
            message: "Record deleted successfuly",
            length: result.length,
            data: result
        })


    }).catch((err) => {
        res.send({
            status: 404,
            message: "failed to delete",
            // data: result
        })
    })
};