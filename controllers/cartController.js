const express = require("express");
const router = express.Router();

// const { User, userSchema } = require("../models/user");

// const userservice = require("../Middleware/userservice");
// const productsservice = require("../Middleware/productsservice")

const cartservice = require("../Middleware/cartservice")

// CART

router.post("/", cartservice.addItemToCart);
router.get("/list", cartservice.list);
router.get("/:id", cartservice.userid);
// router.get("/list", productsservice.list);
// router.delete("/delete/:id", productsservice.delete);
// router.put("/update/:id", productsservice.update);
// router.get("/:id", productsservice.productid);





module.exports = router;