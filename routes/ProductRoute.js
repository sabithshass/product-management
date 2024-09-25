const express = require("express");
const router = express.Router();
const Response = require("../utils/Response");
const { addProduct, getAllProducts, updateProduct } = require("../controller/ProductController");
// Token Middleware: This middleware function is used to authenticate the token provided in the request headers.
const authenticateToken = require("../utils/MiddleWares/TokenMiddleware");
// File Upload Middleware: This middleware is used for handling multipart/form-data (file uploads).
const upload = require("../utils/MiddleWares/FileUploadMiddleware");


router
  .route("/")

.post(authenticateToken,upload.single("image"),async(req,res)=> {
    const data = await addProduct(req, res);
    Response(res, data);
  })

.get(async(req,res) =>{
  const data = await getAllProducts(req,res)
  Response(res,data)
})
.put(authenticateToken,upload.single("image"),async(req,res) =>{
  const data = await updateProduct(req,res)
  Response(res,data)
})

module.exports = router;
