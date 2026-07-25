import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "",
      required: true,
      trim: true,
    },
    unit: {
      type: String,
      default: "piece",
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    isOrganic: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timeStamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;

// model Product {
//   name          String
//   description   String?
//   price         Float
//   originalPrice Float?
//   image         String
//   category      String
//   unit          String?
//   stock         Int?
//   isOrganic     Boolean?
//   rating        Float?
//   reviewCount   Int?
//   createdAt     DateTime
//   updatedAt     DateTime
// }
