const express = require('express');
const cors = require('cors');
const products = require('./data/products');
const stockPrice = require('./data/stock-price');
const errorHandler = require("./middleware/errorHandler");
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');
const app = express();
const PORT = 5000;

app.use(cors());

app.use('/api', productRoutes);
app.use('/api', stockRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
