const express = require("express");
const router = express.Router();
const Response = require("../utils/Response");
// Token Middleware: This middleware function is used to authenticate the token provided in the request headers.
const authenticateToken = require("../utils/MiddleWares/TokenMiddleware");
const { addSubCategory, getSubCategory } = require("../controller/SubCategoryController");

router
.route("/")
.post(authenticateToken,async(req,res)=> {
    const data = await addSubCategory(req, res);
    Response(res, data);
  })
  .get(authenticateToken,async(req,res)=> {
    const data = await getSubCategory(req, res);
    Response(res, data);
  })

module.exports = router;
