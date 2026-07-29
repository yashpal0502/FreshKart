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
    res.status(400).json({ message: error.message });
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
