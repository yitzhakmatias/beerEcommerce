const stockPrice = require('../data/stock-price');
const logger = require('../config/logger');

const getStockPrice = async (req, res) => {
    try {
        const { sku } = req.params;
        const stockInfo = stockPrice[sku];
        if (stockInfo) {
            res.json(stockInfo);
        } else {
            res.status(404).json({ error: 'SKU not found' });
        }
    } catch (error) {
        logger.error('Failed to fetch stock and price: %s', error.message);
        res.status(500).json({ error: 'Failed to fetch stock and price' });
    }
};

module.exports = {
    getStockPrice,
};
