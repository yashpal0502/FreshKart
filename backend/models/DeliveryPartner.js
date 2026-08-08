import mongoose from "mongoose";

const deliveryPartnerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    vehicleType: {
      type: String,
      default: "bike",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    orders: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  {
    timestamps: true,
  },
);

const deliveryPartnerModel = mongoose.model(
  "DeliveryPartner",
  deliveryPartnerSchema,
);

export default deliveryPartnerModel;

// model DeliveryPartner {
//   name        String
//   email       String
//   password    String
//   phone       String
//   avatar      String?
//   vehicleType String?
//   isActive    Boolean?
//   isAvailable Boolean?
//   orders      Order[]
//   createdAt   DateTime
//   updatedAt   DateTime
// }
