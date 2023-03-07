const express = require("express");
const router = express.Router();

// const { User, userSchema } = require("../models/user");

// const userservice = require("../Middleware/userservice");
const productsservice = require("../Middleware/productsservice")

// PRODUCTS

router.post("/create", productsservice.create);
router.get("/list", productsservice.list);
router.delete("/delete/:id", productsservice.delete);
// router.get("/:id", userservice.userid);
// router.put("/update/:id", userservice.update);




module.exports = router;
