

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
                        message: "Products added Successfully"
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
            res.status(201).send({
                status: 201,
                meaasge: "Data not available",
                data: {}
            })
        }

    }).catch((err) => {
        res.status(404).send({
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
        res.status(200).send({
            status: 200,
            message: "Record deleted successfuly",
            length: result.length,
            data: result
        })


    }).catch((err) => {
        res.status(404).send({
            status: 404,
            message: "failed to delete",
            // data: result
        })
    })
};

// TO UPDATE THE PRODUCT BY ID

module.exports.update = async (req, res) => {
    let body = req.body;
    const id = req.params.id;

    await products.updateOne({ _id: id }, { $set: { productname: body.productname, producttype: body.producttype, productprice:body.productprice,producrdescription:body.producrdescription } }).then((result) => {

        res.status(200).send({
            status: 200,
            message: "Producst updated successfully",
            length: result.length,
            data: result
        })


    }).catch((err) => {
        res.status(404).send({
            status: 404,
            meaasge: "failed to update products",
            // data: result
        })
    })
};

// GET PRODUCT BY PRODUCT ID
module.exports.productid = (req, res) => {
    let body = req.body;
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send({ status: 400, message: `No record for the given - ${req.params.id}` });
    const id = req.params.id;
    console.log("reuest", id);
    products.find({ _id: id }, (err, doc) => {
        if (!err & (doc !== null)) {
            res.status(200).send({ status: 200, message: "success", data: doc });
        } else {
            console.log("Error while getting data");
            res.status(404).send({ status: 404, message: "fail" });
        }
    });

}