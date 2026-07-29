import productModel from "../models/Product.js";

// GET :- /api/products/flash-deals
export default getFlashDeals = async (req, res) => {
  try {
    const products = await productModel
      .find({
        stock: { $gt: 0 },
      })
      .sort({
        originalPrice: -1,
      })
      .limit(8);

    const productsWithDiscount = products.map((p) => {
      const product = p.toObject();

      const discount =
        product.originalPrice && product.price
          ? Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100,
            )
          : 0;
      return { ...product, discount };
    });

    res.json({ products: productsWithDiscount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET :- /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query;

    const filter = {};

    if (category && category !== "all") {
      filter.category = category;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortOption = {};

    if (sort === "price-low") {
      sortOption.price = 1;
    } else if (sort === "price-high") {
      sortOption.price = -1;
    } else {
      sortOption.createdAt = -1;
    }

    const products = await productModel.find(filter).sort(sortOption);

    const productsWithDiscount = products.map((p) => {
      const product = p.toObject();

      const discount =
        product.originalPrice && product.price
          ? Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100,
            )
          : 0;

      return {
        ...product,
        discount,
      };
    });

    res.json({
      products: productsWithDiscount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET :- /api/products/:id
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    const productObj = product.toObject();

    const discount =
      productObj.originalPrice && productObj.price
        ? Math.round(
            ((productObj.originalPrice - productObj.price) /
              productObj.originalPrice) *
              100,
          )
        : 0;

    res.json({
      product: {
        ...productObj,
        discount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// POST :- /api/products
export const createProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);

    res.status(201).json({
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// PUT :- /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    res.json({
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE :- /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    res.json({
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
