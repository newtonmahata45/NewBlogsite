const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const blogModel = require("../model/blogModel.js");
const userModel = require("../model/userModel");
const aws = require("../aws.js");

const createBlog = async function (req, res) {
  let blogs = req.body;
  let userId = req.body.userId;
  let blogFile = req.files;
  try {
    if (!userId) {
      return res
        .status(400)
        .send({ status: false, message: "userId must be present" });
    }
    let user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ status: false, message: "This user is not found" });
    }
    //  Create : aws link for profile image
    console.log(blogFile);
    if (blogFile.length) {
      var uploadedFileURL = await aws.uploadFile(blogFile[0]);

      blogs.blogFile = uploadedFileURL;
    }
    let blogCreated = await blogModel.create(blogs);
    return res
      .status(201)
      .send({ status: true, message: "success", data: blogCreated });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getFilteredBlog = async function (req, res) {
  try {
    let queryParams = req.query;

    let Blog = await blogModel
      .find({ ...queryParams })
      .populate("userId","-password");
    if (Blog) {
      return res
        .status(200)
        .send({ status: true, message: "Done", data: Blog });
    } else {
      return res
        .status(404)
        .send({ status: false, message: "Document doesnt exist" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const putBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let body = req.body;
    let blogFile = req.files;
    console.log("updating");
    if (blogFile) {
      var uploadedFileURL = await aws.uploadFile(blogFile[0]);

      body.blogFile = uploadedFileURL;
    }
    let updateblog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { $set: { ...body } },
      { new: true }
    );
    return res
      .status(200)
      .send({
        status: true,
        message: "Blog Updated Successfully",
        data: updateblog,
      });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.createBlog = createBlog;
module.exports.getFilteredBlog = getFilteredBlog;
module.exports.putBlog = putBlog;
