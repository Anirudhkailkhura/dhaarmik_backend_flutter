const Product = require("../models/Product");

module.exports = {
  createProduct: async (res, req) => {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res.status(200).json("product created");
    } catch (error) {
      res.status(500).json("failed to create product");
    }
  },

  getAllproduct: async (req, res) => {
    try {
      const products = await Product.find().sort({ createAt: -1 });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json("failed to get the product");
    }
  },

  getProduct: async (res, req) => {
    const productId = req.params.id;
    try {
      const product = await Product.find().findById(productId);
      const { __v, createAt, ...productData } = product._doc;
      res.status(200).json(product._doc);
    } catch (error) {
      res.status(500).json("failed to get the product");
    }
  },

  searchProduct: async (req, res) => {
    try {
      const result = await Product.aggregate([
        [
          {
            $search: {
              index: "dharrmik",
              text: {
                query: req.params.key,
                path: {
                  wildcard: "*",
                },
              },
            },
          },
        ],
      ]);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json("failed to get the product");
    }
  },
};
