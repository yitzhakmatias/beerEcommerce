const { getStockPrice } = require('../controllers/stockController');
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

    it('should handle errors', async () => {
        req.params.sku = null;

        await getStockPrice(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch stock and price' });
    });
});
