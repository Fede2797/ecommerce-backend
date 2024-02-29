"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getPopularProducts = exports.getCategoryProducts = exports.getEveryProduct = exports.newProduct = void 0;
const cloudinaryUpload_1 = require("../helpers/cloudinaryUpload");
const products_1 = require("../helpers/products");
const product_1 = require("../models/product");
const newProduct = async (req, res) => {
    const { name, price, sizes, category } = req.body;
    // Parses the sizes array from a string
    const parsedSizes = JSON.parse(sizes);
    try {
        const imageUrl = await (0, cloudinaryUpload_1.cloudinaryUpload)(req.file.path);
        if (!imageUrl) {
            return res.status(500).json({
                message: "Error while uploading the product image"
            });
        }
        ;
        // Create a new product
        const newProduct = new product_1.default({
            name,
            price,
            category,
            sizes: parsedSizes,
            imgSource: imageUrl,
        });
        // Save the product to the database
        await newProduct.save();
        return res.status(200).json({
            message: "Product created successfully"
        });
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({
            message: "Error while uploading the product"
        });
    }
};
exports.newProduct = newProduct;
const getEveryProduct = async (req, res) => {
    try {
        // We get the pagination via the request
        const { page = 1, limit = 40, sortBy = "popularity" } = req.query;
        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);
        if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage <= 0 || parsedLimit <= 0) {
            return res.status(400).json({ message: "Invalid page or limit values." });
        }
        const sort = (0, products_1.getSortingMethod)(sortBy);
        const products = await product_1.default.find()
            .sort(sort)
            .limit(parsedLimit * 1)
            .skip((parsedPage - 1) * parsedLimit);
        return res.status(200).json(products);
    }
    catch (err) {
        console.log(err);
        res.status(200).json({
            message: "Error while getting the products"
        });
    }
};
exports.getEveryProduct = getEveryProduct;
const getCategoryProducts = async (req, res) => {
    const validCategories = ["men", "women", "kids"];
    try {
        // We get the pagination via the request
        const { page = 1, limit = 40, sortBy = "popularity" } = req.query;
        const { category } = req.params;
        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);
        if (!category) {
            console.log("Request failed. Category wasn't provided");
            return res.status(400).json("Error while attempting to get the products");
        }
        if (!validCategories.includes(category)) {
            console.log("Request failed. Non valid category");
            return res.status(400).json("Error while attempting to get the products");
        }
        if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage <= 0 || parsedLimit <= 0) {
            console.log("Request failed. Invalid page or limit values.");
            return res.status(400).json({ message: "Invalid page or limit values." });
        }
        const sort = (0, products_1.getSortingMethod)(sortBy);
        const products = await product_1.default.find({ category: category })
            .sort(sort)
            .limit(parsedLimit * 1)
            .skip((parsedPage - 1) * parsedLimit);
        return res.status(200).json(products);
    }
    catch (err) {
        console.log(err);
        res.status(200).json({
            message: "Error while getting the products"
        });
    }
};
exports.getCategoryProducts = getCategoryProducts;
const getPopularProducts = async (req, res) => {
    try {
        const products = await product_1.default.find({})
            .sort({ unitsSold: -1 })
            .limit(4);
        res.status(200).json(products);
    }
    catch (err) {
        console.log(err);
        res.status(200).json({
            message: "Error while getting the products"
        });
    }
};
exports.getPopularProducts = getPopularProducts;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await product_1.default.findById({ _id: id });
        res.status(200).json(product);
    }
    catch (err) {
        console.log(err);
        res.status(200).json({
            message: "Error while getting the product"
        });
    }
};
exports.getProductById = getProductById;
