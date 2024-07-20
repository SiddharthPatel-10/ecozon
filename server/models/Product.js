const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "OutOfStock"],
    default: "Available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  brand: {
    type: String,
    required: true,
  },
});

// Middleware to update the updatedAt field before saving
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the Product model
module.exports = mongoose.model("Product", productSchema);
