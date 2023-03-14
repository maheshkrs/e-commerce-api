

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
                         "$set": {
                             "cartItems": {
                                ...req.body.cartItems[0],
                                  quantity: item.quantity + req.body.cartItems[0].quantity,
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


