
const mongoose = require('mongoose')
const moment = require('moment')
const userModel = require('../models/userModel')
const reviewModel = require('../models/reviewModel')
const booksModel = require('../models/booksModel')
const aws = require('aws-sdk')






const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0) return false;
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
//==================================AWS Config========================================//

aws.config.update({
    accessKeyId: "AKIAY3L35MCRVFM24Q7U",
    secretAccessKey: "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",
    region: "ap-south-1"
})


let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {

        let s3 = new aws.S3({ apiVersion: '2006-03-01' });

        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",  //HERE
            Key: "mubashir/" + file.originalname, //HERE 
            Body: file.buffer
        }


        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            console.log(data)
            console.log("file uploaded succesfully")
            return resolve(data.Location)
        })

    })
}






const createBooks1 = async function (req, res) {
    try {

        const data = req.body;
        const decodedToken = req.decodedToken

        const { title, excerpt, ISBN, releasedAt, userId, category, subcategory } = req.body



        let files = req.files

        if (files && files.length > 0) {

            let uploadedFileURL = await uploadFile(files[0])
            console.log(uploadedFileURL)
            data.bookCover = uploadedFileURL

            // return   res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
        }
        else {
            return res.status(400).send({ msg: "No file found" })
        }





        if (!userId) {
            return res.status(400).send({ status: false, message: 'user Id is must be present !!!!!!!' });

        }
        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "userId  is not valid !!!!!!" });

        }
        

        const ISBN_ValidatorRegEx = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;


        const releasedAt_ValidatorRegEx = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Body is required" })
        }

        if ((data.isDeleted && data.isDeleted != "false")) {
            return res.status(400).send({ status: false, message: "isDeleted must be false" })
        }

        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: "Title is required" })
        }

        let isRegisteredTitle = await booksModel.findOne({ title }).lean();

        if (isRegisteredTitle) {
            return res.status(400).send({ status: false, message: "Title already registered" });
        }

        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, message: "excerpt is required" })
        }

        let validationUserId = await userModel.findById(userId).lean();

        if (!validationUserId) {
            return res.status(400).send({ status: false, message: "User is not registered ... ", });
        }

        if (!isValid(ISBN)) {
            return res.status(400).send({ status: false, message: "ISBN is required..." })
        }

        let isRegisteredISBN = await booksModel.findOne({ ISBN }).lean();

        if (isRegisteredISBN) {
            return res.status(400).send({ status: false, message: "ISBN already registered" });
        }

        if (!ISBN_ValidatorRegEx.test(ISBN)) {
            return res.status(400).send({ status: false, message: "plz enter a valid 13 digit ISBN No." });
        }

        if (!isValid(category)) {
            return res.status(400).send({ status: false, message: "Category is required..." })
        }
        if (!subcategory) {
            return res.status(400).send({ status: false, message: "subcategory is required..." })
        }

        //   if (!Array.isArray(subcategory)) {
        //     return res.status(400).send({ status: false, message: "Subcategory is must be an array of String" })
        //   }

        //   let validSubcategory = true;

        //   const checkTypeofSubcategory = subcategory.map(x => {
        //     if (typeof x != "string" || x.trim().length == 0) {
        //       validSubcategory = false
        //     }
        //   })

        //   if (validSubcategory == false) {
        //     return res.status(400).send({ status: false, message: "Subcategory is not valid..." })
        //   }

        if (!releasedAt) {
            return res.status(400).send({ status: false, message: "Please provide released-date" });
        }

        if (!releasedAt_ValidatorRegEx.test(releasedAt)) {
            return res.status(400).send({ status: false, message: "plz enter a valid Date format" });
        }

        let bookCreated = await booksModel.create(data)

        res.status(201).send({ status: true, message: "Success", data: bookCreated });

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
};


module.exports = { createBooks1 }