
const userModel = require("../models/userModel")

const createUser = async function (req, res) {

    let userDetails = req.body
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
        return res.send({ status: false, msg: "user dosen't exits" })
    }
    let userCreated = await userModel.create(userDetails)
    res.send({ status: true, data: userCreated })


}

module.exports.createUser = createUser
