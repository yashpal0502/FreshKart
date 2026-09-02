import productModel from "../models/Product.js";
import orderModel from "../models/Order.js";
import { inngest } from "../inngest/index.js";

// Create order
// POST :- /api/orders

export const createOrder = async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  const productIds = items.map((i) => {
    return i.product;
  });

  const products = await productModel.find({ _id: { $in: productIds } });

  const productMap = {};

  products.forEach((p) => {
    productMap[p._id] = p;
  });

  //   check if product is in stock
  for (const item of items) {
    const product = productMap[item.product];
    if (!product || (product.stock ?? 0) < item.quantity) {
      return res.status(400).json({ message: "Product out of stock" });
    }
  }

  const orderItems = items.map((item) => {
    const dbProduct = productMap[item.product];
    if (!dbProduct) {
      throw new Error(`Product ${item.product} not found!`);
    }

    return {
      product: dbProduct._id,
      name: dbProduct.name,
      image: dbProduct.image,
      price: dbProduct.price,
      quantity: item.quantity,
      unit: dbProduct.unit,
    };
  });

  // console.log("ORDER ITEMS:", orderItems);

  const subTotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // console.log("SUBTOTAL:", subTotal);

  const deliveryFee = subTotal > 249 ? 0 : 49;
  const tax = Math.round(subTotal * 0.08 * 100) / 100;
  const total = Math.round((subTotal + deliveryFee + tax) * 100) / 100;

  const order = await orderModel.create({
    userId: req.user._id,
    items: orderItems,
    shippingAddress,
    subtotal: subTotal,
    deliveryFee,
    tax,
    total,
    statusHistory: [
      {
        status: "Placed",
        note: "Order placed successfully",
        timestamp: new Date(),
      },
    ],
  });

  if (paymentMethod === "card") {
    // stripe payment link
  }

  res.json({ order });

  //   decrease stock
  for (const item of orderItems) {
    await productModel.findByIdAndUpdate(item.product, {
      $inc: {
        stock: -item.quantity,
      },
    });
  }

  // Send stock update events for each product in the order
  for (const item of orderItems) {
    await inngest.send({
      name: "inventory/stock.updated",
      data: { productId: item.product },
    });
  }

  await inngest.send({ name: "order/placed", data: { orderId: order._id } });
};

// Get user's orders
// GET :- /api/orders

export const getUserOrders = async (req, res) => {
  const { status } = req.query;

  const filter = {
    userId: req.user._id,
    // $nor: [{ paymentMethod: "card", isPaid: false }],
  };

  if (status && status !== "all") {
    filter.status = status;
  }

  const orders = await orderModel
    .find(filter)
    .populate("deliveryPartnerId", "name phone")
    .sort({ createdAt: -1 });

  res.json({ orders });
};

// get single order
// GET :- /api/orders/:id

export const getOrder = async (req, res) => {
  const order = await orderModel
    .findOne({
      _id: req.params.id,
      userId: req.user._id,
    })
    .populate("deliveryPartnerId", "name phone avatar vehicleType");

  if (!order) {
    return res.status(404).json({ message: "Order not found!" });
  }

  res.json({ order });
};

// Update order status (admin)
// PUT :- /api/orders/:id/status

export const updateOrderStatus = async (req, res) => {
  const { status, note } = req.body;

  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found!" });
  }

  const history = Array.isArray(order.statusHistory) ? order.statusHistory : [];
  history.push({
    status,
    note: note || `Order ${status.toLowerCase()}`,
    timestamp: new Date(),
  });

  const updateOrder = await orderModel.findByIdAndUpdate(
    req.params.id,
    {
      status,
      statusHistory: history,
    },
    { new: true },
  );

  res.json({ order: updateOrder });
};

// Get all orders (admin)
// GET:- /api/orders/all

export const getAllOrders = async (req, res) => {
  const orders = await orderModel
    .find({
      // $nor: [
      //   {
      //     paymentMethod: "card",
      //     isPaid: false,
      //   },
      // ],
    })
    .populate("userId", "name email")
    .populate("deliveryPartnerId", "name phone email")
    .sort({ createdAt: -1 });
  res.json({ orders });
};

// Get Order Location
// GET:- /api/orders/:id/location

export const getOrderLocation = async (req, res) => {
  const order = await orderModel.findOne(
    {
      _id: req.params.id,
      userId: req.user._id,
    },
    { liveLocation: 1, status: 1 },
  );

  if (!order) {
    return res.status(404).json({ message: "Order not found!" });
  }

  res.json({ liveLocation: order.liveLocation, status: order.status });
};
