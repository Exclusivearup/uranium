
const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const publisherController = require('../controllers/publisherController')
const bookController= require("../controllers/bookController");
// const { route } = require('express/lib/application');

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

router.post('/createPublisher', publisherController.createPublisher)

router.post("/createBook", bookController.createBook  )

router.get('/fetchBooks', bookController.fetchBooks)

router.put('/updateBooks', bookController.updateBooks)

router.put("/updateRatings", bookController.updateRatings)

module.exports = router;