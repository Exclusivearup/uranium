const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const publisherModel=require("../models/publisherModel")


const createBook = async function (req, res) {
    let book = req.body
    let authorId = book.author
    let publisherId = book.publisher

    if (!authorId) { return res.send({ msg: "Author is must be present" }) }
    let validAuthor = await authorModel.findById({ _id: authorId })
    if (!validAuthor) { return res.send({ msg: "Author is not valid" }) }

    if (!publisher) { return res.send({ msg: "Publisher must be present" }) }
    let validPublisher = await publisherModel.findById({ _id: publisherId })
    if (!validPublisher) { return res.send({ msg: "Publisher is not valid" }) }

    let bookCreated = await bookModel.create(book)
    res.send({ data: bookCreated })
}
let fetchBooks = async function (req, res) {
    let books = await bookModel.find().populate("author" , "publisher")
    res.send({ data: books })
}
const updateBooks = async function (req, res) {
    let hardCoverPublishers = await publisherModel.find({ name: { $in: ['penguin', 'HarperCollins'] } }).select({ _id: 1 })
    for (let i = 0; i < hardCoverPublishers.length; i++) {
        await bookModel.updateMany({ publisher: hardCoverPublishers[i]._id }, { isHardCover: true })
        res.send({ msg: "Update succesfully" })
    }
}
    const updateRatings = async function (req, res) {
        const auth = await authorModel.find({ rating: { $gt: 3.5 } }).select({ _id: 1 })
        for (let i = 0; i < auth.length; i++) {
            await authorModel.updateMany({ author: auth[i]._id }, { $inc: { price: 10 } })
        }
        res.send({ msg: "Done" })

    }

module.exports.createBook = createBook
module.exports.fetchBooks = fetchBooks
module.exports.updateBooks= updateBooks
module.exports.updateRatings = updateRatings