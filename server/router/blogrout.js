const express = require('express');
const { getAllBlogs, createBlogs, updateBlog, getSingleBlog, deleteBlogs } = require('../controller/blogController');
const router = express.Router();

router.get('/all-blog',getAllBlogs)

router.post('/create-blog',createBlogs)

router.put('/update-blog/:id',updateBlog)

router.get('/get-blog/:email',getSingleBlog)

router.delete('/delete-blog/:id',deleteBlogs)

module.exports = router;