const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Unknown"],
      required: true,
    },
    category: {
      type: String,
      enum: ["Dog", "Cat", "Bird", "Other"],
      required: true,
    },
    breed: {
      type: String,
      trim: true,
      required: true,
    },
    adopted: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vaccineStatus: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      address: {
        type: String,
        trim: true,
        required: true,
      },

      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
  },
  { timestamps: true }
);

petSchema.index({ location: "2dsphere" });

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
