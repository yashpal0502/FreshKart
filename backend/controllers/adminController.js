import deliveryPartnerModel from "../models/DeliveryPartner.js";
import orderModel from "../models/Order.js";
import productModel from "../models/Product.js";
import userModel from "../models/User.js";
import bcrypt from "bcrypt";

// get admin dashboard data
export const getAdminStats = async (req, res) => {
  const [
    totalOrders,
    totalUsers,
    totalProducts,
    outOfStock,
    totalPartners,
    recentOrders,
  ] = await Promise.all([
    // Total valid orders
    orderModel.countDocuments({
      $nor: [{ paymentMethod: "card", isPaid: false }],
    }),

    // Total users
    userModel.countDocuments(),

    // Total products
    productModel.countDocuments(),

    // Out of stock products
    productModel.countDocuments({ stock: 0 }),

    // Total delivery partners
    deliveryPartnerModel.countDocuments(),

    // Recent valid orders
    orderModel
      .find({ $nor: [{ paymentMethod: "card", isPaid: false }] })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate("userId", "name email")
      .populate("deliveryPartnerId", "name phone")
      .lean(),
  ]);

  res.json({
    totalOrders,
    totalUsers,
    totalProducts,
    outOfStock,
    totalPartners,
    recentOrders,
  });
};

// get delivery partners list for admin
export const getDeliveryPartners = async (req, res) => {
  const partners = await deliveryPartnerModel.find().sort({ createdAt: -1 });

  res.json({ partners });
};

// create delivery partner profile
export const createDeliveryPartner = async (req, res) => {
  const { name, email, password, phone, vehicleType } = req.body;

  if (!name || !email || !password || !phone || !vehicleType) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const normalizedEmail = email.toLowerCase().trim();

  //if partner already exists
  const existingPartner = await deliveryPartnerModel.findOne({
    email: normalizedEmail,
  });
  if (existingPartner) {
    return res.status(400).json({
      message: "Delivery partner with this email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const partner = await deliveryPartnerModel.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    phone,
    vehicleType,
  });

  const partnerResponse = partner.toObject();
  delete partnerResponse.password;

  res.status(201).json({ partner: partnerResponse });
};
