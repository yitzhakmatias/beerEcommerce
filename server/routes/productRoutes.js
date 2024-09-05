const express = require('express');
const { getProducts } = require('../controllers/productController');

const router = express.Router();
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products from the e-commerce store.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   brand:
 *                     type: string
 *                     example: "Brand Name"
 *                   price:
 *                     type: number
 *                     example: 19.99
 */
router.get('/products', getProducts);

module.exports = router;
