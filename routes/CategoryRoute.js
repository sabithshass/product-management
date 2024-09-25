const express = require("express");
const router = express.Router();
const Response = require("../utils/Response");
// Token Middleware: This middleware function is used to authenticate the token provided in the request headers.
const authenticateToken = require("../utils/MiddleWares/TokenMiddleware");
const { addCategory, getCategories } = require("../controller/CategoryController");

router
  .route("/")
.post(authenticateToken,async(req,res)=> {
    const data = await addCategory(req, res);
    Response(res, data);
  })
  .get(authenticateToken,async(req,res)=> {
    const data = await getCategories(req, res);
    Response(res, data);
  })

module.exports = router;
