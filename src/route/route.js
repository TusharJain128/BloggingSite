const express = require('express')
const router = express.Router()
const {createAuthor, loginAuthor} = require('../controller/authorController')
const {createBlog, getBlog, updateBlog, deleteById, deleteByQuery} = require('../controller/blogController')
const {authentication, authorisationById, authorisationToQuery}= require('../middleware/middleware')

router.post("/authors", createAuthor)

router.post("/login", loginAuthor)

router.post("/blogs", authentication, createBlog)

router.get("/blogs", authentication, getBlog)

router.put("/blogs/:blogId", authentication, authorisationById, updateBlog)

router.delete("/blogs/:blogId", authentication, authorisationById, deleteById)

router.delete("/blogs", authentication, authorisationToQuery, deleteByQuery)

module.exports = router