import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timeStamps: true },
);

const User = mongoose.Model("User", userSchema);

export default User;

// model User {
//   id        String
//   name      String
//   email     String
//   password  String
//   phone     String?
//   avatar    String?
//   addresses Address[]
//   orders    Order[]
//   createdAt DateTime
//   updatedAt DateTime
// }
