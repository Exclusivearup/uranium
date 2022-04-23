const express = require('express');
const router = express.Router();
const orderController= require("../controllers/orderController")
const UserController= require("../controllers/userController")
const productController= require("../controllers/productController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.post("/users",UserController.createUser)
router.post("/products",productController.createProduct)
router.post("/orders",orderController.createOrder)




module.exports = router;