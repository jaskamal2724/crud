import { crud } from "../models/user.model.js";
import mongoose from "mongoose";

const addData = async(req, res)=>{
    try {
        const { title, price, category, description, image } = await req.body;
    
        // Validation (Optional: Ensure all fields are present)
        if (!title || !price || !category || !description || !image) {
          return res.status(400).json({ message: 'All fields are required!' });
        }
    
        // Create a new document using the model
        const newProduct = new crud({
          title,
          price,
          category,
          description,
          image,
        });
    
        // Save the document to MongoDB
        const savedProduct = await newProduct.save();
    
        // Send a success response
        res.status(201).json({
          message: 'Product added successfully!',
          product: savedProduct,
        });
      } catch (error) {
        // Handle errors
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
      }
}

const getData = async(req,res)=>{
    try {
        // Fetch all products from the database
        const products = await crud.find({});
        
        // Send the data back to the client
        res.status(200).json({
          success: true,
          data: products,
        });
      } catch (error) {
        console.error('Error fetching products:', error);
    
        // Send error response if something goes wrong
        res.status(500).json({
          success: false,
          message: 'Failed to retrieve products',
        });
      }
}

const update = async(req,res)=>{

  try {
    const { id, ...updatedData } = req.body; // Extract the ID and other fields from the body

    // Find the product by ID and update it
    const updatedProduct = await crud.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the new data
    });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating product", error });
  }
}

const deleteData = async(req, res)=>{
    

    try {
        const { id } = req.body; // Get product ID from the request body
      // Validate the provided ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
  
      // Find and delete the product
      const deletedProduct = await crud.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
}

export {addData, getData, update , deleteData}