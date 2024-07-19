const Product = require("../models/Product");
const Category = require('../models/Category'); 
const User = require('../models/User'); 

// Create Product Controller
exports.createProduct = async (req, res) => {
    try {
        // Get details from request body
        const { name, description, price, category, stock, seller, images, tags } = req.body;

        // Validation
        if (!name || !description || !price || !category || !stock || !seller || !images || !tags) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Create Product 
        const newProduct = await Product.create({
            name, description, price, category, stock, seller, images, tags
        });

        // Return success response with created product
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message,
        });
    }
};

// get All Products Controller
exports.getAllProducts = async( req, res) => {
    try {
        const allProducts = await Product.find({});
        return res.status(200).json({
            success: true,
            data: allProducts,
            message: "All the list of Products"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message,
          });
    }
}

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('category').populate('seller');
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
  
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching product',
        error: error.message,
      });
    }
  };
  
  // Update a product by ID
  exports.updateProductById = async (req, res) => {
    try {
      const { name, description, price, category, stock, images, tags } = req.body;
  
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          description,
          price,
          category,
          stock,
          images,
          tags,
          updatedAt: Date.now(),
        },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating product',
        error: error.message,
      });
    }
  };
  
  // Delete a product by ID
  exports.deleteProductById = async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  
      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        product: deletedProduct,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting product',
        error: error.message,
      });
    }
  };