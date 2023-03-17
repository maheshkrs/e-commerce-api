

const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const { carts } = require("../models/cart");
const {users} = require('../models/user')
const { products } = require("../models/products");
const app = require("../app");
// const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require('jsonwebtoken');
const { userid } = require("./userservice");


exports.addItemToCart = async (req, res) => {
    

    let Usercart = req.body.userid;
    
     
    carts.findOne({ userid: Usercart })
        .exec((error,cart) =>{
            if (error)
             return res.status(400).send({
                 status: 404,
                 message: "error",
             }) 
             if(cart){

                // if cart already exists then update by quantity
                 const product = req.body.cartItems[0].productid;
                const item = cart.cartItems.find(c => c.productid == product);
                
                 if (item){
                  
                     carts.findOneAndUpdate({ "userid": Usercart, "cartItems.productid": product }, {
                         "$push": {
                             "cartItems": {
                                ...req.body.cartItems[0],
                                  quantity: req.body.cartItems[0].quantity + item.quantity,
                                  price: item.price + req.body.cartItems[0].price
                            }
                         }
                     })
                         .exec((error, _cart) => {

                           
                             if (error)
                                 return res.status(400).send({
                                     status: 404,
                                     message: "error",
                                 })
                             if (cart) {
                                console.log("test====",cart);
                               return res.status(200).json({ cart })
                           
                             }
                         })

                 }else {

                   
                     carts.findOneAndUpdate({ userid: Usercart }, {
                         "$push": {
                             "cartItems": req.body.cartItems
                         }
                     })
                         .exec((error, _cart) => {

                            
                             if (error)
                                 return res.status(404).send({
                                     status: 404,
                                     message: "error",
                                 })
                             if (cart) {
                                 return res.status(200).json({ cart })
                             }
                         })
                 }

             
                 
             } else { 
                //  if no cart then create new cart
                 const cart = new carts({
                     userid: Usercart,
                     cartItems: req.body.cartItems
                 });

                 cart.save((error, cart) => {
                     if (error) return res.status(400).json({ error })
                     if (cart) {
                         return res.status(200).json({ cart })
                     }
                 })
             }
        })
};


// 

module.exports.list = async (req, res) => {

    let body = req.body;
   
    await carts.find({}).then((result) => {
        if (result.length > 0) {
            res.send({
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

}


// cart by user id

module.exports.userid = (req, res) => {
    let body = req.body;
    if (!ObjectId.isValid(req.params.id))
        return res.send({ status: 400, message: `No cart list for the given  - ${req.params.id}` });
    const id = req.params.id;
    carts.find({ userid: id }, (err, doc) => {
    if (!err & (doc !== null)) {
            res.send({ status: 200, message: "success", data: doc });
        } else {
            console.log("Error while getting data");
            res.send({ status: 404, message: "fail" });
        }
    });

}


