const products = require('../data/products');
const { getProductWithPrice } = require('../utils/priceHelper');
const logger = require('../config/logger');

const getProducts = async (req, res) => {
    try {
        const productsWithPrices = products.map(getProductWithPrice);
        res.json(productsWithPrices);
    } catch (error) {
        logger.error('Failed to fetch products: %s', error.message);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

module.exports = {
    getProducts,
};
