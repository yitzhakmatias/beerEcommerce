const express = require('express');
const cors = require('cors');
const errorHandler = require("./middleware/errorHandler");
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');
const {info} = require("./config/logger");
const app = express();
const PORT = 5000;

app.use(cors());

app.use('/api', productRoutes);
app.use('/api', stockRoutes);

app.use(errorHandler);

app.use((req, res, next) => {
    info(`Incoming request: ${req.method} ${req.url}`);
    next();
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
