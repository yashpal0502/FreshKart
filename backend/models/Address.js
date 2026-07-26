import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: Number,
      required: true,
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  {
    timeStamps: true,
  },
);

const addressModel = mongoose.model("Address", addressSchema);

export default addressModel;

// model Address {
//   userId    String
//   label     String
//   address   String
//   city      String
//   state     String
//   pincode   Number
//   isDefault Boolean
//   lat       Float
//   lng       Float
//   createdAt DateTime
//   updatedAt DateTime
// }
