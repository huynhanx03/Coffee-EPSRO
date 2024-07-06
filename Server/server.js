const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const voucherRoutes = require('./routes/voucherRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes)
app.use('/product', productRoutes);
app.use('/voucher', voucherRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});