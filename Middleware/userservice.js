const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const { users } = require("../models/user");
// const { userSchema } = require("../models/user");
const app = require("../app");
// const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require('jsonwebtoken');


//********* */ USER SIGNUP************
module.exports.signup = (req, res) => {
   bcrypt.hash(req.body.userpassword, 10, (err, hash)=> {
       if(err){
          console.log("errrr",err);
           return res.status(400).send({
              status: 400,
              error: "Please enter the details",
          });
      } else {
         
           const signup = new users({
               username: req.body.username,
                userrole: req.body.userrole,
                userpassword: hash,
           });
          
       
           users.findOne({ username: req.body.username }, (err, doc) => {

         
               if (!err & (doc !== null)) {
                  
                   res.status(409).send({
                       status: 409,
                       message: "User already Exists",
                   });
                 
               }   else {
                   console.log("two", req.body);
                   signup.save().then( result => {
                    console.log("users signrd",result)
                    res.send({
                        status:200,
                        message:"Succesfully Registered"
                    })
                   })
                       .catch((err) => {
                           console.log("test", err);
                           res.send({
                               status: 404,
                               message: "failed",
                           });
                       });
                   
               }
           });
      }


   })
};
// /********* */ USER SIGNIN************

module.exports.signin = (req, res) => {
   
    const { username, userpassword } = req.body;
        console.log("user",username);
    users
        .findOne({ username: req.body.username })
        .exec()
        .then((user) => {
         
            if (user < 1 || user.username == '') {
                return res.status(404).json({
                    status: 404,
                    message: "User not found, User doesnot exist",
                });
            }
            bcrypt.compare(req.body.userpassword, user.userpassword, (err, result) => {


                if (err) {
                    return res.status(404).json({
                        status: 404,
                        message: "Password Auth failed",
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            username: user.username,
                            userpassword: user.userpassword,
                        },
                        'JWT_KEY',
                        {
                            expiresIn: "1h",
                        }
                    );


                    // 
                 
                    // 
                    return res.status(200).json({
                        status: 200,
                        userid: user._id,
                        username:user.username,
                        message: "Login Auth Succesfull",
                        token: token,
                    });
                }
                res.status(401).json({
                    status: 401,
                    message: "Password Auth failed",
                });
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Login failed",
            });
        });

};

// ***************SAVE USERS************************//

// module.exports.create = async (req, res) =>{
//     let body = req.body;
  
//     await users.insertMany(body).then((result) => {
//         if(result){
//             res.send({
//                 status: 200,
//                 meaasge: "successfully posted"
//             })
//         }
//        else {
//             res.send({
//                 status: 404,
//                 meaasge: "failed"
//             }) 
//         }
      
//     })
//         .catch((err) => {
//             res.send({
//                 status: 404,
//                 meaasge: "failed",
//             })
//         })
// }

// ***************GET ALL USERS LIST**********************//
module.exports.list = async (req, res) => {
    let body = req.body;
    
    await users.find({}).then((result) => {
        if (result.length > 0) {
            res.send({
                status: 200,    
                message: "Data available",
                length : result.length,
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

    }) .catch((err) => {
        res.send({
            status: 404,
            meaasge: "failed",
            data: result
        })
    }) 
};

// ***************GET ALL USERS BY ID**********************//

module.exports.userid =  (req, res) => {
    let body = req.body;
    if (!ObjectId.isValid(req.params.id))
         return res.send({ status: 400, message: `No record for the given  - ${req.params.id}` });
         const id = req.params.id;
           console.log("reuest",id);
         users.find({ _id: id }, (err, doc) => {
        if (!err & (doc !== null)) {
         res.send({ status: 200, message: "success", data: doc });
    } else {
      console.log("Error while getting data");
      res.send({ status: 404, message: "fail" });
    }
  });

}
// **********************UPDATE THE RECORD*********************************//
module.exports.update = async (req, res) => {
    let body = req.body;
    const id = req.params.id;
  
    await users.updateOne({ _id: id }, { $set: { username: body.username, userlocation: body.userlocation }}).then((result) => {
      
            res.send({
                status: 200,
                message: "Record updated",
                length: result.length,
                data: result
            })
       

    }).catch((err) => {
        res.send({
            status: 404,
            meaasge: "failed to update",
            // data: result
        })
    })
};

// ************************ DELETE RECORD ************************************************//
module.exports.delete = async (req, res) => {
    let body = req.body;
    // console.log('======',res);
    
    const id = req.params.id;
    console.log("reuest", id);

    await users.deleteOne({ _id: id}).then((result) => {
              console.log("result",result);     
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
