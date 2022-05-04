const InternModel = require("../models/inernModel")
const collegeModel = require("../models/collegeModel")

const InternController = async function (req, res) {
    // Also save the collegeId along with the document. Your request body contains the following fields - { name, mobile, email, collegeName}
    try {
        let body = req.body

        let mobile= body.mobile

        let StringCheck = /^[A-Za-z ]{1,10000}$/
        let NumberCheck= /^[6-9]{1}[0-9]{9}$/
        let Emailcheck= /^[A-Za-z_.0-9]{3,1000}@[A-Za-z]{3,1000}[.]{1}[A-Za-z.]{2,6}$/

        if (Object.keys(body).length === 0) {
            return res.status(404).send({ Status: false, msg: "Request Body can't be empty" })
        }
        if (!body.name) {
            return res.status(404).send({ Status: false, msg: "name is required" })
        }
        if (!body.mobile) {
            return res.status(404).send({ Status: false, msg: "mobile is required" })
        }

        if (!body.email) {
            return res.status(404).send({ Status: false, msg: "email is required" })
        }
        if (!body.collegeId) {
            return res.status(404).send({ Status: false, msg: "collegeId is required" })
        }
        if(!StringCheck.test(body.name)){
            return res.status(403).send({ Status: false, msg: "name must be alphabetic, no special characet or number allowed" })
        }

        if(!NumberCheck.test(body.mobile)){
            return res.status(403).send({ Status: false, msg: "Mobile number must be 10 digit , must be start from 6 to 9 digit" })
        }
        if(!Emailcheck.test(body.email)){
            return res.status(403).send({ Status: false, msg: "Please enter a valid email address" })
        }

        let InternData = await InternModel.create(body)

        return res.status(201).send({ Status: true, msg: InternData })
    }
    catch (err) {
        return res.status(404).send({ Status: false, msg: err.message })
    }
}

// Get Api solution

const InternDetails = async function (req, res) {

    try {
        let query = req.query

        if (Object.keys(query).length === 0) {
            return res.status(404).send({ Status: false, msg: "Req query is empty" })
        }
        if (!query.name) {
            return res.status(404).send({ Status: false, msg: "Please enter the name ,This is anabbreviated college name. For example: iith" })
        }
        let StringCheck = /^[A-Za-z]{2,10000}$/

        if(!StringCheck.test(query.name)){
            return res.status(403).send({ Status: false, msg: "name must be alphabetic, special character or space or number are not allowed" })
        }
        console.log("query.name:   ",query.name)
        let CheckCollege = await collegeModel.findOne({name:query.name}).select({name:1,fullName:1,logoLink:1,_id:0})
        console.log("CheckCollege:  ",CheckCollege)

        if (!CheckCollege) {
            return res.status(404).send({ Status: false, msg: " No college Found" })
        }

        let getData = await InternModel.find(CheckCollege._id).select({_id:1,name:1,email:1,mobile:1})
        let Interest =[]
        Interest= Interest.concat(getData)
        console.log("interest:  ",Interest)
        return res.status(200).send({ Status: true, data: CheckCollege, Interest  })
    }
    catch (err) {
        return res.status(404).send({ Status: false, msg: err.message })
    }
}




module.exports.InternController = InternController
module.exports.InternDetails = InternDetails
