const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Number of bedrooms is required"],
      min: [0, "Bedrooms cannot be negative"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Number of bathrooms is required"],
      min: [0, "Bathrooms cannot be negative"],
    },
    sqft: {
      type: Number,
      required: [true, "Square footage is required"],
      min: [0, "Square footage must be positive"],
    },
    propertyType: {
      type: String,
      enum: ["house", "apartment"],
      required: [true, "Property type is required"],
    },
    images: {
      type: [String], // Stores file paths (e.g., "uploads/1707609481234.jpg")
      required: [true, "At least one image is required"],
      validate: {
        validator: function (arr) {
          return arr.length > 0; // Ensure at least one image
        },
        message: "At least one image must be uploaded",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller", // Reference the 'Buyer' model
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
