const express = require("express");
const router = express.Router();

// const { User, userSchema } = require("../models/user");

// const userservice = require("../Middleware/userservice");
const productsservice = require("../Middleware/productsservice")

// PRODUCTS

router.post("/create", productsservice.create);
router.get("/list", productsservice.list);
router.delete("/delete/:id", productsservice.delete);
router.put("/update/:id", productsservice.update);
router.get("/:id", productsservice.productid);





module.exports = router;
