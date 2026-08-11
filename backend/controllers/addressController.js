import addressModel from "../models/Address";

// Get user addresses
// GET :- /api/addresses
export const getAddresses = async (req, res) => {
  const addresses = await addressModel
    .find({ userId: req.user._id })
    .sort({ createdAt: 1 });

  res.json({ addresses });
};

// Add address
// POST :- /api/addresses
export const addAddress = async (req, res) => {
  const { label, address, city, state, pin, isDefault, lat, lng } = req.body;

  //required coordinates
  if (lat == null || lng == null) {
    return res.status(400).json({
      message:
        "Location coordinates are required. Please allow location access.",
    });
  }

  const currentAddresses = await addressModel.find({ userId: req.user._id });

  let makeDefault = isDefault;
  if (currentAddresses.length === 0) {
    makeDefault = true;
  }

  if (makeDefault) {
    await addressModel.updateMany(
      { userId: req.user._id },
      { $set: { isDefault: false } },
    );
  }

  await addressModel.create({
    userId: req.user._id,
    label,
    address,
    city,
    state,
    pincode: pin,
    isDefault: makeDefault,
    lat: Number(lat),
    lng: Number(lng),
  });

  const addresses = await addressModel
    .find({ userId: req.user._id })
    .sort({ createdAt: 1 });

  res.status(201).json({ addresses });
};
