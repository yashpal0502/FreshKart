import addressModel from "../models/Address.js";

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
  const { label, address, city, state, pincode, isDefault, lat, lng } =
    req.body;

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
    pincode,
    isDefault: makeDefault,
    lat: Number(lat),
    lng: Number(lng),
  });

  const addresses = await addressModel
    .find({ userId: req.user._id })
    .sort({ createdAt: 1 });

  res.status(201).json({ addresses });
};

// Update address
// PUT :- /api/addresses/:id
export const updateAddress = async (req, res) => {
  const { label, address, city, state, pincode, isDefault, lat, lng } =
    req.body;

  // Find address and make sure it belongs to the logged-in user
  const existingAddress = await addressModel.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!existingAddress) {
    return res.status(404).json({
      message: "Address not found",
    });
  }

  //required coordinates
  if (lat !== undefined || lng !== undefined) {
    if (lat == null || lng == null) {
      return res.status(400).json({
        message:
          "Location coordinates are required. Please allow location access.",
      });
    }
  }

  if (isDefault) {
    await addressModel.updateMany(
      { userId: req.user._id },
      { $set: { isDefault: false } },
    );
  }

  const data = {};

  if (label) {
    data.label = label;
  }
  if (address) {
    data.address = address;
  }
  if (city) {
    data.city = city;
  }
  if (state) {
    data.state = state;
  }
  if (pincode) {
    data.pincode = pincode;
  }
  if (isDefault !== undefined) {
    data.isDefault = isDefault;
  }
  if (lat != null) {
    data.lat = Number(lat);
    data.lng = Number(lng);
  }

  try {
    await addressModel.updateOne(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      {
        $set: data,
      },
    );
  } catch (error) {
    return res.status(404).json({ message: "Address not found" });
  }

  const addresses = await addressModel
    .find({ userId: req.user._id })
    .sort({ createdAt: 1 });

  res.json({ addresses });
};

// Delete address
// DELETE :- /api/addresses/:id
export const deleteAddress = async (req, res) => {
  try {
    const deletedAddress = await addressModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deletedAddress) {
      return res.status(404).json({
        message: "Address not found",
      });
    }
    const addresses = await addressModel
      .find({ userId: req.user._id })
      .sort({ createdAt: 1 });

    res.json({ addresses });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Failed to delete address",
    });
  }
};
