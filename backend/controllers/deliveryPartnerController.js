import deliveryPartnerModel from "../models/DeliveryPartner.js";
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
