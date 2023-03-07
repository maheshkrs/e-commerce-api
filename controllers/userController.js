const express = require("express");
const router = express.Router();

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const ObjectId = require("mongoose").Types.ObjectId;

const { User, userSchema } = require("../models/user");

const userservice = require("../Middleware/userservice");
// console.log("user", userSchema);

// SIGN UP

router.post("/signup", userservice.signup);
router.post("/signin", userservice.signin);
// router.post("/create", userservice.create);
router.get("/list", userservice.list);
router.get("/:id", userservice.userid);
router.put("/update/:id", userservice.update);
router.delete("/delete/:id", userservice.delete);

// router.post("/login", userservice.login);

module.exports = router;
