const express = require('express');
const DBconnection = require('./config/db');
const router = require('./routes/products');
const categoryRouter = require('./routes/categories');
const userRouter = require('./routes/user');
const morgan = require('morgan');
const cors = require('cors');
const authJwt = require('./helper/jwt');
const errorHandler = require('./helper/error-handller');
const orderRouter = require('./routes/order');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;

DBconnection();

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt()); 
app.use(errorHandler);

app.use('/product', router);
app.use('/category', categoryRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);


app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
