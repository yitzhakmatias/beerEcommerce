const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require("./middleware/errorHandler");
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');
const {info} = require("./config/logger");
const setupSwagger = require('./config/swagger');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', productRoutes);
app.use('/api', stockRoutes);

app.use(errorHandler);
// Setup Swagger
setupSwagger(app);
app.use((req, res, next) => {
    info(`Incoming request: ${req.method} ${req.url}`);
    next();
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
