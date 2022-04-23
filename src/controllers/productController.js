
const productModel = require("../models/productModel")


const createProduct = async function (req, res) {
    let productDetails = req.body
    let productCreated = await productModel.create(productDetails)
    res.send({ status: true, data: productCreated })

}

module.exports.createProduct = createProduct

















const createUser = async function (req, res) {
    let data = req.body
    let savedData = await UserModel.create(data)
    res.send({ msg: savedData })
}

const getUsersData = async function (req, res) {
    let allUsers = await UserModel.find()
    res.send({ msg: allUsers })
}

module.exports.createUser = createUser
module.exports.getUsersData = getUsersData
