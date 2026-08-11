import addressModel from "../models/Address";

// Get user addresses
// GET :- /api/addresses
export const getAddresses = async (req, res) => {
  const addresses = await addressModel
    .find({ userId: req.user._id })
    .sort({ createdAt: 1 });

  res.json({ addresses });
};
