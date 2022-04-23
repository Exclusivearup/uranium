const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

const createOrder = async function (req, res) {
    let orderDetails = req.body
    let headers = req.headers
    let appType = headers["isFreeAppUser"]
    if (!appType) {
        appType = headers["isfreeappuser"]
    }
    if (!appType) {
        return res.send({ status: false, msg: "A mandatory header is missing" })
    }
    let userId = orderDetails.userId
    let user = await userModel.findById(userId)
    if (!user) {
        return res.send({ status: false, msg: "user doesn't exist" })
    }
    let productDetails = req.body
    let productId = productDetails.productId
    let product = await productModel.findById(productId)
    if (!product) {
        return res.send({ status: false, msg: "product doesn't exist" })
    }
    let appTypeFree = false

    if (appType == "true") {
        appTypeFree = true
    }


    if (!appTypeFree && user.balance >= product.price) {
        user.balance = user.balance - product.price
        await user.save()

        orderDetails.amount = product.price
        orderDetails.isFreeAppUser = false
        let orderCreated = await orderModel.create(orderDetails)
        return res.send({ status: true, data: orderCreated })
    } else if (!appTypeFree) {
        return res.send({ status: false, msg: "User doesn't have sufficent balance" })
    } else {
        orderDetails.amount = 0
        orderDetails.isFreeAppUser = true
        let orderCreated = await orderModel.create(orderDetails)
        res.send({ status: true, data: orderCreated })
    }





}
module.exports.createOrder = createOrder