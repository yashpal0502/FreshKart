import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "card",
      trim: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    deliveryFee: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Placed",
      trim: true,
    },

    statusHistory: {
      type: Array,
      default: [],
    },

    deliveryPartnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPartner",
      default: null,
    },

    deliveryOtp: {
      type: String,
      default: "",
    },

    liveLocation: {
      type: Object,
      default: null,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

// model Order {
//   userId          String
//   items           Json
//   shippingAddress Json
//   paymentMethod   String
//   subtotal        Float
//   deliveryFee     Float?
//   tax             Float?
//   total           Float
//   status          String
//   statusHistory   Json
//   deliveryPartnerId String?
//   deliveryPartner   DeliveryPartner?
//   deliveryOtp       String?
//   liveLocation      Json?
//   isPaid            Boolean?
//   createdAt DateTime
//   updatedAt DateTime
// }
