const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController')
const blogController = require('../controllers/blogController')
const middleware = require('../middleware/middleware')


router.post('/authors', authorController.createAuthor);

router.post('/login', authorController.loginAuthor);

router.post('/blogs',middleware.loginCheck, blogController.createBlog);


 router.put('/blogs/:blogId',middleware.loginCheck, blogController.deleteBlog);

 router.get('/blogs',blogController.getBlog );

 router.delete('/blogs/:blogId',blogController.deleteBlog );

 router.put('/blogs/:blogId',blogController.updateBlog)



module.exports=router;
