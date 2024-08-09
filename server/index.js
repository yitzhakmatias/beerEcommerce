const express = require('express');
const cors = require('cors');
const products = require('./data/products');
const stockPrice = require('./data/stock-price');

const app = express();
const PORT = 5000;

app.use(cors());

// Helper function to get the price for a product
const getProductWithPrice = (product) => {
    // Find the lowest price SKU for the product
    let minPrice = null;
    product.skus.forEach(sku => {
        const priceData = stockPrice[sku.code];
        if (priceData && (minPrice === null || priceData.price < minPrice)) {
            minPrice = priceData.price;
        }
    });
    return {
        ...product,
        price: minPrice !== null ? minPrice / 100 : null // Convert cents to dollars
    };
};

app.get('/api/products', async (req, res) => {
    try {
        const productsWithPrices = products.map(getProductWithPrice);
        res.json(productsWithPrices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/stock-price/:sku', async (req, res) => {
    try {
        const { sku } = req.params;
        const stockInfo = stockPrice[sku];
        if (stockInfo) {
            res.json(stockInfo);
        } else {
            res.status(404).json({ error: 'SKU not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stock and price' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
