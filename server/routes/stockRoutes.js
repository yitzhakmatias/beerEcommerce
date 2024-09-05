const express = require('express');
const { getStockPrice } = require('../controllers/stockController');

const router = express.Router();
/**
 * @swagger
 * /stock-price/{sku}:
 *   get:
 *     summary: Retrieve stock and price information for a specific SKU
 *     description: Retrieve the stock quantity and price for a given product SKU.
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         description: The SKU of the product.
 *         schema:
 *           type: string
 *           example: "12345"
 *     responses:
 *       200:
 *         description: Stock and price information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sku:
 *                   type: string
 *                   example: "12345"
 *                 price:
 *                   type: number
 *                   description: Price of the product in cents.
 *                   example: 1999
 *                 stock:
 *                   type: integer
 *                   description: Number of items in stock.
 *                   example: 100
 *       404:
 *         description: SKU not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "SKU not found"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch stock and price"
 */
router.get('/stock-price/:sku', getStockPrice);

module.exports = router;
