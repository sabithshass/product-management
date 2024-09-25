const Product = require("../models/Product");
const { handleError } = require("../utils/ErrorHandling");

module.exports.addProduct=async (req, res) => {
    try {
      
      const { title, subCategory, variants, description } = req.body;
      const image=req.file.path
      const newProduct = new Product({
        title,
        subCategory,
        variants,
        description,
        image
      });
  

      await newProduct.save();

      return{ message: 'Product created successfully' };
    } catch (error) {
      console.log(error)
      return handleError(error)
    }
  };
  

  module.exports.getAllProducts = async (req, res) => {
    try {
      const { page = 1, limit = 10, searchQuery, filter } = req.query;
  
      const query = {}; 
  
      if (searchQuery) {
        query.title = { $regex: searchQuery, $options: "i" };
      }
  
      if (filter) {
        query.subCategory = filter; 
      }
  
      const skip = (page - 1) * limit;
  
      const totalProducts = await Product.countDocuments(query);
  
      let products = await Product.find(query)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('subCategory');
        
      // Parse product variants
      products = products.map(product => {
        if (product.variants && Array.isArray(product.variants)) {
          product.variants = product.variants.map(variant => {
            try {
              return JSON.parse(variant);
            } catch (err) {
              console.log("Error parsing variant:", err);
              return variant;
            }
          });
        }
        return product;
      });
  
      const totalPages = Math.ceil(totalProducts / limit);
  
      const hasNext = page < totalPages;
      const hasPrevious = page > 1;
  
      return {
        data: {
          products,
          totalItems: totalProducts,
          totalPages,
          currentPage: parseInt(page),
          hasNext,
          hasPrevious
        },
        message: "Products fetched successfully"
      };
    } catch (error) {
      
      return handleError(error)
    }
  };
  


  module.exports.updateProduct = async (req, res) => {
    try {
      const { productId, title, subCategory, variants, description } = req.body;
      const image=req.file.path
      if (!productId) {
        return { message: 'Product ID is required',code:400 };
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { title, subCategory, variants, description, image },
        { new: true }
      );
  
      if (!updatedProduct) {
        return { message: 'Product not found' ,code:400};
      }
  
      return {
        message: 'Product updated successfully'
      };
    } catch (error) {
      return handleError(error)
    }
  };
  
  
  