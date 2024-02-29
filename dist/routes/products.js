"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const express_validator_1 = require("express-validator");
const validateFields_1 = require("../middlewares/validateFields");
const multer_1 = require("../middlewares/multer");
const products_1 = require("../controllers/products");
exports.router = express.Router();
exports.router.post("/", [
    multer_1.default.single('imgSource'),
    (0, express_validator_1.check)('name', 'The product name is mandatory').not().isEmpty(),
    (0, express_validator_1.check)('name', 'The product name must be a string').isString(),
    (0, express_validator_1.check)('price', 'The product price is mandatory').not().isEmpty(),
    (0, express_validator_1.check)('price', 'The product price must be a number').isNumeric(),
    (0, express_validator_1.check)('category', 'The product category is mandatory').not().isEmpty(),
    (0, express_validator_1.check)('category', 'The product category must be a string').isString(),
    validateFields_1.validateFields,
], products_1.newProduct);
exports.router.get("/", products_1.getEveryProduct);
exports.router.get("/popular", products_1.getPopularProducts);
exports.router.get("/:category", products_1.getCategoryProducts);
exports.router.get("/single/:id", products_1.getProductById);
