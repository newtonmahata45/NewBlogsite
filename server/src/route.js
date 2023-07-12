const express = require("express");
const router = express.Router();
const {createUser, login} = require("./controller/userController.js");
const {createBlog, getFilteredBlog, putBlog} = require("./controller/blogController.js");
const {authenticate, authorisation} = require("./auth.js");




router.post("/createuser", createUser) // create author

router.post("/login", login)

router.post("/blogs", authenticate, createBlog) //create Blog

router.get("/blogs", getFilteredBlog) // get by filter Blog

router.put("/blogs/:blogId", authenticate, authorisation, putBlog) // update data



module.exports = router;