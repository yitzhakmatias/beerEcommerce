const stockPrice = require('../data/stock-price');

const getProductWithPrice = (product) => {
    let minPrice = null;
    product.skus.forEach(sku => {
        const priceData = stockPrice[sku.code];
        if (priceData && (minPrice === null || priceData.price < minPrice)) {
            minPrice = priceData.price;
        }
    });
    return {
        ...product,
        price: minPrice !== null ? minPrice / 100 : null
    };
};

module.exports = {
    getProductWithPrice,
};
