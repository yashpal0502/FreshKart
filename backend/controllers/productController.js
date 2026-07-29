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
