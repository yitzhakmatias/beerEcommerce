const { getProducts } = require('../controllers/productController');
const products = require('../data/products');
const { getProductWithPrice } = require('../utils/priceHelper');
const {jest} = require("globals");

jest.mock('../utils/priceHelper', () => ({
    getProductWithPrice: jest.fn(),
}));

describe('Product Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    it('should return products with prices', async () => {
        getProductWithPrice.mockImplementation((product) => ({
            ...product,
            price: 10.99,
        }));

        await getProducts(req, res);

        expect(getProductWithPrice).toHaveBeenCalledTimes(products.length);
        expect(res.json).toHaveBeenCalledWith(
            products.map(product => ({
                ...product,
                price: 10.99,
            }))
        );
    });

    it('should handle errors', async () => {
        getProductWithPrice.mockImplementation(() => {
            throw new Error('Test error');
        });

        await getProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch products' });
    });
});
