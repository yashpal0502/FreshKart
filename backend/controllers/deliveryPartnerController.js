import deliveryPartnerModel from "../models/DeliveryPartner.js";
import orderModel from "../models/Order.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id, role: "delivery" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Login Delivery Partner
// POST :- /api/delivery/login
export const loginPartner = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  const partner = await deliveryPartnerModel.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!partner) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!partner.isActive) {
    res.status(403).json({ message: "Your account has been deactivated" });
  }

  const isMatch = await bcrypt.compare(password, partner.password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(partner._id);

  const partnerData = partner.toObject();
  delete partnerData.password;

  res.json({ partner: partnerData, token });
};

// Get assigned deliveries
// GET :- /api/delivery/my-deliveries
export const getMyDeliveries = async (req, res) => {
  const { status } = req.query;

  const filter = { deliveryPartnerId: req.partner._id };

  if (status === "active") {
    filter.status = { $in: ["Assigned", "Packed", "Out for Delivery"] };
  } else if (status === "completed") {
    filter.status = { $in: ["Delivered", "Cancelled"] };
  }

  const orders = await orderModel
    .find(filter)
    .populate("user", "name email phone")
    .sort({ createdAt: -1 });

  res.json({ orders });
};

// Get single delivery details
// GET :- /api/delivery/my-deliveries/:id
export const getDeliveryDetail = async (req, res) => {
  const order = await orderModel
    .findOne({
      _id: req.params._id,
      deliveryPartnerId: req.partner._id,
    })
    .populate("user", "name email phone");

  if (!order) {
    return res.status(404).json({ message: "Delivery not found" });
  }

  res.json({ order });
};

// Complete delivery with OTP
// PUT :- /api/delivery/my-deliveries/:id/complete
export const completeDelivery = async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    return res.status(400).json({
      message: "OTP is required",
    });
  }

  const order = await orderModel.findOne({
    _id: req.params._id,
    deliveryPartnerId: req.partner._id,
  });

  if (!order || order.status === "Cancelled" || order.status === "Delivered") {
    return res.status(400).json({ message: "Invalid Request" });
  }

  if (order.deliveryOtp !== otp) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  order.status = "Delivered";
  order.deliveryOtp = "";

  order.statusHistory.push({
    status: "Delivered",
    note: "Delivered by partner",
    timestamp: new Date(),
  });

  await order.save();

  res.json({ order, message: "Delivery completed successfully" });
};

// Cancel delivery
// PUT :- /api/delivery/my-deliveries/:id/cancel
export const cancelDelivery = async (req, res) => {
  const { reason } = req.body;

  const order = await orderModel.findOne({
    _id: req.params._id,
    deliveryPartnerId: req.partner._id,
  });

  if (!order) {
    return res.status(404).json({
      message: "Delivery not found",
    });
  }

  if (order.status === "Delivered") {
    return res.status(400).json({ message: "Cannot cancel a delivered order" });
  }

  if (order.status === "Cancelled") {
    return res.status(400).json({
      message: "Delivery is already cancelled",
    });
  }

  order.status = "Cancelled";

  order.statusHistory.push({
    status: "Cancelled",
    note: reason || "",
    timestamp: new Date(),
  });

  await order.save();

  return res.json({
    order,
    message: "Delivery cancelled",
  });
};

// Update order status
// PUT :- /api/delivery/my-deliveries/:id/status
export const updateDeliveryStatus = async (req, res) => {
  const { status } = req.body;
  const allowedStatus = ["Packed", "Out for Delivery"];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status update" });
  }

  const order = await orderModel.findOne({
    _id: req.params._id,
    deliveryPartnerId: req.partner._id,
  });

  if (!order) {
    return res.status(404).json({
      message: "Delivery not found",
    });
  }

  if (["Delivered", "Cancelled"].includes(order.status)) {
    return res.status(400).json({
      message: `Cannot update a ${order.status.toLowerCase()} delivery`,
    });
  }

  order.status = status;

  order.statusHistory.push({
    status,
    note: `Status updated to ${status}`,
    timestamp: new Date(),
  });

  await order.save();

  res.json({ order });
};
