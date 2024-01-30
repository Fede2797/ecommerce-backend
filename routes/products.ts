import * as express from "express";
import { check } from 'express-validator';
import { validateFields } from "../middlewares/validateFields";
import upload from "../middlewares/multer";
import { getCategoryProducts, 
  getEveryProduct, 
  getPopularProducts, 
  getProductById, 
  newProduct } from "../controllers/products";

export const router = express.Router();

router.post("/", [
    upload.single('imgSource'),
    check('name', 'The product name is mandatory').not().isEmpty(),
    check('name', 'The product name must be a string').isString(),
    check('price', 'The product price is mandatory').not().isEmpty(),
    check('price', 'The product price must be a number').isNumeric(),
    check('category', 'The product category is mandatory').not().isEmpty(),
    check('category', 'The product category must be a string').isString(),
    validateFields,
  ], newProduct );

router.get("/", getEveryProduct );

router.get("/popular", getPopularProducts );

router.get("/:category", getCategoryProducts );

router.get("/single/:id", getProductById );
