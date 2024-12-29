import mongoose,{ mongo, Schema} from "mongoose";

// Define the schema
const productSchema = new Schema({
  title: {
    type: String,
    required: true, // Make this field mandatory
    trim: true, // Removes leading/trailing whitespace
  },
  price: {
    type: Number,
    required: true, // Make this field mandatory
    min: 0, // Ensure price is non-negative
  },
  category: {
    type: String,
    required: true, // Make this field mandatory
    trim: true,
  },
  description: {
    type: String,
    required: true, // Make this field mandatory
    trim: true,
  },
  image: {
    type: String,
    required: true, // Make this field mandatory
    trim: true,
  },
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt` fields

// Create the model

export const crud = new mongoose.model("crud",productSchema)