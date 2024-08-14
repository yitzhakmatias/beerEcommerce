let { getStockPrice } = require('../controllers/stockController');
const stockPrice = require('../data/stock-price');

describe('Stock Controller', () => {
    let req, res;

    beforeEach(() => {
        req = { params: { sku: '1001' } };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    it('should return stock info for a valid SKU', async () => {
        stockPrice['1001'] = { price: 1000, stock: 50 };

        await getStockPrice(req, res);

        expect(res.json).toHaveBeenCalledWith({ price: 1000, stock: 50 });
    });

    it('should return 404 if SKU not found', async () => {
        req.params.sku = '9999';

        await getStockPrice(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'SKU not found' });
    });

    it('should handle runtime errors with a 500 status', async () => {
        // Simulate an error by mocking the stockPrice access to throw an error
        const originalStockPrice = stockPrice['1001'];

        // Temporarily override the property to simulate an error
        Object.defineProperty(stockPrice, '1001', {
            get: () => {
                throw new Error('Simulated runtime error');
            },
        });

        await getStockPrice(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch stock and price' });

        // Restore the original stockPrice value after the test
        stockPrice['1001'] = originalStockPrice;
    });

});
